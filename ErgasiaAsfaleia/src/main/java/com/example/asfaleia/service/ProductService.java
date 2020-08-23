package com.example.asfaleia.service;

import com.example.asfaleia.model.Product;

import java.util.List;

public interface ProductService {

    Product getProductById(Long id);

    List<Product> getAllProducts();

    Product createProduct(Product product);

    Product updateProduct(Product product);

    void deleteProduct(Long id);

    List<Product> getAllProductsBySeller();
}
