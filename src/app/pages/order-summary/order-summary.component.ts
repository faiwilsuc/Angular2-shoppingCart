import { Component, OnInit, Input} from '@angular/core';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { HttpService } from "../../services/http.service";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Router } from '@angular/router'

@Component({
  selector: 'p-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  providers: [HttpService]
})
export class OrderSummaryComponent implements OnInit {
  branches;
  products: any[];
  cart: any[];
  totalPrice = 0;
  branch;
  selectedDelivery: any[] = [];
  selectedFreight;
  freightCost;

  constructor(private router: Router, private shoppingCartService : ShoppingCartService, public httpService : HttpService, private toastyService:ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'default';
    this.freightCost = this.shoppingCartService.getFreight();

    var cartExist = this.shoppingCartService.getCart(); 
    
    if(cartExist){
      this.cart = this.shoppingCartService.getCart().items;
      this.cart.forEach(s => this.totalPrice += parseFloat(s.price) * parseFloat(s.quantity));
    } else {
      this.cart = [];
    }
  }

  confirmOrder(products: any = []) {
    this.toastyService.default('Order created!');
    this.cart = this.shoppingCartService.getCart().items;
    this.httpService.postCart(this.cart).subscribe(
      data => console.log(data)
    );
    this.shoppingCartService.clearCart();
    this.router.navigate(['/my-orders']);
  }

  ngOnInit() {
  }

}
