import { AfterViewInit, Component, ElementRef, input, OnChanges, SimpleChanges, viewChild } from '@angular/core';

import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-carousel',
  templateUrl: './product-carousel.component.html',
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
    }
  `,
  imports: [ProductImagePipe],
})
export class ProductCarouselComponent implements AfterViewInit, OnChanges {

  images = input.required<string []>();

  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].firstChange) {
      return;
    }
    this.swiperInit() ;
  }

  ngAfterViewInit(): void {
    this.swiperInit();
  }

  // tudo isso pq esse componente nao tem nativo Angular, somente typescript
  swiperInit() {
    const element = this.swiperDiv().nativeElement;

    if (!element) return;

    const swiper = new Swiper(element, {
      direction: 'horizontal',
      loop: true,

      modules:[
        Navigation, Pagination
      ],

      pagination: {
        el: '.swiper-pagination',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });

  }

}
