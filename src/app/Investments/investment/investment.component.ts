import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';


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
    this.spinner.show()
    this.rest.getById(this.id, 'investments').subscribe((data) => {
      console.log(data.payload);
      this.investment = data.payload;
      this.cooperative_id = data.payload.cooperative_identifier;
      this.spinner.hide();
      console.log(this.cooperative_id)
    })
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
    const user = {...this.user, cooperative_id: this.cooperative_id, dob: "03-11-2010"}
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
            "padding": "7px",
            "font-size": "10px",
            "color": '#fff',
          },
        }
      })
      $.notify("signup successful, please wait for approval from cooperative", {
        style: 'success_notify'
      });

      // setTimeout(() => {
      //   this.isModalVisible = false;
      //   this.refresh();
      // }, 000)

    })
  }

}
