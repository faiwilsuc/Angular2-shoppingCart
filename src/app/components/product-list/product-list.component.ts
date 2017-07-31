import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from "../../services/http.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SearchPipe } from '../../pipes/search.pipe';

import { Product } from './product';
import { ProductItemComponent } from './product-item.component';

@Component({
  selector: 'c-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css'],
  providers: [HttpService]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filter: string = '';  
  @Input() term : String;
  
  constructor( private httpService: HttpService, private route: ActivatedRoute,
  private router: Router) {

  let filter;
  this.route.params.forEach((params: Params) => {
    filter = params['id'];
  });

    this.httpService.getProductsCatalogue(filter)
      .subscribe(
        data => {
          var myArray = [];
          for(let key in data){
            myArray.push(data[key]);
          }
          this.products = myArray;
        }
      );
  }
  
ngOnInit() {
}
  
  @Output() productSelected = new EventEmitter<Product>();

  onSelected(product: Product) {
    this.productSelected.emit(product);
  }

}
