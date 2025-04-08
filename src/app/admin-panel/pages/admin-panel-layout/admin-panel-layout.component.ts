import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { SideMenuComponent } from "../../../shared/sidemenu/side-menu/side-menu.component";

@Component({
  selector: 'app-admin-panel-layout',
  templateUrl: './admin-panel-layout.component.html',
  imports: [RouterOutlet, RouterLink, SideMenuComponent, SideMenuComponent],
})
export class AdminPanelLayoutComponent {

  authService = inject(AuthService)

  user = computed( () => this.authService.user());

}
