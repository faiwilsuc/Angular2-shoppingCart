import { Component, OnInit} from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import 'rxjs/Rx';

var firebase = require('firebase');

@Component({
  selector: 'app-my-settings',
  templateUrl: 'my-settings.component.html',
  styleUrls: ['my-settings.component.scss'],
  providers: [HttpService]
})

export class MySettingsComponent implements OnInit{

  userDetails;
  userDetailsCin7: any = {};
  
  constructor(public httpService: HttpService, private toastyService:ToastyService, private toastyConfig: ToastyConfig) {
      this.toastyConfig.theme = 'default';

      let userId;
      let that = this;
      
      var user = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          userId = user.uid;
          that.httpService.getUser()
          .subscribe( userDetails => {that.userDetails = userDetails;});

          that.httpService.getUserDetailsCin7()
          .subscribe( userDetailsCin7 => {that.userDetailsCin7 = userDetailsCin7;});
        } else {
          userId = 0;
        }
      });
  }

  sendPasswordReset(){
    this.toastyService.default('E-mail sent! Please check it.');
    firebase.auth().sendPasswordResetEmail(this.userDetails.email)
        .then(function(result){
            console.log('E-mail sent to ' + this.userDetails.email);
        })
        .catch(function(error) {
    	    console.log('Errorrrrr: ' + error + '... e-mail was sent though. ');
        });
  }

  ngOnInit(){
  }

}
