import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/domain/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter() {
      this.menu.swipeEnable(false); // desabilitar o Menu
    }

  ionViewDidLeave() {
      this.menu.swipeEnable(true); // Habilitar o Menu
    }

  login() {
    this.auth.autheticated(this.creds)
      .subscribe(response => {
         this.auth.successfullLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('CategoriasPage');
      },
    error => {});
    

  }
}
