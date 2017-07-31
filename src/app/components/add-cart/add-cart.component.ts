import { Component, Input } from '@angular/core';
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Product } from '../product-list';
import { SelectedOption } from '../product-list';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'add-cart',
  template: '<button class="btn btn-success" style="padding: 10px 40px;" (click)="addToCart(product, selectedOption, quantity)">Add to Cart</button>',
  styleUrls: ['add-cart.component.scss']
})
export class AddCartComponent {

  @Input() product = Product;
  @Input() selectedOption = SelectedOption;
  @Input() quantity;

  constructor(private shoppingCartService : ShoppingCartService, private toastyService:ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'default';
  }

  addToCart(product: any = {}, selectedOption, quantity) {
    this.shoppingCartService.addItem(product, selectedOption, quantity);
    this.toastyService.default('Item added to cart!');
  }
}
