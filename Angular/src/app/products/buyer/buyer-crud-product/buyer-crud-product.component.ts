import { Component, OnInit, ViewChild } from '@angular/core';
import { faDoorClosed, faTrash, faTrashAlt, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Product, ProductControllerService } from 'src/swagger-generated';
import { NgbModalOptions, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from '../../confirmation-modals/confirm-delete/confirm-delete.component';
import { BuyerProductFormComponent } from '../buyer-product-form/buyer-product-form.component';
import { TransactionControllerService } from 'src/swagger-generated/api/transactionController.service';

@Component({
  selector: 'app-buyer-crud-product',
  templateUrl: './buyer-crud-product.component.html',
  styleUrls: ['./buyer-crud-product.component.css']
})
export class BuyerCrudProductComponent implements OnInit {

  faDoorClosed = faDoorClosed;
  faTrash = faTrash;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faEdit = faEdit;

  @ViewChild(BuyerProductFormComponent, { static: false })
  productFormComponent: BuyerProductFormComponent;

  selectedProduct: Product;

  actionCompletedSuccessfully = false;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };

  constructor(
    public activeModal: NgbActiveModal,
    private productControllerService: ProductControllerService,
    private transactionControllerService: TransactionControllerService,
    private modalService: NgbModal) { }

  ngOnInit() { }

  onSubmit(product: Product) {
    if (this.selectedProduct == null) {
      this.createTransaction(product);
    } else {
      this.createTransaction(product);
    }
  }

  private createTransaction(product: Product) {
    this.transactionControllerService.createTransactionUsingPOST(product)
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
