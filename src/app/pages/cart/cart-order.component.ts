import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from "../../services/http.service";

@Component({
  selector: 'shopping-cart',
  templateUrl: 'cart-order.component.html',
  styleUrls: ['cart.component.scss'],
  providers: [HttpService]
})
export class CartOrderComponent implements OnInit {
  cart: any = {};
  items: any;

  constructor(private shoppingCartService : ShoppingCartService, private httpService: HttpService, private route: ActivatedRoute,
  private router: Router) {
    let OrderId;

    this.route.params.forEach((params: Params) => {
      OrderId = params['OrderId'];
    });
      
    this.httpService.getOrdersRef(OrderId).subscribe(data => this.cart = data);
  }
  
  createNewCart(){
    var r = confirm("This action will replace your cart, Do you want to proceed?");
    if (r == true) {
        console.log(this.cart);
        
        this.shoppingCartService.clearCart();
        this.shoppingCartService.createNewCart(this.cart);
        // this.router.navigate(['order-summary']);
    } else {
        alert('Nothing happened');
    }
  }

  ngOnInit() {
  }

}
