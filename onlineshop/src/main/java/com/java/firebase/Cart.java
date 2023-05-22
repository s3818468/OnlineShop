package com.java.firebase;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class Cart {
    @Id
    @GeneratedValue
    private Long CartId;
    private String username;
    private String ProductIds;

    public String getUsername() {
        return username;
    }

    public Long getCartId() {
        return CartId;
    }

    public void setCartId(Long cartId) {
        CartId = cartId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProductIds() {
        return ProductIds;
    }

    public void setProductIds(String productIds) {
        ProductIds = productIds;
    }


}
