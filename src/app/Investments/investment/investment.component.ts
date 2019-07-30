import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';

import { RestApiService } from '../../shared/rest-api.service';

declare var $: any;

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentComponent implements OnInit {

  id: any = null;
  investment: any = {}
  cooperative_loans: [];
  cooperative_investments: [];
  paramsSub: any;
  cooperative_id: string = '';
  isModalVisible: boolean = false;
  isLoading: boolean = false;
  user: any = {};
  message: string = '';
  isSubmitted: boolean = false;

  constructor(private route: ActivatedRoute, private rest: RestApiService, private spinner: NgxSpinnerService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getSingleId();
    this.fetchInvestmentById()
  }

  refresh(){
    this.cd.detectChanges();
  }

  getSingleId() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.fetchInvestmentById()
    })
  }

  fetchInvestmentById() {
    this.spinner.show();
    forkJoin(
      this.rest.getById(this.id, 'investments'),
      this.rest.fetchCooperativeInvestments(this.id, 4),
      
    )
    .subscribe(([investment, investments]) => {
     this.investment = investment.payload;
     this.cooperative_investments = investments.payload.contribution_types
     this.cooperative_id = investment.payload.cooperative_identifier;
     this.rest.fetchCooperativeLoans(this.cooperative_id, 2).subscribe(data => {
       this.spinner.hide();
       this.cooperative_loans = data.payload.loan_types;
       this.isLoading = false;
       console.log(this.cooperative_loans)
     })
    });
  }

  showModal() {
    this.isModalVisible = true;
  }
  closeModal() {
    this.isModalVisible = false
  }

  onSubmit(form: NgForm) {
    this.isSubmitted = true;
    if (!form.valid || !this.user.dob) {
      return false;
    } else {
      this.spinner.show();
      const date = this.user.dob.split('-');  //["2010-12-30"] -- middle is month
      const newDate = date[2] + '-' + date[1] + '-' + date[0];
      const user = { ...this.user, cooperative_id: this.cooperative_id, dob: newDate }
      this.user = user;
      const data = { "request": this.user }
      console.log(data)
      this.isModalVisible = false;
      this.rest.postMemberRequest(data).subscribe((data) => {
        this.isLoading = false;
        this.spinner.hide();
        this.isModalVisible = false;
        this.refresh();
        $.notify.addStyle('success_notify', {
          html: "<div><span data-notify-text/></div>",
          classes: {
            base: {
              "background-color": "#4DB280",
              "padding": "10px",
              "font-size": "14px",
              "color": '#fff',
            },
          }
        })
        $.notify("signup successful, please wait for approval from cooperative", {
          style: 'success_notify'
        });

      }, err => {
        this.refresh();
        this.isLoading = false;
        this.isModalVisible = false;
        this.spinner.hide();
        console.log(err)
        $.notify.addStyle('error_notify', {
          html: "<div><span data-notify-text/></div>",
          classes: {
            base: {
              "background-color": "#e22424",
              "padding": "10px",
              "font-size": "14px",
              "color": '#fff',
            },
          }
        })
        $.notify(`There was an error ${err}`, {
          style: 'error_notify'
        });
      });
    }

  }

}
