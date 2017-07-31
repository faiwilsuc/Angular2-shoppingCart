import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product-list/'

@Component({
  selector: 'c-product-detail',
  templateUrl: 'product-detail.component.html',
  styleUrls: ['product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() selectedProduct: Product;

  constructor() {}

  ngOnInit() {
  }
}
