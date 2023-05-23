package com.java.firebase;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class CartService {
    public String createCart(Cart cart) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("cart").document(cart.getCartId().toString()).set(cart);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }


    public List<Cart> getCart(String username) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference cartsCollection = dbFirestore.collection("cart");
        Query query = cartsCollection.whereEqualTo("username", username);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        List<Cart> carts = new ArrayList<>();
        for (DocumentSnapshot document : documents) {
            Cart cart = document.toObject(Cart.class);
            carts.add(cart);
        }

        return carts;
    }

    public String updateCart(Cart cart) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("cart").document(cart.getUsername()).set(cart);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String deleteCart(String documentId) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = (ApiFuture<WriteResult>) dbFirestore.collection("cart").document(documentId).delete();

        return "Item(s) deleted" + documentId;
    }
