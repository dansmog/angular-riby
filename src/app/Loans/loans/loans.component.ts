import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/rest-api.service';


@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  loans  = [];
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
