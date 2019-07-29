import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of, throwError } from 'rxjs';

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
  paramsSub: any;
  cooperative_id: string = '';
  isModalVisible: boolean = false;
  isLoading: boolean = false;
  user: any = {};
  message: string = '';

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
    })
  }

  fetchInvestmentById() {
    this.spinner.show();
    forkJoin(
      this.rest.getById(this.id, 'investments'),
      this.rest.fetchCooperativeInvestments(this.id, 2),
    )
    .subscribe(([res1, res2]) => {
     console.log(res1);
     console.log(res2)
     this.investment = res1.payload;
     this.cooperative_loans = res2.payload.contribution_types
     this.cooperative_id = res1.payload.cooperative_identifier;
     this.spinner.hide();
     this.isLoading = false;
    });
  }
  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }


  showModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false
  }

  onSubmit(){ 
 
    const date = this.user.dob.split('-');  //["2010-12-30"] -- middle is month
    const newDate = date[2] + '-' + date[1] + '-' + date[0];
    const user = {...this.user, cooperative_id: this.cooperative_id, dob: newDate}
    this.user = user;
    const data = { "request": this.user}
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
            "font-size": "14px",
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
