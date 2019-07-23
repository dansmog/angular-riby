import { Component, OnInit } from '@angular/core';
import  { ActivatedRoute } from '@angular/router'

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
  
  public constructor(private route: ActivatedRoute, private rest: RestApiService) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.rest.getById(params.id, 'cooporatives').subscribe(data => {
        console.log(data)
        this.cooperative = data.payload
        this.cooperative_id = data.payload.id;
      })
    })
    console.log(this.id);
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
