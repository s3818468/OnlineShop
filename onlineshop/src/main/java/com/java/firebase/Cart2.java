package com.java.firebase;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Cart2 {
    private String name;
    private String productId;
    private String username;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getProductId(){
        return productId;
    }
    public void setProductId(){
        this.productId = productId;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
