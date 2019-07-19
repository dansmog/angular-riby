import { Component, OnInit } from '@angular/core';
import  { ActivatedRoute } from '@angular/router'


import { RestApiService } from '../../shared/rest-api.service';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  loan = {

  }

  constructor(private rest: RestApiService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rest.getById(params.id, 'loans').subscribe(data => {
        console.log(data)
      })
    })
  }

}
