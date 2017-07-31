import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from "../../services/http.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-catalogue',
  templateUrl: 'product-catalogue.component.html',
  styleUrls: ['product-catalogue.component.css'],
  providers: [HttpService]
})
export class ProductCatalogueComponent implements OnInit {
  @Input() term;
  filter: string = '';

  constructor( private route: ActivatedRoute, private router: Router) {

    let filter;
    this.route.params.forEach((params: Params) => {
      filter = params['id'];
      this.filter = filter;
    });
  }

  ngOnInit() {
  }

}
