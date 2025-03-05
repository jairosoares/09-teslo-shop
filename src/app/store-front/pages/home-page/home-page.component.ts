import { Component } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [ProductCardComponent],
})
export class HomePageComponent {

}
