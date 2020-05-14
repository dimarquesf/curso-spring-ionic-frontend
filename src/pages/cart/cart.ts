import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Component } from "@angular/core";
import { CartItem } from "../../models/cart-item";
import { CartService } from "../../services/domain/cart.service";
import { ProdutoService } from "../../services/domain/produto.service";
import { API_CONFIG } from "../../config/api.config";

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart(); //pegar carrinho do localStorage
    this.items = cart.items; 
    this.loadImageUrls(); //imagem carrecadas no carrinho
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
        error => {});
    }
  }  
}