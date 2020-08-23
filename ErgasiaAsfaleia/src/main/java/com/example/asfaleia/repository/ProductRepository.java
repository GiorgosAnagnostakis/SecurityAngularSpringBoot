package com.example.asfaleia.repository;

import com.example.asfaleia.model.Product;
import com.example.asfaleia.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByUserId (Long id);
}
