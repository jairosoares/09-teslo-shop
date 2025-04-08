import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTableComponent } from '@products/components/product-table/product-table.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-admin-list-page',
  templateUrl: './product-admin-list-page.component.html',
  imports: [ProductTableComponent, PaginationComponent, RouterLink],
})
export class ProductAdminListPageComponent {

  productService = inject (ProductsService);

  paginationService = inject(PaginationService);

  productsPerPage = signal(10);

  productResource = rxResource({
    request: () => ({
      page: this.paginationService.currentePage()-1,
      limit: this.productsPerPage()
    }),
    loader: ({request}) => {
      return this.productService.getProducts({
        offset: request.page * 9,
        limit: request.limit
      });
    }
  })

}
