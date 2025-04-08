import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { Product } from '@products/interfaces/product.interface';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabelComponent } from "../../../../shared/components/form-error-label/form-error-label.component";
import { ProductsService } from '@products/services/products.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
})
export class ProductDetailsComponent implements OnInit {

  product = input.required<Product>();

  fb = inject(FormBuilder);
  router = inject(Router);

  productService = inject(ProductsService);

  wasSaved =signal(false);

  tempImages = signal<string[]>([]);

  imageFileList: FileList | undefined = undefined;

  imagesToCarousel = computed(() => {
    const currentProductImages = [...this.product().images, ...this.tempImages()];
    return currentProductImages;
  })

  productForm = this.fb.group({
    title:        ['',  Validators.required],
    description:  ['',  Validators.required],
    slug:         ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price:        [0,  [Validators.required, Validators.min(0)]],
    stock:        [0,  [Validators.required, Validators.min(0)]],
    sizes:        [['']],
    images:       [[]],
    tags:         [''],
    gender:       ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]]

  })

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(formLike as any);
    this.productForm.patchValue( { tags: formLike.tags?.join(',')});
  }

  onSizeSelected(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];
    if (currentSizes.includes(size)) {
      currentSizes.splice( currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }
    this.productForm.patchValue( { sizes: currentSizes});
  }

  async onSubmit() {
    this.productForm.markAllAsTouched();
    if (!this.productForm.valid) return;

    const formValue = this.productForm.value;
    const productLike: Partial<Product> = {
      ...formValue as any,
      tags: formValue.tags?.toLowerCase().split(',').map( tag => tag.trim()) ?? []
    }

    /*
    if (this.product().id === 'new') {
      this.productService.createProduct(productLike)
      .subscribe(
        (product) => {
          console.log('Produto criado e direcionando pra edicao');
          this.router.navigate(['/admin/products/', product.id]);
        }
      );
    } else {
      this.productService.updateProduct(this.product().id, productLike)
        .subscribe(
          product => {
            console.log('Produto atualizado');
          }
        );
    }
    */

    // USANDO ASYNC COM firstValueFrom de RxJS, REMOVIDO subscribe
    if (this.product().id === 'new') {

      const product = await firstValueFrom(
        this.productService.createProduct(productLike, this.imageFileList)
      );
      this.router.navigate(['/admin/products/', product.id]);

    } else {

      await firstValueFrom(
        this.productService.updateProduct(this.product().id, productLike, this.imageFileList)
      );

    }

    this.wasSaved.set(true);
    setTimeout( () => {
      this.wasSaved.set(false);
    }, 3000)

  }

  onFilesChange(event: Event) {

    const fileList = (event.target as HTMLInputElement).files;
    this.imageFileList = fileList ?? undefined;

    this.tempImages.set([]);
    const imageUrls = Array.from(fileList ?? [])
      .map((file) => URL.createObjectURL(file)
    );
    this.tempImages.set(imageUrls);

  }

}
