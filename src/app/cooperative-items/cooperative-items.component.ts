import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


import { RestApiService } from '../shared/rest-api.service';

declare var $: any;

@Component({
  selector: 'app-cooperative-items',
  templateUrl: './cooperative-items.component.html',
  styleUrls: ['./cooperative-items.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CooperativeItemsComponent implements OnInit {

  id: any = null;
  cooperative_investments: [];
  total = null;
  currentPage = 1;
  isLoading: boolean = true;
  queryParams: string = ''
  isSearchLoading: boolean = false;

  constructor(private route: ActivatedRoute, private rest: RestApiService, private spinner: NgxSpinnerService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getSingleId();
    this.fetchAllInvestments()
  }

  refresh() {
    this.cd.detectChanges();
  }

  getSingleId() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      console.log(this.id)
    })
  }


  fetchAllInvestments() {
    this.spinner.show()
    return this.rest.fetchCooperativeInvestments(this.id, 10).subscribe(data => {
      console.log(data)
      this.cooperative_investments = data.payload.contribution_types;
      this.total = data.payload.total;
      this.spinner.hide()
      this.isLoading = false;
      console.log(this.cooperative_investments)
    })
  }

  searchForInvestments(type: string) {
    this.isSearchLoading = true;
    this.rest.filterResults(this.queryParams, type).pipe(debounceTime(100), distinctUntilChanged()).subscribe(data => {
      this.isSearchLoading = false;
      this.total = data.payload.total;
      this.cooperative_investments = data.payload.contribution_types;
    }, err => {
      console.log(err)
    })
  }

  nextPage(){
    this.currentPage += 1
    if(this.currentPage >= this.total){
      this.currentPage = this.total
      const result = this.rest.fetchCooperativeInvestments(this.id, 10);
      if(!result){
        this.currentPage -= 1;
      }
    }else{
      return this.rest.fetchCooperativeInvestments(this.id, 10);
    }
  }

  prevPage(){
    if(this.currentPage === 1){
      this.currentPage = 1
     return;
    }else{
      this.currentPage -= 1
      this.rest.fetchCooperativeInvestments(this.id, 10);
    }
  }


}



