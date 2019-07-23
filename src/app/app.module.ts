import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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

import { HttpClientModule } from '@angular/common/http';
import { RestApiService } from './shared/rest-api.service';
import { ModalService } from './shared/modal.service';

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
    Error404Component
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
  providers: [RestApiService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
