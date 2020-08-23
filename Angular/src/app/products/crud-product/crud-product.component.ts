import { Component, OnInit, ViewChild } from '@angular/core';
import { faDoorClosed, faTrash, faTrashAlt, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product, ProductControllerService } from 'src/swagger-generated';
import { NgbModalOptions, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from '../confirmation-modals/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-crud-product',
  templateUrl: './crud-product.component.html',
  styleUrls: ['./crud-product.component.css']
})
export class CrudProductComponent implements OnInit {

  faDoorClosed = faDoorClosed;
  faTrash = faTrash;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faEdit = faEdit;

  @ViewChild(ProductFormComponent, { static: false })
  productFormComponent: ProductFormComponent;

  selectedProduct: Product;

  actionCompletedSuccessfully = false;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };

  constructor(
    public activeModal: NgbActiveModal,
    private productControllerService: ProductControllerService,
    private modalService: NgbModal) { }

  ngOnInit() { }

  onSubmit(product: Product) {
    if (this.selectedProduct == null) {
      this.createProduct(product);
    } else {
      this.updateProduct(product);
    }
  }

  private createProduct(product: Product) {
    this.productControllerService.createProductUsingPOST(product)
      .subscribe(
        () => {
          this.actionCompletedSuccessfully = true;
          this.productFormComponent.productForm.reset();
        });
  }

  private updateProduct(product: Product) {
    this.productControllerService.updateProductUsingPUT(product)
      .subscribe(
        () => {
          this.actionCompletedSuccessfully = true;
        });
  }

  private deleteProduct() {
    const modalRef = this.modalService.open(ConfirmDeleteComponent, this.ngbModalOptions);
    modalRef.componentInstance.callerType = 'Product';
    modalRef.result.then(deletionConfirmed => {
      if (deletionConfirmed) {
        this.productControllerService.deleteProductUsingDELETE(this.selectedProduct.id)
          .subscribe(
            () => {
              this.activeModal.close(true);
            },
            error => console.log(error)
          );
      }
    });
  }

}
