import { ActivatedRoute, Router } from '@angular/router';
import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductsService } from '@products/services/products.service';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
  selector: 'app-product-admin-page',
  templateUrl: './product-admin-page.component.html',
  imports: [ProductDetailsComponent],
})
export class ProductAdminPageComponent {

  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  productService = inject(ProductsService);

  productId = toSignal(
    this.activatedRoute.params.pipe(
      map( (params) => params['id'])
    )
  )

  productResource = rxResource({
    request: () => ({ id: this.productId()}),
    loader: ( {request}) => {
      return this.productService.getProductById(request.id);
    }
  })

  redirectEffet = effect( () => {
    if (this.productResource.error()) {
      this.router.navigate(['/admin/products']);
    }
  })

}
