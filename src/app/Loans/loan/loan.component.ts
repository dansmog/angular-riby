import { Component, OnInit } from '@angular/core';
import  { ActivatedRoute } from '@angular/router'


import { RestApiService } from '../../shared/rest-api.service';
import {  ModalService } from '../../shared/modal.service';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  loan = {}
  isModalVisible: boolean = false;
  constructor(private rest: RestApiService, private route: ActivatedRoute,  private modal: ModalService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rest.getById(params.id, 'loans').subscribe(data => {
        console.log(data.payload)
        this.loan = data.payload;
      })
    })
  }

  showModal(){
    this.isModalVisible = true;
  }

  closeModal(){
    this.isModalVisible = false
  }
  // onHandleShowModal(){
  //   this.modal.open()
  // }
}
