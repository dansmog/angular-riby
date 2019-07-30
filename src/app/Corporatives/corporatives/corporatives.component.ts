import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


import { RestApiService } from '../../shared/rest-api.service';

@Component({
  selector: 'app-corporatives',
  templateUrl: './corporatives.component.html',
  styleUrls: ['./corporatives.component.css']
})
export class CorporativesComponent implements OnInit {
  corporatives = [];
  corporatives_loans = [];
  total: number = 0;
  currentPage = 1;
  isAuthModalVisible: boolean = false;
  isLoading: boolean = true;
  isSearchLoading: boolean = false;
  queryParams: string = '';
  hasCooperativeId: boolean = false;
  cooperativeId: string = '';

  constructor(private rest: RestApiService, private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSingleId()
    this.fetchCooporatives(this.currentPage)
  }

  getSingleId() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.hasCooperativeId = true;
        this.cooperativeId = params.id;
      }
    })
  }

  fetchCooporatives(page) {
    this.spinner.show();
    this.rest.getAllResoureBy('cooperatives', 10, page).subscribe(data => {
      this.spinner.hide();
      this.isLoading = false;
      console.log(data.payload.cooperatives)
      this.corporatives = data.payload.cooperatives;
      const page = Math.ceil(data.payload.total / 12);
      this.total = page ;
      console.log(this.total)
    }, err => {
      this.spinner.hide();
      console.log(err)
    })


  }

  searchForCooporatives(type: string) {
    this.isSearchLoading = true;
    this.rest.filterResults(this.queryParams, type).pipe(debounceTime(100), distinctUntilChanged()).subscribe(data => {
      this.isSearchLoading = false;
      this.total = data.payload.total;
      this.corporatives = data.payload.cooperatives;
    })
  }

  nextPage() {
    this.currentPage += 1
    if (this.currentPage >= this.total) {
      this.currentPage = this.total
      this.fetchCooporatives(this.currentPage);
    } else {
      this.fetchCooporatives(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage === 1) {
      this.currentPage = 1
      return;
    } else {
      this.currentPage -= 1
      this.fetchCooporatives(this.currentPage);
    }
  }

}
