import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NgxSpinnerService } from "ngx-spinner";

import { RestApiService } from '../../shared/rest-api.service';
import { ModalService } from '../../shared/modal.service';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  loan = {}
  isLoading: boolean = true;
  isModalVisible: boolean = false;
  cooperative_id = null;
  user = { dob: null };
  check = "this is a check";

  constructor(private rest: RestApiService, private route: ActivatedRoute, private modal: ModalService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show();
    this.route.params.subscribe(params => {
      this.rest.getById(params.id, 'loans').subscribe(data => {
        console.log(data.payload)
        this.loan = data.payload;
        this.cooperative_id = data.payload.owner_id;
        this.isLoading = false;
        this.spinner.hide();
        console.log(this.cooperative_id);
      })
    })
  }

  showModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false
  }

  onSubmit() {
    this.spinner.show();
    const date = this.user.dob.split('-');  //["2010-12-30"] -- middle is month
    console.log(date);
    const user = { ...this.user, cooperative_id: this.cooperative_id, dob: "03-11-2010" }
    this.user = user;
    const data = { "request": this.user }
    console.log(data)
    this.rest.applicationRequest().subscribe(data => {
      console.log(data)
      this.spinner.hide()
    })
  }


  // onHandleShowModal(){
  //   this.modal.open()
  // }
}
