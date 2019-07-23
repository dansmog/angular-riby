import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/rest-api.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  isLoading: boolean = false;
  loans  = [];
  total = 0;
  currentPage = 1

  constructor(private rest: RestApiService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.fetchLoans(this.currentPage)
   }
  
   fetchLoans(page){
     this.spinner.show();
     this.rest.getLoans(10, page).subscribe(data => {
      this.loans = data.payload.loan_types;
      this.total = data.payload.total;
      console.log(data)
      this.isLoading = false;
      this.spinner.hide();
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
