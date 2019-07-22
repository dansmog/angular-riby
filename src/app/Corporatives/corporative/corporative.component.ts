import { Component, OnInit } from '@angular/core';
import  { ActivatedRoute } from '@angular/router'

import { RestApiService } from '../../shared/rest-api.service';


@Component({
  selector: 'app-corporative',
  templateUrl: './corporative.component.html',
  styleUrls: ['./corporative.component.css']
})
export class CorporativeComponent implements OnInit {

  id  = null;
  cooperative: {};
  
  public constructor(private route: ActivatedRoute, private rest: RestApiService) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.rest.getById(params.id, 'cooporatives').subscribe(data => {
        console.log(data)
        this.cooperative = data.payload
      })
    })

    console.log(this.id);

  }

}
