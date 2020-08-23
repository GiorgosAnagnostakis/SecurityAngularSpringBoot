package com.example.asfaleia.service;

import com.example.asfaleia.model.Product;
import com.example.asfaleia.model.Transaction;
import com.example.asfaleia.model.User;
import com.example.asfaleia.repository.TransactionRepository;
import com.example.asfaleia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {


    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductService productService;

    @Override
    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException());
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public Transaction createTransaction(Product product) {

        Product oldProduct = productService.getProductById(product.getId());
        Transaction transaction = new Transaction();

        transaction.setProduct(product);
        transaction.setSeller(product.getUser());

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + auth.getName()));

        transaction.setBuyer(user);
        transaction.setQuantity(product.getQuantity());

        oldProduct.setQuantity(oldProduct.getQuantity() - product.getQuantity());
        productService.updateProduct(oldProduct);

        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction updateTransaction(Transaction product) {
        return transactionRepository.save(product);
    }

    @Override
    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    @Override
    public List<Transaction> getAllTransactionsByBuyer() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User buyer = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + auth.getName()));

        return transactionRepository.getAllByBuyer(buyer);
    }
}
