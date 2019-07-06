import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
