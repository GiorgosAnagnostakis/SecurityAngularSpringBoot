export * from './authenticationController.service';
import { AuthenticationControllerService } from './authenticationController.service';
export * from './productController.service';
import { ProductControllerService } from './productController.service';
export * from './transactionController.service';
import { TransactionControllerService } from './transactionController.service';
export const APIS = [AuthenticationControllerService, ProductControllerService, TransactionControllerService];
