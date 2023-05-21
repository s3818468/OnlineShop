package com.java.firebase;

import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
public class CartController {
    public CartService cartService;
    public CartController(CartService cartService){
        this.cartService = cartService;
    }

    @PostMapping("/create/cart")
    public String createCart(@RequestBody  CRUD crud,Cart cart) throws InterruptedException, ExecutionException {
        return cartService.createCart(crud, cart);
    }
    @GetMapping("/get/cart")
    public Cart getCart(@RequestParam String documentId1, String documentId2) throws InterruptedException, ExecutionException {
        return cartService.getCart(documentId1, documentId2);
    }

    @PutMapping("/update/cart")
    public String updateCart(@RequestParam CRUD crud, Cart cart) throws InterruptedException, ExecutionException {
        return cartService.updateCart(crud,cart);
    }
    @PutMapping("/delete/cart")
    public String deleteCart(@RequestParam CRUD crud, String documentId) throws InterruptedException, ExecutionException {
        return cartService.deleteCart(crud, documentId);
    }
}
