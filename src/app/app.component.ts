import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bbsr-bmc';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.handleNavigation();
      }
    });
  }

  handleNavigation() {
    setTimeout(() => {
      if (screen.width < 1200) {
        const sidebarParentElement = document.querySelector('.sidebar-parent') as HTMLDivElement;
        sidebarParentElement && sidebarParentElement.classList.add('hide-on-mobile');
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        const targetComponent = this.getTargetComponent(event.urlAfterRedirects);
        if (targetComponent) {
          const miniSidebarElement = document.querySelector('#mini-sidebar') as HTMLDivElement;
          if (miniSidebarElement.classList.contains('toggled')) {
            setTimeout(() => {
              const pageContentElement = document.querySelector('.page-content') as HTMLDivElement;
              pageContentElement && pageContentElement.classList.toggle('toggled');
              const sidebarParentElement = document.querySelector('.sidebar-parent') as HTMLDivElement;
              sidebarParentElement && sidebarParentElement.classList.toggle('d-none');
              const appContentElement = document.querySelector('.app-content') as HTMLDivElement;
              appContentElement && appContentElement.classList.toggle('col-xl-9');
              appContentElement && appContentElement.classList.toggle('col-12');
            }, 10);
          }
        }
      }
    });
  }

  private getTargetComponent(url: string): any {
    // Extract the component name from the URL or perform any other logic to identify the target component
    // For example, if your URLs follow the pattern "/component-name", you can extract the component name like this:
    const parts = url.split('/');
    if (parts.length >= 2) {
      return parts[1];
    }
    return null;
  }
}
