import { Component, inject, Signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapBoxArrowRight, bootstrapCollectionPlay, bootstrapColumnsGap, bootstrapPeople, bootstrapSliders } from '@ng-icons/bootstrap-icons';

import { AdminComponent } from '../../pages/admin/admin.component';

@Component({
  selector: 'app-aside-menu',
  imports: [
    NgIcon,
  ],
  viewProviders: [provideIcons({ bootstrapCollectionPlay, bootstrapPeople, bootstrapColumnsGap, bootstrapSliders, bootstrapBoxArrowRight })],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.css'
})
export class AsideMenuComponent {
  activeSection: Signal<string> = inject(AdminComponent).activeSection;

  onSectionSelected = inject(AdminComponent).onSectionSelected;
  // @Input() active: string = '';
  // @Output() selectedSection = new EventEmitter<string>();

  // select(section: string) {
  //   this.selectedSection.emit(section);
  // }
}
