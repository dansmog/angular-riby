import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoansComponent } from './Loans/loans/loans.component';
import { LoanComponent } from './Loans/loan/loan.component';
import { InvestmentsComponent } from './Investments/investments/investments.component';
import { InvestmentComponent } from './Investments/investment/investment.component';
import { CorporativesComponent } from './Corporatives/corporatives/corporatives.component'
import { CorporativeComponent } from './Corporatives/corporative/corporative.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiscoveryComponent,
    AuthModalComponent,
    BookmarksComponent,
    PortfolioComponent,
    LoansComponent,
    LoanComponent,
    InvestmentsComponent,
    InvestmentComponent,
    CorporativesComponent,
    CorporativeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
