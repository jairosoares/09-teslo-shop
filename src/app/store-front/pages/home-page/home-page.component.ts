import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [ProductCardComponent],
})
export class HomePageComponent {

  productService = inject (ProductsService);

  productResource = rxResource({
    request: () => ({}),
    loader: ({request}) => {
      return this.productService.getProducts({

      });
    }

  })


}
