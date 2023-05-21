package com.java.firebase;

import com.google.api.core.ApiFuture;
import com.google.api.core.ApiFutures;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.protobuf.Api;
import org.springframework.stereotype.Service;

import javax.swing.text.Document;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ProductService {
    public String createProduct(Product p) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("product").document(p.getName()).set(p);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }
    public Product getProduct(String productId) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("product").document(productId);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        Product p;
        if (document.exists()) {
            p = document.toObject(Product.class);
            return p;
        }
        return null;
    }
    public List<Product> getAllProduct() throws ExecutionException, InterruptedException{
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("product").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Product> list = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents){
            Product temp = document.toObject(Product.class);
            list.add(temp);
        }
        return list;
    }
    public String updateProduct(Product p) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection("product").document(p.getName()).set(p);
        return collectionApiFuture.get().getUpdateTime().toString();
    }
    public String deleteProduct(String productID) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection("product").document(productID).delete();

        return "Item(s) deleted" + productID;
    }

}