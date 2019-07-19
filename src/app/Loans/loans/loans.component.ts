import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/rest-api.service';


@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  loans  = [
    {
      id: 1111,
      name: 'Car Loans',
      corporative: 'Ibukun Corporative society',
      start: 'June 30th',
      end: '-',
      frequency: 'monthly',
      paycode: '-',
      amount: '50000'
    },
    {
      id: 1141,
      name: 'Housing Loans',
      corporative: 'Mummy K Corporative society',
      start: 'June 30th',
      end: '-',
      frequency: 'monthly',
      paycode: '-',
      amount: '50000'
    }
  ];
  total = 0;

  constructor(private rest: RestApiService) { }

  ngOnInit() {
    this.rest.getLoans().subscribe(data => {
      this.loans = data.payload.loan_types;
      this.total = data.payload.total;
      console.log(data)
    })
  }

}
