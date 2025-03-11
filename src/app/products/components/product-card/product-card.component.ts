import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
})
export class ProductCardComponent {

  product = input.required<Product>();

  /*
  // foi movida para uma logica mais apropriada com uso dos Pipes
  imageUrl = computed(() => {
    return `http://localhost:3000/api/files/product/${this.product().images[0]}`;
  });
  */


}
