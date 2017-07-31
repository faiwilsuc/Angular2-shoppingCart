import { Component, OnChanges } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from "../services/shopping-cart.service";
import { AngularFireModule } from 'angularfire2';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'l-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  cartCounter: any;

  constructor(private authService: AuthService, private shoppingCartService : ShoppingCartService, af: AngularFireModule) {
    this.cartCounter = this.shoppingCartService.getCounter();
    this.shoppingCartService.cartCount$.subscribe(
      value => {
        this.cartCounter = value;
      },
      error => console.log(error)
    )
  }

  menuItems = [
    {id: 'BambooTableware', itemName: 'Bamboo Tableware', itemImg: '/images/coffee-cups.png'},
    {id: 'ClearContainers', itemName: 'Clear Containers', itemImg: '/images/clear-containers.png'},
    {id: 'ClearCups', itemName: 'Clear Cups', itemImg: '/images/clear-cups.png'},
    {id: 'CoffeeCupExtras', itemName: 'Coffee Cup Extras', itemImg: '/images/clear-cups.png'},
    {id: 'CoffeeCupLids', itemName: 'Coffee Cup Lids', itemImg: '/images/coffee-cups.png'},
    {id: 'CoffeeCups', itemName: 'Coffee Cups', itemImg: '/images/coffee-cups.png'},
    {id: 'EcoCutlery', itemName: 'Eco Cutlery', itemImg: '/images/eco-cutlery.png'},
    {id: 'EcoNapkin', itemName: 'Eco Napkin', itemImg: '/images/eco-napkin.png'},
    {id: 'KraftNoodleBoxes', itemName: 'Kraft Noodle Boxes', itemImg: '/images/coffee-cups.png'},
    {id: 'KraftTableware', itemName: 'Kraft Tableware', itemImg: '/images/coffee-cups.png'},
    {id: 'PaperBowls', itemName: 'Paper Bowls', itemImg: '/images/paper-bowls.png'},
    {id: '', itemName: 'All', itemImg: ''},
  ];

  sendCategory(itemName) {
    alert(itemName);
    return itemName;
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }
}
