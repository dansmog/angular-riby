import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';

import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoansComponent } from './Loans/loans/loans.component';
import { LoanComponent } from './Loans/loan/loan.component';
import { InvestmentsComponent } from './Investments/investments/investments.component';
import { InvestmentComponent } from './Investments/investment/investment.component';
import { CorporativesComponent } from './Corporatives/corporatives/corporatives.component'
import { CorporativeComponent } from './Corporatives/corporative/corporative.component';
import { Error404Component } from './error404/error404.component'


import { RestApiService } from './shared/rest-api.service';
import { ModalService } from './shared/modal.service';
import { EmptystateComponent } from './emptystate/emptystate.component';
import { InlineSpinnerComponent } from './inline-spinner/inline-spinner.component';
import { AuthService  } from './interceptors/auth.service'
import { GlobalHttpInterceptorService } from './interceptors/global-http-interceptor-service.service';
import { CooperativeItemsComponent } from './cooperative-items/cooperative-items.component';
import { CooperativeLoansComponentComponent } from './cooperative-loans-component/cooperative-loans-component.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiscoveryComponent,
    BookmarksComponent,
    PortfolioComponent,
    LoansComponent,
    LoanComponent,
    InvestmentsComponent,
    InvestmentComponent,
    CorporativesComponent,
    CorporativeComponent,
    Error404Component,
    EmptystateComponent,
    InlineSpinnerComponent,
    CooperativeItemsComponent,
    CooperativeLoansComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    })
  ],
  providers: [
    RestApiService, ModalService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
