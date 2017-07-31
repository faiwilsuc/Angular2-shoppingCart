import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from "../../services/http.service";

@Component({
  selector: 'p-my-products',
  templateUrl: 'my-products.component.html',
  styleUrls: ['my-products.component.css'],
  providers: [HttpService]
})
export class MyProductsComponent implements OnInit {

  @Output() update = new EventEmitter();

  constructor(private httpService: HttpService) {}

  ngOnInit(){
    this.update.emit('');
  }

  onSubmit(name: string, imgSrc: string, price: string){
    this.httpService.sendProduct({name: name, imgSrc: imgSrc, price: price})
      .subscribe(
        data => console.log(data)
      );
  }

}
