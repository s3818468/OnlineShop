package com.java.firebase;

import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
public class CartController2 {
    public CartService2 cartService2;
    public CartController2(CartService2 cartService2){
        this.cartService2 = cartService2;
    }

    @PostMapping("/create/cart2")
    public String createCart2(@RequestBody Cart2 cart) throws InterruptedException, ExecutionException {
        return cartService2.createCart2(cart);
    }
    @GetMapping("/get/cart2")
    public Cart2 getCartcart(@RequestParam String documentId) throws InterruptedException, ExecutionException {
        return cartService2.getCart2(documentId);
    }

    @PutMapping("/update/cart2")
    public String updateCartcart(@RequestParam Cart2 cart) throws InterruptedException, ExecutionException {
        return cartService2.updateCart2(cart);
    }
    @PutMapping("/delete/cart2")
    public String deleteCartcart(@RequestParam String documentId) throws InterruptedException, ExecutionException {
        return cartService2.deleteCart2(documentId);
    }
}
