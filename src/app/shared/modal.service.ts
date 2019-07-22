import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isVisible: boolean = false;

  constructor() { }

  open(){
    console.log('working');
    this.isVisible = true
  }

  close(){
    this.isVisible = false
  }
}
