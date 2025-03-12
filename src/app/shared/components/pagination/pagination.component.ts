import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  imports: [RouterLink],
})
export class PaginationComponent {

  pages = input(0);

  currentPage = input<number>(1);

  // use linkedSignal quando um signal inicializa com algo que pode mudar, no caso o input que pode mudar
  activePage = linkedSignal(this.currentPage); //isso, pq precisou usar o .set pra definir o valor

  getPageList = computed(() => {
    return Array.from( {length: this.pages()}, (_, i) => i +1 )
  })

}
