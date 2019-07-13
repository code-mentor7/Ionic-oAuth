import { AuthProvider } from '../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Object } from '../../app/app.types';
import { UserPage } from '../user/user';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private auth: AuthProvider, private navgiation: NavController) {
    //Retrive user from local storage
    let user = this.auth.getUser();
    if (!user)
      return;
    this.openUserPage(user);
  }

  
  public googleAuth() {
    //Init Google Auth
    this.auth.googleAuthentication().subscribe(user => {
      //On Success event , open user page to show user info
      this.openUserPage(user);
    }, err => {
      alert('Error in communicating with server');
    });
  }

  //Sets , roor as Userpage
  private openUserPage(user: Object) {
    this.navgiation.setRoot(UserPage, { user: user });
  }

}
