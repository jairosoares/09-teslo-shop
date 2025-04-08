import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import authRoutes from '@auth/auth.routes';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  imports: [RouterLink, RouterLinkActive],
})
export class SideMenuComponent {

  // after all complete classes, this is a new style desigh menu dinamic
  public menuItems = authRoutes
    .map( route => route.children ?? [])
    .flat()
    .filter( route => route && route.path)
    .filter( route => !route.path?.includes(":"))
    .filter( route => !route.path?.includes("**"));


}
