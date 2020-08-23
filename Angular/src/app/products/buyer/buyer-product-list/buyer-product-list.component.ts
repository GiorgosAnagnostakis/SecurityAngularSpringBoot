import { Component, OnInit, ViewChild } from '@angular/core';
import { faTrash, faPlus, faHospital, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Product, ProductControllerService } from 'src/swagger-generated';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable } from 'rxjs';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from '../../confirmation-modals/confirm-delete/confirm-delete.component';
import { ProductImpl } from 'src/app/models/ProductImpl';
import { BuyerCrudProductComponent } from '../buyer-crud-product/buyer-crud-product.component';
import { TransactionControllerService } from 'src/swagger-generated/api/transactionController.service';

@Component({
  selector: 'app-buyer-product-list',
  templateUrl: './buyer-product-list.component.html',
  styleUrls: ['./buyer-product-list.component.css']
})
export class BuyerProductListComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faHospital = faHospital;
  faTrashAlt = faTrashAlt;

  selectedProduct: Product;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  @ViewChild(DataTableDirective, { static: false }) dtElementBought: DataTableDirective;

  boughtProducts: Product[];

  dtOptions: any = {};
  products: Product[];
  dtTrigger: Subject<Product> = new Subject();
  dtTriggerBought: Subject<Product> = new Subject();
  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };

  constructor(
    // private utilsService: UtilsService,
    private productControllerService: ProductControllerService,
    private transactionControllerService: TransactionControllerService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      // dom: myGlobals.DATATABLE_DOM_TEMPLATE,
      // buttons: myGlobals.DATATABLE_BUTTONS,
      // columnDefs: [
      //   { orderable: false, targets: this.utilsService.getDeleteColumnNumber() }
      // ]
    };
  }

  ngAfterViewInit() {
    this.generateDataTable();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtTriggerBought.unsubscribe();
  }

  openCreateProduct() {
    const modalRef = this.modalService.open(BuyerCrudProductComponent, this.ngbModalOptions);
    modalRef.result.then(
      successfulCreate => {
        if (successfulCreate) {
          this.refreshDataTable();
        }
      }
    );
  }

  private generateDataTable() {
    this.productControllerService.getAllProductsUsingGET()
      .subscribe(
        data => {
          this.products = data;
          this.dtTrigger.next();
          console.log(data)
        }
      );
      this.transactionControllerService.getAllTransactionsByBuyerUsingGET()
      .subscribe(
        data => {
          console.log(data)
          this.boughtProducts = data;
          this.dtTriggerBought.next();
          console.log(data)
        }
      );
  }

  private deleteProduct(id: number) {
    this.selectProduct(id).subscribe(product => {
      this.selectedProduct = product;
      const modalRef = this.modalService.open(ConfirmDeleteComponent, this.ngbModalOptions);
      modalRef.componentInstance.entityToBeDeleted = new ProductImpl(this.selectedProduct);
      modalRef.result.then(deletionConfirmed => {
        if (deletionConfirmed) {
          this.productControllerService.deleteProductUsingDELETE(id)
            .subscribe(
              () => {
                this.destroyDataTable();
                this.generateDataTable();
              });
        }
      });
    });

  }

  private selectProduct(id: number): Observable<any> {
    return this.productControllerService.getProductByIdUsingGET(id);
  }

  openUpdateModal(id: number) {
    this.selectProduct(id).subscribe(product => {
      this.selectedProduct = product;
      const modalRef = this.modalService.open(BuyerCrudProductComponent, this.ngbModalOptions);
      modalRef.componentInstance.selectedProduct = this.selectedProduct;
      modalRef.result.then(
        updateOccurred => {
          if (updateOccurred) {
            this.refreshDataTable();
          }
        }
      );
    });
  }

  private destroyDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  private refreshDataTable() {
    this.destroyDataTable();
    this.generateDataTable();
  }

}
