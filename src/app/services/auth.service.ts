import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import { User } from './user.interface';

var firebase = require('firebase');

@Injectable()
export class AuthService {
    constructor(private router: Router, af: AngularFireModule){}

    signupUser(user: User){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function(result){
            firebase.database().ref('users/' + result.uid).set({
            userDetails:{
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                billingAddress: user.billingAddress,
                cin7ID: user.cin7ID
            },
            branches: [
                {id: 0, deliveryAddress: user.billingAddress, freightCost: 1, bulkFreightCost: 2, deliveryBranchID: 0}
            ],
            myProducts: [0]
            });
            alert('Account created! :)');
        })
        .catch(function(error) {
    	    alert('Error: ' + error);
        });
    }

    loginUser(user: User){
        var that = this;
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(function(result){
            localStorage.setItem('jwt', result.ld);
            console.log('You are logged in! :)');
            that.router.navigate(['/my-products']);
        })
        .catch(function(error) {
    	    console.log('Errorrrrr: ' + error);
        });
    }

    logout(){
        firebase.auth().signOut();
        this.router.navigate(['/login']);
        console.log('You were logged out! :/');
    }

    isAuthenticated() {
        var user = firebase.auth().currentUser;

        if (user) {
            return true;
        } else {
            return false;
        }
    }
}
