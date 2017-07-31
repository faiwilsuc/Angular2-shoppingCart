import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";

@Component({
  selector: 'app-my-orders',
  templateUrl: 'my-orders.component.html',
  styleUrls: ['my-orders.component.scss'],
  providers: [HttpService]
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private httpService: HttpService) {
    this.httpService.getMyOrders()
    .subscribe(
      data => {
        var myArray = [];
        for(let key in data){
          myArray.push(data[key]);
        }
        this.orders = myArray;
      }
    );
  }

  ngOnInit() {
  }

}
