import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { PortfolioComponent } from './portfolio/portfolio.component'


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
