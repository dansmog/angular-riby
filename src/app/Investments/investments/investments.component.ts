import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  investments = [];
  total = null;

  constructor(private rest: RestApiService) { }

  ngOnInit() {
    this.rest.getInvestments().subscribe(data => {
      this.investments = data.payload.contribution_types;
      this.total = data.payload.total;
      console.log(data.payload.contribution_types)
    })
  }

}
