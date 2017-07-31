import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { AngularFire } from 'angularfire2';

import { User } from './user.interface';

var firebase = require('firebase');

let tokenJWT = localStorage.getItem('jwt');
let headers = new Headers({ 'Authorization': tokenJWT }); // ... Set content type to JSON
let options = new RequestOptions({ headers: headers }); // Create a request option
let userId;


@Injectable()
export class HttpService {
  
  constructor(private http: Http, private af: AngularFire) {
  }

  sendProduct(SKUS){
    let userId = firebase.auth().currentUser.uid;
    const body = JSON.stringify(SKUS);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this.http.post('https://ecoware-2c220.firebaseio.com/users/' + userId + '.json', body, {
      headers: headers
    })
      .map((response: Response) => response.json());
  }

  getProduct() {
    let userId = firebase.auth().currentUser.uid;
    return this.http.get('https://ecoware-2c220.firebaseio.com/products.json')
      .map((response: Response) => response.json());
  }

  getUser() {
    let userId = firebase.auth().currentUser.uid;
    return this.http.get('https://ecoware-2c220.firebaseio.com/users/' + userId + '/userDetails.json')
      .map((response: Response) => response.json());
  }

  getBranches() {
    let userId = firebase.auth().currentUser.uid;
    return this.http.get('https://ecoware-2c220.firebaseio.com/users/' + userId + '/branches.json')
      .map((response: Response) => response.json());
  }

  getUserDetailsCin7(){
    return this.http.get('https://choi-ecoware.azurewebsites.net/api/members/1904', options)
      .map((response: Response) => response.json());
  }

  getProductsCatalogue(filter){
    if (filter){
    return this.http.get('https://choi-ecoware.azurewebsites.net/api/ProductCatalogue/' + filter, options)
      .map((response: Response) => response.json());
    } else {
      return this.http.get('https://choi-ecoware.azurewebsites.net/api/ProductCatalogue/', options)
      .map((response: Response) => response.json());
    }
  }

  getMyProducts(previousOrders){
      let ordersList = []
      for (let i in previousOrders){
        ordersList.push(previousOrders[i]);
      }
      return this.http.get('https://choi-ecoware.azurewebsites.net/api/MyProduct/' + ordersList, options)
      .map((response: Response) => response.json());
  }

  getMyOrders(){
    return this.http.get('https://choi-ecoware.azurewebsites.net/api/OrderHistory', options)
      .map((response: Response) => response.json());
  }

  getOrdersRef(OrderId){
    return this.http.get('https://choi-ecoware.azurewebsites.net/api/OrderDetails/' + OrderId, options)
      .map((response: Response) => response.json());
  }

  saveMyProducts(skus) {
    let userId = firebase.auth().currentUser.uid;

    var ids = skus.map(function(i) {
        return i['sku'];
    });

    const items = this.af.database.list('users/'+ userId + '/myProducts/');
    for(let i in ids){
      items.push(ids[i]);
    }
  }

  postCart(cart){
    this.saveMyProducts(cart);

    let freight = {"SKU":"Freight","Quantity":"84.00", "FreightCost" : "22", "BulkFreightCost" : "33", "DeliveryID": "1620", "DeliveryBranchID": "1666"}
    cart.push(freight);

    let order = cart;

    for (let i in order){
      delete cart[i].size;
      delete cart[i].name;
      delete cart[i].units;
      delete cart[i].price;
      delete cart[i].image;
      console.log(cart[i]);
    }

    let body = order;

    headers.append('Content-Type', 'application/json')
    return this.http.post('https://choi-ecoware.azurewebsites.net/api/Orders', body, options)
    .map((res:Response) => {
      res.json();
    })
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}
