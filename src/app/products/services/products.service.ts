import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interfaces/user.interfaces';
import { Gender, Product, ProductsResponse } from '@products/interfaces/product.interface';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const productEmpty: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User
}

@Injectable({providedIn: 'root'})
export class ProductsService {

  private http = inject(HttpClient);

  private productsCache = new Map<string, ProductsResponse>();

  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {

    const { limit = 9, offset = 0, gender = ''} = options;

    //uma chave, um indentificador unico
    const key = `${limit}-${offset}-${gender}`;
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }


    return this.http.get<ProductsResponse>(
      `${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender
        }
      })
      .pipe(
        tap( (resp) => this.productsCache.set(key, resp))
      )
  }

  getProductBySlug(idSlug: string): Observable<Product> {

    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.http.get<Product>(
      `${baseUrl}/products/${idSlug}`).pipe(
        tap( (product) => this.productCache.set(idSlug, product))
      );
  }

  getProductById(id: string): Observable<Product> {

    if (id === 'new') {
      return of(productEmpty);
    }

    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }

    return this.http.get<Product>(
      `${baseUrl}/products/${id}`).pipe(
        tap( (product) => this.productCache.set(id, product))
      );
  }


  updateProduct(
    id: string,
    productLike: Partial<Product>,
    imageFileList?: FileList
  ): Observable<Product> {

    const currentImages = productLike.images ?? [];
    console.log({currentImages});

    /*
    primeiro executa o map, o resultado,
    switchMap pega no novo objeto gerado updatedProduct
    depois atualiza o catch com o tap
    */
    return this.uploadImages(imageFileList)
      .pipe(
        map( imageNames => ({
          ...productLike,
          images: [...currentImages, ...imageNames]
        })),
        switchMap( updatedProduct =>
          this.http.patch<Product>(
            `${baseUrl}/products/${id}`, updatedProduct)
        ),
        tap( (product) => this.updateProductCache(product))
    );

      /*
    return this.http.patch<Product>(
      `${baseUrl}/products/${id}`, productLike).pipe(
        tap( (product) => this.updateProductCache(product))
      );
      */

  }

  createProduct(
    productLike: Partial<Product>,
    imageFileList?: FileList
  ): Observable<Product> {

    const currentImages = productLike.images ?? [];
    console.log({currentImages});

    /*
    primeiro executa o map, o resultado,
    switchMap pega no novo objeto gerado updatedProduct
    depois atualiza o catch com o tap
    */
    return this.uploadImages(imageFileList)
      .pipe(
        map( imageNames => ({
          ...productLike,
          images: [...currentImages, ...imageNames]
        })),
        switchMap( updatedProduct =>
          this.http.post<Product>(
            `${baseUrl}/products`, updatedProduct)
        ),
        tap( (product) => this.updateProductCache(product))
    );

    /*
    return this.http.post<Product>(
      `${baseUrl}/products`, productLike).pipe(
        tap( (product) => this.updateProductCache(product))
      );
    */

  }

  updateProductCache(product: Product) {

    const productId = product.id;

    this.productCache.set(productId, product);

    this.productsCache.forEach( (productResponse) => {
      productResponse.products = productResponse.products.map(
        (currentProduct) => currentProduct.id === productId ? product : currentProduct
      )
    })

  }

  // Envia todas as imagens
  uploadImages(images?: FileList): Observable<string[]> {

    if (!images) return of([]);

    const uploadObservables = Array.from(images)
      .map( imageFile => this.uploadImage(imageFile));

    // Isso espera todos os Observable terminar
    return forkJoin(uploadObservables).pipe(
      tap( imageNames => console.log({imageNames}))
    )

  }

  uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile);
    return this.http.post<{fileName: string}>(`${baseUrl}/files/product`, formData)
      .pipe(
        map(resp => resp.fileName),
        tap(fileName => console.log('fileName:', fileName))
      )
  }

}
