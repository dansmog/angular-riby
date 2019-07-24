import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NgxSpinnerService } from "ngx-spinner";

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
  isModalVisible: boolean = false;
  cooperative_id = null;
  user = { dob: null };
  isLoading: boolean = true;

  public constructor(private route: ActivatedRoute, private rest: RestApiService, private spinner: NgxSpinnerService, private cd: ChangeDetectorRef) {
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
    this.spinner.show()
    this.rest.getById(this.id, 'cooporatives').subscribe(data => {
      this.cooperative = data.payload;
      console.log(this.cooperative)
      this.cooperative_id = data.payload.id;
      this.spinner.hide();
      this.isLoading = false;
    })
  }

  showModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false
  }

  onSubmit() {
    const user = { ...this.user, cooperative_id: this.cooperative_id, dob: "03-11-2010" }
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
            "padding": "7px",
            "font-size": "10px",
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
