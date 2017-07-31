import { Component, ViewContainerRef } from '@angular/core';
import { HeaderComponent, FooterComponent } from './layout';
import { MyProductsComponent } from './pages/my-products';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(af: AngularFire){
  }
}
