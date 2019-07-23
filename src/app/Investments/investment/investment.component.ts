import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';


import { RestApiService } from '../../shared/rest-api.service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  id: any = null;
  investment = {}
  paramsSub: any;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private rest: RestApiService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getSingleId();
    this.fetchInvestmentById()
  }

  getSingleId() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
  }

  fetchInvestmentById() {
    this.spinner.show()
    this.rest.getById(this.id, 'investments').subscribe(data => {
      console.log(data.payload);
      this.investment = data.payload;
      this.spinner.hide();
    })
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
