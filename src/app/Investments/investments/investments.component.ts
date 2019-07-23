import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";


import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  investments = [];
  total = null;
  currentPage = 1;
  isLoading: boolean = true;

  constructor(private rest: RestApiService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.fetchInvestments(this.currentPage)
  }

  fetchInvestments(page){
    this.spinner.show()
    this.rest.getInvestments(10, page).subscribe(data => {
      this.investments = data.payload.contribution_types;
      this.total = data.payload.total;
      this.isLoading = false;
      this.spinner.hide()
      console.log(this.investments)
    })
  }

  nextPage(){
    this.currentPage += 1
    if(this.currentPage >= this.total){
      this.currentPage = this.total
      this.fetchInvestments(this.currentPage);
    }else{
      this.fetchInvestments(this.currentPage);
    }
  }

  prevPage(){
    if(this.currentPage === 1){
      this.currentPage = 1
     return;
    }else{
      this.currentPage -= 1
      this.fetchInvestments(this.currentPage);
    }
  }

}
