package com.example.asfaleia.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "TRANSACTIONS")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_REF")
    @JsonIgnoreProperties({"user", })
    private Product product;

    @ManyToOne
    @JoinColumn(name = "BUYER_REF")
    @JsonIgnoreProperties({"products", "Buyer", "Seller"})
    private User buyer;

    @ManyToOne
    @JoinColumn(name = "SELLER_REF")
    @JsonIgnoreProperties({"products", "Buyer", "Seller"})
    private User seller;

    @Column(name = "QUANTITY")
    private Long quantity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }
}
