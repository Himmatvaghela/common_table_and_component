import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.generateBreadcrumbs();
      });
  }

  generateBreadcrumbs() {
    const pathSegments = this.router.url
      .split('/')
      .filter((segment) => segment);
    const breadcrumbs: Breadcrumb[] = [];
    let urlAccumulator = '';

    for (let segment of pathSegments) {
      urlAccumulator += `/${segment}`;
      const label = this.formatSegment(segment);
      breadcrumbs.push({ label, url: urlAccumulator });
    }

    this.breadcrumbs = breadcrumbs;
  }

  formatSegment(segment: string): string {
    // Convert kebab-case or snake_case to Title Case
    return segment
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
