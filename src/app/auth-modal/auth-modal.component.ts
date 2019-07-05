import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {
  isAuthModalVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }


  showModal = () => {
    this.isAuthModalVisible = true;
  }

  closeModal = () => {
    this.isAuthModalVisible = false;
  }
}
