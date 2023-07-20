import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mini-sidebar',
  templateUrl: './mini-sidebar.component.html',
  styleUrls: ['./mini-sidebar.component.css']
})
export class MiniSidebarComponent {

  wcMenus: any = [];

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.getWcMenuItems();
  }

  getWcMenuItems() {
    const data = JSON.parse(localStorage.getItem('logindetails') || '{}');
    this.wcMenus = data.menuitem || [];
    console.log('mini-sidebar', this.wcMenus)
  }

  doLogout() {
    this.toggleSidebar();
    setTimeout(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    }, 200);
  }

  toggleSidebar() {
    const sidebarToggleElement = document.querySelector('.navbar-brand') as HTMLElement;
    sidebarToggleElement?.click();
  }

  navigatePage() {}

}
