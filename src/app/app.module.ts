import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { ToastyModule } from 'ng2-toasty';

import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

import { AngularFireModule } from 'angularfire2';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ShoppingCartService } from './services/shopping-cart.service';

import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';

import { SignupComponent } from './pages/signup';
import { LoginComponent } from './pages/login';
import { MyProductsComponent } from './pages/my-products';
import { MyOrdersComponent } from './pages/my-orders';
import { MySettingsComponent } from './pages/my-settings';
import { ProductCatalogueComponent } from './pages/product-catalogue';
import { CartComponent } from './pages/cart';
import { CartOrderComponent } from './pages/cart';

import { AddCartComponent } from './components/add-cart';
import { ProductItemComponent } from './components/product-list';
import { ProductDetailComponent } from './components/product-detail';
import { ProductListComponent } from './components/product-list';
import { MyProductListComponent } from './components/product-list/my-product-list.component';
import { ShoppingCartComponent } from './components/shopping-cart';

import { AppComponent } from './app.component';
import { SearchPipe } from './pipes/search.pipe';
import { MultiSearchPipe } from './pipes/multisearch.pipe';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';

export const firebaseConfig = {
    apiKey: "AIzaSyC7aEJF-fWpfMakqfTjlhoeVmxeXZRDYwI",
    authDomain: "ecoware-2c220.firebaseapp.com",
    databaseURL: "https://ecoware-2c220.firebaseio.com",
    storageBucket: "ecoware-2c220.appspot.com"
};

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ModalModule,
        ToastyModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig),
        RouterModule.forRoot([
        { path: '', redirectTo: '/my-products', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'signup', component: SignupComponent },
        { path: 'my-products', component: MyProductsComponent },
        { path: 'my-orders', component: MyOrdersComponent },
        { path: 'my-settings', component: MySettingsComponent },
        { path: 'cart', component: CartComponent },
        { path: 'cart/:OrderId', component: CartOrderComponent },
        { path: 'order-summary', component: OrderSummaryComponent },
        { path: 'product-catalogue', component: ProductCatalogueComponent },
        { path: 'product-catalogue/:id', component: ProductCatalogueComponent },
        { path: 'contact', component: ContactComponent }
        ])
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SignupComponent,
        LoginComponent,
        MyProductsComponent,
        MyOrdersComponent,
        MySettingsComponent,
        ProductCatalogueComponent,
        CartComponent,
        CartOrderComponent,
        AddCartComponent,
        ProductDetailComponent,
        ProductItemComponent,
        ProductListComponent,
        MyProductListComponent,
        ShoppingCartComponent,
        SearchBoxComponent,
        ContactComponent,
        ShoppingCartComponent,
        SearchPipe,
        MultiSearchPipe,
        OrderSummaryComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthService,
        AuthGuard,
        ShoppingCartService,
    ]
})

export class AppModule {}