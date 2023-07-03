import { Component } from '@angular/core';

@Component({
  selector: 'app-mini-sidebar',
  templateUrl: './mini-sidebar.component.html',
  styleUrls: ['./mini-sidebar.component.css']
})
export class MiniSidebarComponent {

  wcMenus: any = [];

  ngOnInit() {
    this.getWcMenuItems();
  }

  getWcMenuItems() {
    const data = JSON.parse(localStorage.getItem('logindetails') || '{}');
    this.wcMenus = data.menuitem || [];
    console.log('mini-sidebar', this.wcMenus)
  }

}
