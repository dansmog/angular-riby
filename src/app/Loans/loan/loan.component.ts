import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NgxSpinnerService } from "ngx-spinner";
import { forkJoin, of, throwError } from 'rxjs';


import { RestApiService } from '../../shared/rest-api.service';
import { ModalService } from '../../shared/modal.service';

declare var $: any;

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoanComponent implements OnInit {
  loan = {};
  id: string = '';
  cooperative_loans: [];
  cooperative_investments: [];
  isLoading: boolean = true;
  isModalVisible: boolean = false;
  cooperative_id = null;
  user = { dob: null };
  isFetchingLoading: boolean = false; //boolean value for fetching loans and investment that belongs to the cooperative

  constructor(private rest: RestApiService, private route: ActivatedRoute, private modal: ModalService, private spinner: NgxSpinnerService,  private cd: ChangeDetectorRef) { }

  ngOnInit() {

    // this.spinner.show();
    // this.route.params.subscribe(params => {
    //   this.rest.getById(params.id, 'loans').subscribe(data => {
    //     console.log(data.payload)
    //     this.loan = data.payload;
    //     this.cooperative_id = data.payload.owner_id;
    //     this.isLoading = false;
    //     this.spinner.hide();
    //     console.log(this.cooperative_id);
    //   })
    // })
    this.getSingleId()
    this.fetchLoans()
  }

  refresh(){
    this.cd.detectChanges();
  }


  getSingleId() {
    this.route.params.subscribe(params => {
      console.log(params)
      this.id = params.id;
    })
  }


  fetchLoans() {
    this.spinner.show();
    this.rest.getById(this.id, 'loans').subscribe(data => {
      console.log(data.payload)
      this.loan = data.payload;
      this.cooperative_id = data.payload.owner_id;
      this.isLoading = false;
      this.spinner.hide();
      this.fetchLoansAndInvestments()
    })
  }

  fetchLoansAndInvestments(){
    console.log(this.cooperative_id)
    this.isFetchingLoading = true;
    forkJoin(
      this.rest.fetchCooperativeLoans(this.cooperative_id, 2),
      this.rest.fetchCooperativeInvestments(this.cooperative_id, 2)
    )
    .subscribe(([loans, investment]) => {
      console.log(loans, investment);
      this.cooperative_loans = loans.payload.loan_types
      this.cooperative_investments = loans.payload.contribution_types
    });
  }

  showModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false
  }

  onSubmit() {
    this.spinner.show();
    const date = this.user.dob.split('-');  //["2010-12-30"] -- middle is month
    const newDate = date[2] + '-' + date[1] + '-' + date[0];
    const user = { ...this.user, cooperative_id: this.cooperative_id, dob: newDate }
    this.user = user;
    const data = { "request": this.user }
    console.log(data)
    this.rest.postMemberRequest(data).subscribe((data) => {
      this.isLoading = false;
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
      this.spinner.hide();
      console.log(err)
    });
  }


  // onHandleShowModal(){
  //   this.modal.open()
  // }
}
