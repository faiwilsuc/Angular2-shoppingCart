import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from './product';
import { SelectedOption } from './selected-option';
import { Router } from '@angular/router';


@Component({
  selector: 'c-product-item',
  templateUrl: 'product-item.component.html',
  styleUrls: ['product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  isMyProduct: boolean;
  selectedOption;
  public location = '';

  constructor( private _router : Router ) {
    console.log('product:', this.product);
    this.location = _router.url;
    if(this.location == '/my-products'){
      this.isMyProduct = true;
    } else {
      this.isMyProduct = false;
    }
  }

  selectOption(value){
      for(let i in this.product.Options){
        if(this.product.Options[i].SKU == value){
            this.selectedOption = this.product.Options[i];
        }
      }
  }

  ngOnInit() {
    this.selectedOption = this.product.Options[0];
  }
}
