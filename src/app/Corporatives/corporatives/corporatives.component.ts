import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/rest-api.service';

@Component({
  selector: 'app-corporatives',
  templateUrl: './corporatives.component.html',
  styleUrls: ['./corporatives.component.css']
})
export class CorporativesComponent implements OnInit { 
  corporatives  = [
    {
      id: 1111,
      name: 'Coper Corporative',
      interest: '7',
      duration: '2-3 months',
      repayment: 'up to 6 months',
    },
    {
      id: 1141,
      name: 'Ibekun Corporative',
      interest: '8',
      duration: '2-4 months',
      repayment: 'up to 7 months',
    }

  ];
  total: number = 0;
  isAuthModalVisible: boolean = false;

  constructor(private rest: RestApiService) { }

  ngOnInit() {
    this.rest.getCorporatives().subscribe(data => {
      console.log(data.payload)
      this.corporatives = data.payload.cooperatives;      
      this.total = data.payload.total;
    })
  }

  showModal = () => {
    this.isAuthModalVisible = true;
  }

  closeModal = () => {
    this.isAuthModalVisible = false;
  }

}
