package com.java.firebase;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
public class CRUDController {

    public CRUDService crudService;
    public CRUDController(CRUDService crudService){
        this.crudService = crudService;
    }

    @PostMapping("/create")
    public String createCRUD(@RequestBody CRUD crud) throws InterruptedException, ExecutionException {
        return crudService.createCRUD(crud);
    }

    @GetMapping("/get")
    public CRUD getCRUD(@RequestParam String documentId) throws InterruptedException, ExecutionException {
        return crudService.getCRUD(documentId);
    }

    @PutMapping("/update")
    public String updateCRUD(@RequestParam CRUD crud) throws InterruptedException, ExecutionException {
        return crudService.updateCRUD(crud);
    }
    @PutMapping("/delete")
    public String deleteCRUD(@RequestParam String documentId) throws InterruptedException, ExecutionException {
        return crudService.deleteCRUD(documentId);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testGetEndpoint() {
        return  ResponseEntity.ok("Test is working");
    }
}
