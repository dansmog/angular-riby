import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';


import { RestApiService } from '../../shared/rest-api.service';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  isLoading: boolean = false;
  loans = [];
  total: number = 0;
  currentPage: number = 1;
  isSearchLoading: boolean = false;
  queryParams: string = '';

  constructor(private rest: RestApiService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.fetchLoans(this.currentPage)
   }
  
   fetchLoans(page){
     this.spinner.show();
     this.rest.getAllResoureBy('loans', 10, page).subscribe(data => {
      this.loans = data.payload.loan_types;
      this.total = data.payload.total;
      console.log(data)
      this.isLoading = false;
      this.spinner.hide();
     })
   }
 
   searchForLoans(type: string) {
    this.isSearchLoading = true;
    this.rest.filterResults(this.queryParams, type).pipe(debounceTime(100), distinctUntilChanged()).subscribe(data => {
      this.isSearchLoading = false;
      this.total = data.payload.total;
      this.loans = data.payload.loan_types;
    })
  }


   nextPage(){
     this.currentPage += 1
     if(this.currentPage >= this.total){
       this.currentPage = this.total
       this.fetchLoans(this.currentPage);
     }else{
       this.fetchLoans(this.currentPage);
     }
   }
 
   prevPage(){
     if(this.currentPage === 1){
       this.currentPage = 1
      return;
     }else{
       this.currentPage -= 1
       this.fetchLoans(this.currentPage);
     }
   }

}


