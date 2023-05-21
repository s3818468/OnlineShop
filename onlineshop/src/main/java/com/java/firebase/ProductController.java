package com.java.firebase;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {

    public ProductService productService;
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @PostMapping("/product/create")
    public String createProduct(@RequestBody Product p) throws InterruptedException, ExecutionException {
        return productService.createProduct(p);
    }

    @GetMapping("/product/get")
    public Product getProduct(@RequestParam String productId) throws InterruptedException, ExecutionException {
        return productService.getProduct(productId);
    }
    @GetMapping("/product/getAll")
    public List<Product> getAllProduct() throws InterruptedException, ExecutionException{
        List<Product> list = productService.getAllProduct();
        return list;
    }
    @PutMapping("/product/update")
    public String updateProduct(@RequestBody Product p) throws InterruptedException, ExecutionException {
        return productService.updateProduct(p);
    }
    @PutMapping("product/delete")
    public String deleteProduct(@RequestParam String productID) throws InterruptedException, ExecutionException {
        return productService.deleteProduct(productID);
    }

    @GetMapping("product/test")
    public ResponseEntity<String> testGetEndpoint() {
        return  ResponseEntity.ok("Test is working");
    }
}


