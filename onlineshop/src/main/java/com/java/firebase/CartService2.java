package com.java.firebase;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class CartService2 {
    public String createCart2(Cart2 cart) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("cart").document(cart.getName()).set(cart);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Cart2 getCart2(String documentId) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("cart").document(documentId);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        Cart2 cart;
        if (document.exists()) {
            cart = document.toObject(Cart2.class);
            return cart;
        }
        return null;
    }

    public String updateCart2(Cart2 cart) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("cart").document(cart.getName()).set(cart);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String deleteCart2(String documentId) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = (ApiFuture<WriteResult>) dbFirestore.collection("cart").document(documentId);

        return "Item(s) deleted" + documentId;
    }
}
