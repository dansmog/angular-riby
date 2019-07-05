import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/rest-api.service';

@Component({
  selector: 'app-corporatives',
  templateUrl: './corporatives.component.html',
  styleUrls: ['./corporatives.component.css']
})
export class CorporativesComponent implements OnInit { 
  corporatives: [] = [];
  isAuthModalVisible: boolean = false;

  constructor(private rest: RestApiService) { }

  ngOnInit() {
    this.rest.getCorporatives().subscribe(data => {
      this.corporatives = data;
    })
  }

  showModal = () => {
    this.isAuthModalVisible = true;
  }

  closeModal = () => {
    this.isAuthModalVisible = false;
  }

}
