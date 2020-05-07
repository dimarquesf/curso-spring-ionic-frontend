import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public categoriaService: CategoriaService 

    ) {

  }

  ionViewDidLoad() {

    // fazendo chamando assicrona e se inscrevendo pra quando a resposta chegar execultar a função
    this.categoriaService.findAll()
      .subscribe(response => {
        console.log(response); // pega a resposta e posta na tela quando da sucesso); 
      },
      error => {
        console.log(error);
      });

  } 

}
