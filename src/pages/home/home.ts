import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';

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

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  ionViewWillEnter() {
      this.menu.swipeEnable(false); // desabilitar o Menu
    }

  ionViewDidLeave() {
      this.menu.swipeEnable(true); // Habilitar o Menu
    }

  login() {
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');
  }
}
