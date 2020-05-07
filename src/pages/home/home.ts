import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  ionViewWillEnter() {
      this.menu.swipeEnable(false); // desabilitar o Menu
    }

  ionViewDidLeave() {
      this.menu.swipeEnable(true); // Habilitar o Menu
    }

  login() {
    this.navCtrl.setRoot('CategoriasPage');
  }
}
