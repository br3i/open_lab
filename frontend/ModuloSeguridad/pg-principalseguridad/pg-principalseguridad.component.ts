import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pg-principalseguridad',
  templateUrl: './pg-principalseguridad.component.html',
  styleUrls: ['./pg-principalseguridad.component.css']
})
export class PgPrincipalseguridadComponent {
  activeTabIndex: number = 0;
  constructor(private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.firstChild?.url.subscribe((urlSegment) => {
      const currentPath = urlSegment[0]?.path;
      const tabMapping = ['pg-adminusuario', 'pg-adminroles'];
      this.activeTabIndex = tabMapping.indexOf(currentPath);
    });
    if (!this.route.firstChild) {
      this.activeTabIndex = 0;
      this.router.navigate(['pg-adminusuario'], { relativeTo: this.route });
    }
  }
  
   onTabChange(event: any): void {
    const tabMapping = ['pg-adminusuario', 'pg-adminroles'];
    this.router.navigate([tabMapping[event.index]], { relativeTo: this.route });
  }
  
}
