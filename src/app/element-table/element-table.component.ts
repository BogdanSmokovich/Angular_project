import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementTable } from '../element-table';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-element-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
<div class="list">
  <div class="item">
    <a class="item-id" [routerLink]="['/details', elementTable.id]">{{ elementTable.id }}</a>
    <span class="item-name">{{ elementTable.nameIntervention }}</span>
  </div>
</div>
  `,
  styleUrl: './element-table.component.css'
})
export class ElementTableComponent {
  @Input() elementTable! : ElementTable;
}
