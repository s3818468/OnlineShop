package com.java.firebase;

import java.lang.String;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CRUD {
    private String document_id;
    private String name;
    private String password;
    private String type;
    private String phoneid;
    private String address;
}

@Getter @Setter
public class Product {
    private String product_id;
    private String name;
    private String description;
    private String imageUrl;
    private String price;
    private int discount; //1: 10%; 2: 20%; 3: 50%; 4: 80%
    private String owner;
    
}