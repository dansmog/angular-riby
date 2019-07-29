import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NgxSpinnerService } from "ngx-spinner";
import { forkJoin, of, throwError } from 'rxjs';

import { RestApiService } from '../../shared/rest-api.service';

declare var $: any;


@Component({
  selector: 'app-corporative',
  templateUrl: './corporative.component.html',
  styleUrls: ['./corporative.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorporativeComponent implements OnInit {

  id = null;
  cooperative: {};
  cooperative_loans: [];
  isModalVisible: boolean = false;
  cooperative_id = null;
  user = { dob: null };
  isLoading: boolean = true;

  public constructor( private route: ActivatedRoute, private rest: RestApiService, private spinner: NgxSpinnerService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getSingleId()
    this.fetchCooperativeById()
  }

  refresh(){
    this.cd.detectChanges();
  }

  getSingleId() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
  }

  fetchCooperativeById() {
    this.spinner.show();
    forkJoin(
      this.rest.getById(this.id, 'cooporatives'),
      this.rest.fetchCooperativeLoans(this.id, 2),
    )
    .subscribe(([res1, res2]) => {
      console.log(res1, res2)
     this.cooperative = res1.payload;
     this.cooperative_loans = res2.payload.loan_types
     this.spinner.hide();
     console.log(this.cooperative, this.cooperative_loans)
     this.isLoading = false;
    });
  }

  showModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false
  }

  onSubmit() {
    const date = this.user.dob.split('-');  //["2010-12-30"] -- middle is month
    const newDate = date[2] + '-' + date[1] + '-' + date[0];
    const user = { ...this.user, cooperative_id: this.cooperative_id, dob: newDate }
    this.user = user;
    const data = { "request": this.user }
    console.log(data)
    this.isLoading = true;
    this.rest.postMemberRequest(data).subscribe(data => {
      this.isLoading = false;
      this.isModalVisible = false;
      this.refresh();
      $.notify.addStyle('success_notify', {
        html: "<div><span data-notify-text/></div>",
        classes: {
          base: {
            "background-color": "#4DB280",
            "padding": "10px",
            "font-size": "12px",
            "color": '#fff',
          },
        }
      })
      $.notify("signup successful, please wait for approval from cooperative", {
        style: 'success_notify'
      });
    })
  }

}
