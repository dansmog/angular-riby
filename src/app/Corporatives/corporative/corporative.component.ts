import { Component, OnInit } from '@angular/core';
import  { ActivatedRoute } from '@angular/router'
import { NgxSpinnerService } from "ngx-spinner";

import { RestApiService } from '../../shared/rest-api.service';


@Component({
  selector: 'app-corporative',
  templateUrl: './corporative.component.html',
  styleUrls: ['./corporative.component.css']
})
export class CorporativeComponent implements OnInit {

  id  = null;
  cooperative: {};
  isModalVisible: boolean = false;
  cooperative_id = null;
  user = {dob: null};
  isLoading: boolean = true;
  
  public constructor(private route: ActivatedRoute, private rest: RestApiService, private spinner: NgxSpinnerService) {
   }

  ngOnInit() {
    // this.spinner.show();

    // this.route.params.subscribe(params => {
    //   this.id = params.id;
    //   this.rest.getById(params.id, 'cooporatives').subscribe(data => {
    //     console.log(data)
    //     this.spinner.hide()
    //     this.cooperative = data.payload
    //     this.cooperative_id = data.payload.id;
    //   })
    // })

    // console.log(this.id);
    this.getSingleId()
    this.fetchCooperativeById()
  }

  
  getSingleId() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
  }

  fetchCooperativeById() {
    this.spinner.show()
    this.rest.getById(this.id, 'cooporatives').subscribe(data => {
      this.cooperative = data.payload;
      console.log(this.cooperative)
      this.spinner.hide();
      this.isLoading = false;
    })
  }

  showModal(){
    this.isModalVisible = true;
  }

  closeModal(){
    this.isModalVisible = false
  }

  onSubmit(){ 
    const date = this.user.dob.split('-');  //["2010-12-30"] -- middle is month
  
    console.log(date);
    const user = {...this.user, cooperative_id: this.cooperative_id, dob: "03-11-2010"}
    this.user = user;
    const data = { "request": this.user}
    console.log(data)
    this.rest.postMemberRequest(data).subscribe(data => {
      console.log(data)
    })
  }

}
