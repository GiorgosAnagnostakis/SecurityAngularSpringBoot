import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Validators, FormBuilder } from '@angular/forms';
import { Product } from 'src/swagger-generated';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  

  @Input() selectedProduct: Product;

  @Output() submitted = new EventEmitter<Product>();

  faCheck = faCheck;
  faEdit = faEdit;

  productForm = this.fb.group({
    code: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    quantity: ['', Validators.required]

  });

  get code() { return this.productForm.controls.code; }
  get description() { return this.productForm.controls.description; }
  get price() { return this.productForm.controls.price; }
  get quantity() { return this.productForm.controls.quantity; }


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    if (this.selectedProduct != null) {
      this.productForm.setValue({
        code: this.selectedProduct.code,
        description: this.selectedProduct.description,
        price: this.selectedProduct.price,
        quantity: this.selectedProduct.quantity

      });
    }
  }

  submitForm() {
    const product: Product = {
      id: this.selectedProduct ? this.selectedProduct.id : null,
      code: this.productForm.controls.code.value,
      description: this.productForm.controls.description.value,
      price: this.productForm.controls.price.value,
      quantity: this.productForm.controls.quantity.value,
      user: this.selectedProduct ? this.selectedProduct.user : null
    };
    this.submitted.emit(product);
  }

}
