package com.example.asfaleia.controller;

import com.example.asfaleia.model.Product;
import com.example.asfaleia.model.Transaction;
import com.example.asfaleia.service.TransactionService;
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
@Secured("ROLE_BUYER")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @GetMapping(path = "/transaction/{id}")
    ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        return new ResponseEntity<>(transactionService.getTransactionById(id), HttpStatus.OK);
    }

    @GetMapping(path = "/transaction")
    ResponseEntity<List<Transaction>> getAllTransactions() {
        return new ResponseEntity<>(transactionService.getAllTransactions(), HttpStatus.OK);
    }

    @PostMapping(path = "/transaction")
    ResponseEntity<Transaction> createTransaction(@Valid @RequestBody Product product) {
        return new ResponseEntity<>(transactionService.createTransaction(product), HttpStatus.CREATED);
    }

    @PutMapping(path = "/transaction")
    ResponseEntity<Transaction> updateTransaction(@Valid @RequestBody Transaction transaction) {
        return new ResponseEntity<>(transactionService.updateTransaction(transaction), HttpStatus.OK);
    }

    @DeleteMapping(path = "/transaction/{id}")
    ResponseEntity<Void> deleteTransaction(@Valid @PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(path = "/transactionbybuyer")
    ResponseEntity<List<Transaction>> getAllTransactionsByBuyer() {
        return new ResponseEntity<>(transactionService.getAllTransactionsByBuyer(), HttpStatus.OK);
    }
}
