import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [ProductCardComponent, PaginationComponent],
})
export class HomePageComponent {

  productService = inject (ProductsService);

  paginationService = inject(PaginationService);

  /*
  activatedRouter = inject(ActivatedRoute);

  currentePage = toSignal(
    this.activatedRouter.queryParamMap.pipe(
      map( params => (params.get('page') ? +params.get('page')! : 1) ),
      map( page => ( isNaN(page) ? 1 : page ) )
    ),
    {
      initialValue: 1,
    }
  )
  */

  productResource = rxResource({
    request: () => ({ page: this.paginationService.currentePage()-1}),
    loader: ({request}) => {
      return this.productService.getProducts({
        offset: request.page * 9
      });
    }

  })


}
