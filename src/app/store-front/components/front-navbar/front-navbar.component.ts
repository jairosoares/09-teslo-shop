import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'front-navbar',
  templateUrl: './front-navbar.component.html',
  imports: [RouterLink, RouterLinkActive],
})
export class FrontNavbarComponent { }
