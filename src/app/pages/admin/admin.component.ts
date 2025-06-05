import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapCollectionPlay, bootstrapPeople, bootstrapColumnsGap, bootstrapSliders, bootstrapBoxArrowRight } from '@ng-icons/bootstrap-icons';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { AsideMenuComponent } from "../../components/aside-menu/aside-menu.component";

@Component({
  selector: 'app-admin',
  imports: [
    FooterComponent,
    HeaderComponent,
    AsideMenuComponent
],
  viewProviders: [provideIcons({ bootstrapCollectionPlay, bootstrapPeople, bootstrapColumnsGap, bootstrapSliders, bootstrapBoxArrowRight })],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
