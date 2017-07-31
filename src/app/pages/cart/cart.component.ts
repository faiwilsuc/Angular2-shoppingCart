import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { HttpService } from "../../services/http.service";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

var firebase = require('firebase');

@Component({
  selector: 'shopping-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss'],
  providers: [HttpService]
})
export class CartComponent implements OnInit {
  branches;
  products: any[];
  cart: any[];
  totalPrice = 0;
  newTotal = 0;
  branch;
  selectedDelivery: any[] = [];
  selectedFreight;

  @Input() quantity;
  

  constructor(private shoppingCartService : ShoppingCartService, public httpService : HttpService, private toastyService:ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'default';
    
      let userId;
      let that = this;

      var cartExist = this.shoppingCartService.getCart(); 
      
      var user = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          userId = user.uid;
          that.httpService.getBranches().subscribe(
              data => {
                that.branches = data
                that.selectedFreight = that.branches[0];
              }
          );
        } else {
          userId = 0;
        }
      });
    

    if(cartExist){
      this.cart = this.shoppingCartService.getCart().items;
      // this.cart.forEach(s => this.totalPrice += parseFloat(s.price) * parseFloat(s.quantity));
      for (let i in this.cart){
        this.totalPrice += this.cart[i].price * this.cart[i].quantity;
      }

      let freightCost = this.shoppingCartService.getFreight();
      this.totalPrice += freightCost;

    } else {
      this.cart = [];
    }

  }

  saveQuantity(qtd, sku){
    this.shoppingCartService.saveQuantity(qtd, sku);
    // var newTotal;
    // for(var i=0;i <this.cart.length;i++)
    // {
    //   newTotal =+ (parseFloat(this.cart[i].quantity) * parseFloat(this.cart[i].price));
    //   this.newTotal = newTotal;
    // }
    // return newTotal;
  }

  selectDelivery(value){
      for(let i in this.branches){
        if(this.branches[i].id == value){
            this.selectedDelivery = this.branches[i];
            this.selectedFreight = this.selectedDelivery;
        }
      }
      this.shoppingCartService.saveFreight(this.selectedFreight.freightCost);
  }

  ngOnInit() {
    this.selectedFreight = this.selectedDelivery;
  }
}
