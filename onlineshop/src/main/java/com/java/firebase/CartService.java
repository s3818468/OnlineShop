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
public class CartService {
    public String createCart(CRUD crud, Cart cart) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("crud_user").document(crud.getName()).collection("cart").document(cart.getName()).set(cart);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Cart getCart(String documentId1, String documentId2) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("crud_user").document(documentId1).collection("cart").document(documentId2);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        Cart cart;
        if (document.exists()) {
            cart = document.toObject(Cart.class);
            return cart;
        }
        return null;
    }

    public String updateCart(CRUD crud, Cart cart) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("crud_user").document(crud.getName()).collection("cart").document(cart.getName()).set(cart);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String deleteCart(CRUD crud, String documentId) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = (ApiFuture<WriteResult>) dbFirestore.collection("crud_user").document(crud.getName()).collection("cart").document(documentId);

        return "Item(s) deleted" + documentId;
    }
}
