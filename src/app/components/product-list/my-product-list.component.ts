import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from "../../services/http.service";
import { SearchPipe } from '../../pipes/search.pipe';

import { Product } from './product';
import { ProductItemComponent } from './product-item.component';

var firebase = require('firebase');

@Component({
  selector: 'c-my-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css'],
  providers: [HttpService]
})
export class MyProductListComponent implements OnInit {
  products: any[] = [];
  @Input() term : String;

  constructor(private httpService: HttpService) {
      let userId;
      let previousOrders;
      
      var user = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          userId = user.uid

          firebase.database().ref('users/' + userId + '/myProducts').once('value').then((snapshot) => {
          previousOrders = snapshot.val();

          this.httpService.getMyProducts(previousOrders)
            .subscribe(
              data => {
                var myArray = [];
                for(let key in data){
                  myArray.push(data[key]);
                }
                this.products = myArray;
              }
            );
          });  
        } else {
          userId = 0;
        }
      });
    }      

  ngOnInit(){
  }
  
  @Output() productSelected = new EventEmitter<Product>();

  onSelected(product: Product) {
    this.productSelected.emit(product);
  }

}
