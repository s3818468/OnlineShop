package com.java.firebase;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin(origins = "*")
public class CartController {
    public CartService cartService;
    public CartController(CartService cartService){
        this.cartService = cartService;
    }

    @PostMapping("/cart/create")
    public String createCart(@RequestBody Cart cart) throws InterruptedException, ExecutionException {
        return cartService.createCart(cart);
    }
    @GetMapping("/cart/get")
    public List<Cart> getCartsByUsername(@RequestParam String username) throws InterruptedException, ExecutionException {
        return cartService.getCart(username);
    }

    @PutMapping("/cart/update")
    public String updateCart(@RequestParam Cart cart) throws InterruptedException, ExecutionException {
        return cartService.updateCart(cart);
    }
    @PutMapping("/cart/delete")
    public String deleteCart(@RequestParam String documentId) throws InterruptedException, ExecutionException {
        return cartService.deleteCart(documentId);
    }
}