import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'product-table',
  templateUrl: './product-table.component.html',
  imports: [ProductImagePipe, RouterLink, CurrencyPipe],
})
export class ProductTableComponent {

  products = input.required<Product[]>();

}
