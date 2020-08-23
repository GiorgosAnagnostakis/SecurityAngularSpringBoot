package com.example.asfaleia.service;

import com.example.asfaleia.model.Product;
import com.example.asfaleia.model.Transaction;
import com.example.asfaleia.model.User;

import java.util.List;

public interface TransactionService {

    Transaction getTransactionById(Long id);

    List<Transaction> getAllTransactions();

    Transaction createTransaction(Product product);

    Transaction updateTransaction(Transaction transaction);

    void deleteTransaction(Long id);

    List<Transaction> getAllTransactionsByBuyer();
}
