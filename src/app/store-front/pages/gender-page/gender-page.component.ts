import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { TitleCasePipe } from '@angular/common';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  templateUrl: './gender-page.component.html',
  imports: [ProductCardComponent, TitleCasePipe, PaginationComponent],
})
export class GenderPageComponent {

  route = inject(ActivatedRoute);

  paginationService = inject(PaginationService);

  // Magico isso (reativo): a mudanca na rota, automaticamente reflete em 'gender'
  gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  )

  productService = inject (ProductsService);

  productResource = rxResource({
    request: () => ({
      gender: this.gender(),
      page: this.paginationService.currentePage()-1
    }),
    loader: ({request}) => {
      return this.productService.getProducts({
        gender: request.gender,
        offset: request.page * 9
      });
    }

  })

}
