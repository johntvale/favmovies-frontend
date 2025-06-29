import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapBoxArrowRight, bootstrapCollectionPlay, bootstrapColumnsGap, bootstrapPeople, bootstrapSliders } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-aside-menu',
  imports: [
    NgIcon,
  ],
  viewProviders: [provideIcons({ bootstrapCollectionPlay, bootstrapPeople, bootstrapColumnsGap, bootstrapSliders, bootstrapBoxArrowRight })],
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.css']
})
export class AsideMenuComponent {
  activeSection: string = '';

  constructor(private router: Router) {}

  activateSection(section: string) {
    this.activeSection = section;
    this.router.navigateByUrl(`admin/${section}`);
  }
}
