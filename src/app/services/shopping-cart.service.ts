import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class ShoppingCartService {
    private cartItems;

    private cartCountSource = new Subject<boolean>();

    cartCount$ = this.cartCountSource.asObservable();    

    addItem(product, selectedOption, quantity){
        var shoppingCart = localStorage.getItem('shoppingCart');
        var shoppingCartObj = JSON.parse(shoppingCart);
    
        if(shoppingCart == null) {
            console.log('Cart is empty, preparing new cart array');
            this.cartItems = {
                'count': '0',
                'freight': '0',
                'items':[]
            };
            console.log('Cart array created');
        } else {
            this.cartItems = {
                'count': shoppingCartObj.count,
                'freight': shoppingCartObj.freight,
                'items': shoppingCartObj.items
            }
        }

        if(!quantity){
            quantity = 1;
        }

        this.cartItems.items.push({
            'sku': selectedOption.SKU,
            'name': product.Name,
            'size': selectedOption.Size,
            'units': selectedOption.UnitsPerCarton,
            'price': selectedOption.RetailPrice,
            'image': selectedOption.Image,
            'quantity': quantity
        })

        var cartCount = this.cartItems.count;
        console.log('Current cart count: '+cartCount);
        cartCount++;
        console.log('New cart count: '+cartCount);
        this.cartItems.count = cartCount.toString();
        this.cartCountSource.next(this.cartItems.count);

        localStorage.setItem('shoppingCart', JSON.stringify(this.cartItems));
    }

    deleteItem(product){
        var shoppingCart = localStorage.getItem('shoppingCart');
        var shoppingCartObj = JSON.parse(shoppingCart);
        var cartItems = shoppingCartObj.items;

        for (var i = 0; i < cartItems.length; i++) {
            if (cartItems[i].sku == product) {
                cartItems.splice(i, 1);
            }
        }

        var newCart = {
            count: JSON.stringify(cartItems.length),
            items: cartItems
        }

        localStorage.setItem('shoppingCart', JSON.stringify(newCart));
        location.reload();
    }

    createNewCart(products){
        this.clearCart();

         let cartItems = {
            'count': products.OrderDetails.length,
            'freight': products.FreightTotal,
            'items':[]
         };

         for (let i in products.OrderDetails){
            cartItems.items.push(products.OrderDetails[i])
         }

        localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    }

    saveQuantity(qtd, sku){
        var shoppingCart = localStorage.getItem('shoppingCart');
        var shoppingCartObj = JSON.parse(shoppingCart);
        var cartItems = shoppingCartObj.items;

        for (var i = 0; i < cartItems.length; i++) {
            if(cartItems[i].sku == sku){
                cartItems[i].quantity = qtd;
            }
        }

        var newCart = {
            count: JSON.stringify(cartItems.length),
            items: cartItems
        }

        localStorage.setItem('shoppingCart', JSON.stringify(newCart));
    }

    saveFreight(value){
        var shoppingCart = localStorage.getItem('shoppingCart');
        var shoppingCartObj = JSON.parse(shoppingCart);
        var cartItems = shoppingCartObj.items;
        var cartFreight = value;
        var newCart = {
            count: JSON.stringify(cartItems.length),
            freight: cartFreight,
            items: cartItems
        }

        localStorage.setItem('shoppingCart', JSON.stringify(newCart));
    }

    getFreight(){
        var shoppingCart = localStorage.getItem('shoppingCart');
        var shoppingCartObj = JSON.parse(shoppingCart);
        console.log(shoppingCartObj.freight);
        return shoppingCartObj.freight;
    }
    
    getCounter(){
        var shoppingCart = localStorage.getItem('shoppingCart');
        if (shoppingCart){
            var shoppingCartObj = JSON.parse(shoppingCart);
            return shoppingCartObj.count;
        } else {
            return '0';
        }
    }

    clearCart(){
        localStorage.removeItem('shoppingCart');
    }

    getCart(){
        var shoppingCart = localStorage.getItem('shoppingCart');
        if(shoppingCart){
            return JSON.parse(shoppingCart);
        } else {
            return false;
        }
    }
}