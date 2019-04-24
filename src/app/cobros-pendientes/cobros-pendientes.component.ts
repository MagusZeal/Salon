import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, RouterLinkActive, Routes } from '@angular/router';


@Component({
  selector: 'app-cobros-pendientes',
  templateUrl: './cobros-pendientes.component.html',
  styleUrls: ['./cobros-pendientes.component.scss'] 
})
export class CobrosPendientesComponent implements OnInit {
 
  isViewInitialized = false;
  
  navLinks = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef) { }


  
  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.changeDetector.detectChanges();
  }

  buildNavItems(routes: Routes) {
    return (routes)
      .filter(route => route.data)
      .map(({ path = '', data }) => ({
        path: path,
        label: data.label,
        icon: data.icon
      }));
  }

  isLinkActive(rla: RouterLinkActive): boolean {
    const routerLink = rla.linksWithHrefs.first;
    
    return this.router.isActive(routerLink.urlTree, false);
  }
  
  async ngOnInit() {
    this.navLinks = (
      this.route.routeConfig && this.route.routeConfig.children ?
      this.buildNavItems(this.route.routeConfig.children) :
      []
    );
    history.pushState(null, null, document.URL);
   

  }
 

}
