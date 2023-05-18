package com.java.firebase;


import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Product {
    private String product_id;
    private String name;
    private String description;
    private String imageUrl;
    private String price;
    private Integer discount; //1: 10%; 2: 20%; 3: 50%; 4: 80%
    private String owner;

}