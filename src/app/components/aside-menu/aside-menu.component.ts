import { Component, EventEmitter, Input, Output } from '@angular/core';
import { bootstrapBoxArrowRight, bootstrapCollectionPlay, bootstrapColumnsGap, bootstrapPeople, bootstrapSliders } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

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
  @Input() active: string = '';
  @Output() selectedSection = new EventEmitter<string>();

  select(section: string) {
    this.selectedSection.emit(section);
  }

}
