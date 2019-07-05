import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CorporativesComponent } from './Corporatives/corporatives/corporatives.component'
import { CorporativeComponent } from './Corporatives/corporative/corporative.component'
import { LoansComponent } from './Loans/loans/loans.component';
import { LoanComponent } from './Loans/loan/loan.component';
import { InvestmentsComponent } from './Investments/investments/investments.component';
import { InvestmentComponent } from './Investments/investment/investment.component';
import {  Error404Component } from './error404/error404.component'


const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'discovery', component: DiscoveryComponent
  },
  {
    path: 'bookmarks', component: BookmarksComponent
  },
  {
    path: 'portfolio', component: PortfolioComponent
  },
  {
    path: 'corporatives',
    children: [
      {
        path: '', component: CorporativesComponent
      },
      {
        path: ':id', component: CorporativeComponent,
      }
    ]
  },
  {
    path: 'loans',
    children: [
      {
        path: '', component: LoansComponent
      },
      {
        path: ':id', component: LoanComponent,
      }
    ]
  },
  {
    path: 'investments',
    children: [
      {
        path: '', component: InvestmentsComponent
      },
      {
        path: ':id', component: InvestmentComponent,
      }
    ]
  },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
