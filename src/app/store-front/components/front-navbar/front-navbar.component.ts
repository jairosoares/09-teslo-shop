import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'front-navbar',
  templateUrl: './front-navbar.component.html',
  imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class FrontNavbarComponent {

  authService = inject(AuthService);


}
