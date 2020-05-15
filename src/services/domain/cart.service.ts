import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { StorageService } from "../storage.service";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    createOrClearCart() : Cart { // criar ou limpar carrrinho
        let cart: Cart = {items: []}; //variavel local recebendo um novo objeto de lista vazinha
        this.storage.setCart(cart); 
        return cart;
    }

    getCart() : Cart { // obter o carrinhi
        let cart: Cart = this.storage.getCart(); 
        if (cart == null) { // se o cart do storage for vazia
            cart = this.createOrClearCart(); // criar um carrinho
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart { //adicionar produto no carrinho
        let cart = this.getCart(); 
        let position = cart.items.findIndex(x => x.produto.id == produto.id); //cujo item tem o mesmo id do produto que quero inserir, (findIndex=se exister na lista retornma a posição dele, se não retorna valor menos 1 )
        if (position == -1) { 
            cart.items.push({quantidade: 1, produto: produto}); //inserir elemento na lista ( item de carrinho)
        }
        this.storage.setCart(cart); //atualizar
        return cart; // retorno atualizado
    }

    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items.splice(position, 1); //splice = remover
        }
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade++; //incrementar prduto nessa posição
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade--;
            if (cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total() : number {
        let cart = this.getCart();
        let sum = 0;
        for (var i=0; i<cart.items.length; i++) {
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }
}