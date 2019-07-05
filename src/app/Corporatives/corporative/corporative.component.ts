import { Component, OnInit } from '@angular/core';
import  { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-corporative',
  templateUrl: './corporative.component.html',
  styleUrls: ['./corporative.component.css']
})
export class CorporativeComponent implements OnInit {

  id  = null;
  
  public constructor(private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    })

    console.log(this.id);

  }

}
