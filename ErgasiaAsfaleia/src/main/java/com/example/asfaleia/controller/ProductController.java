package com.example.asfaleia.controller;

import com.example.asfaleia.model.Product;
import com.example.asfaleia.service.ProductService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Api
public class ProductController {

    @Autowired
    ProductService productService;

    @Secured({"ROLE_SELLER", "ROLE_BUYER"})
    @GetMapping(path = "/products/{id}")
    ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }

    @Secured({"ROLE_SELLER", "ROLE_BUYER", "ROLE_ADMIN"})
    @GetMapping(path = "/products")
    ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @Secured("ROLE_SELLER")
    @PostMapping(path = "/products")
    ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        return new ResponseEntity<>(productService.createProduct(product), HttpStatus.CREATED);
    }

    @Secured("ROLE_SELLER")
    @PutMapping(path = "/products")
    ResponseEntity<Product> updateProduct(@Valid @RequestBody Product product) {
        return new ResponseEntity<>(productService.updateProduct(product), HttpStatus.OK);
    }

    @Secured("ROLE_SELLER")
    @DeleteMapping(path = "/products/{id}")
    ResponseEntity<Void> deleteProduct(@Valid @PathVariable Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Secured("ROLE_SELLER")
    @GetMapping(path = "/productsBySeller")
    ResponseEntity<List<Product>> getAllProductsBySeller() {
        return new ResponseEntity<>(productService.getAllProductsBySeller(), HttpStatus.OK);
    }
}
