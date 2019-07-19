import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  investments  = [
    {
      id: 1111,
      imageUrl: "https://images.unsplash.com/photo-1559743702-14419ca95ca4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      farmer: 'Tope Idowu',
      'name': 'Maize Farm',
      'stage': 'planting',
      'available': '800 tons',
      'price': '5000',
      type: 'planting'
    },
    {
      id: 1111,
      imageUrl: "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      farmer: 'Folarin Bolatito',
      'name': 'Tomatoes Farm',
      'stage': 'planting',
      'available': '800 tons',
      'price': '5000',
      type: 'planting'
    },
    {
      id: 1111,
      imageUrl: "https://images.unsplash.com/photo-1501812271548-22b85c830741?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      farmer: 'Julius Idowu',
      'name': 'Plantain Farm',
      'stage': 'planting',
      'available': '900 tons',
      'price': '7500',
      type: 'planting'
    },
    {
      id: 1111,
      imageUrl: "https://images.unsplash.com/photo-1559743702-14419ca95ca4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      farmer: 'Folarin Idowu',
      'name': 'Avocado Farm',
      'stage': 'planting',
      'available': '300 tons',
      'price': '2500',
      type: 'planting'
    },
    // {
    //   id: 1213045,
    //   imageUrl: "https://images.unsplash.com/photo-1504868142167-10e75ba4b1da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    //   farmer: 'Bolatito Isogun',
    //   name: 'Cattle Farm',
    //   'available': '72 units',
    //   'price': '5000',
    //   type: 'animals'
    // }
  ];
  constructor( private rest: RestApiService) { }

  ngOnInit() {
    this.rest.getInvestments().subscribe(data => {
      console.log(data)
    })
  }

}
