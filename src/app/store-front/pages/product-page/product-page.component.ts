import { ProductCarouselComponent } from './../../../products/components/product-carousel/product-carousel.component';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  imports: [ProductCarouselComponent],
})
export class ProductPageComponent {

  activateRouter = inject(ActivatedRoute);

  productIdSlug: string = this.activateRouter.snapshot.params['idSlug'];

  productService = inject(ProductsService);

  productResource = rxResource({
    request: () => ({idSlug: this.productIdSlug}),
    loader: ({request}) => {
      return this.productService.getProductBySlug(request.idSlug);
    }
  });

}
