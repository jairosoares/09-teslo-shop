import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {

  transform(value: null | string | string[]): string {

    if (value === null) {
      return "./assets/images/no-image.jpg";
    }

    // para as imagens que foram adicionadas via file input select
    if ( typeof value === 'string' && value.startsWith('blob:')) {
      return value;
    }

    if ( typeof value === 'string') {
      return `${baseUrl}/files/product/${value}`;
    }

    const image = value.at(0);

    if (!image) {
      return "./assets/images/no-image.jpg";
    }

    return `${baseUrl}/files/product/${image}`;

  }

}
