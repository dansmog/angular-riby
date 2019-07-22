import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { RestApiService } from '../../shared/rest-api.service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  id: any;
  paramsSub: any;

  constructor(private route: ActivatedRoute, private rest: RestApiService) { }

  ngOnInit() {
    // this.paramsSub = this.activatedRoute.params.subscribe(params => this.id = parseInt(params['id'], 10));
    // console.log(this.paramsSub);
    // console.log(this.activatedRoute.params.subscribe(params => this.id = parseInt(params['id'], 10)));

    this.route.params.subscribe(params => {
      console.log(params.id)
      this.rest.getById(params.id, 'investments').subscribe(data => {
        console.log(data)
      })
    })
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
