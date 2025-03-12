import { Pagination } from 'swiper/modules';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PaginationService {

  private activatedRouter = inject(ActivatedRoute);

  currentePage = toSignal(
    this.activatedRouter.queryParamMap.pipe(
      map( params => (params.get('page') ? +params.get('page')! : 1) ),
      map( page => ( isNaN(page) ? 1 : page ) )
    ),
    {
      initialValue: 1,
    }
  )

}