import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-card',
  imports: [CommonModule],
  templateUrl: './mini-card.component.html',
  styleUrl: './mini-card.component.css'
})
export class MiniCardComponent {
  @Input() iconType: string = '';
  @Input() title: string = '';
  @Input() value: string = '';

  @Input() userAndViews: boolean = false;
  @Input() userNameViews: string = '';
  @Input() totalViews: string = '';
  
  @Input() userAndRatings: boolean = false;
  @Input() userNameRatings: string = '';
  @Input() totalRatings: string = '';
  
  ngOnInit() {
    if (this.userAndViews) {
      this.userNameViews = this.fixUserName(this.userNameViews);
    }
    if (this.userAndRatings) {
      this.userNameRatings = this.fixUserName(this.userNameRatings);
    }
  }

  fixUserName(nameToBeFixed: string) {
    const splitedName = nameToBeFixed.split(' ');
    return splitedName[0].concat(' ', splitedName[1][0], '.');
  }
    
}


