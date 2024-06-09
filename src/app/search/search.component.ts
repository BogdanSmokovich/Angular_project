import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementTableComponent } from '../element-table/element-table.component';
import { ElementTable } from '../element-table';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ElementTableComponent
  ],
  template: `
  <section>
    <div class="search-container">
      <input type="text" placeholder="Фільтрувати за кодом або назвою" (input)="filterResults($event)">
    </div>
  </section>
  <section class="results">
    <app-element-table 
      *ngFor="let elementTable of filteredTableList"
      [elementTable]="elementTable">
    </app-element-table>
  </section>
  `,
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  elementTableList: ElementTable[] = [];
  filteredTableList: ElementTable[] = [];
  private idIndex: { [key: string]: ElementTable[] } = {};
  private nameInterventionIndex: { [key: string]: ElementTable[] } = {};
  infoService: InfoService = inject(InfoService);

  constructor() {
    this.infoService.getAllElementTable().then((elementTableList: ElementTable[]) => {
      this.elementTableList = elementTableList;
      this.filteredTableList = elementTableList;
      this.buildIndex();
    });
  }

  buildIndex() {
    for (const element of this.elementTableList) {
      const idTokens = this.tokenize(element.id);
      const nameInterventionTokens = this.tokenize(element.nameIntervention);

      for (const token of idTokens) {
        if (!this.idIndex[token]) {
          this.idIndex[token] = [];
        }
        this.idIndex[token].push(element);
      }

      for (const token of nameInterventionTokens) {
        if (!this.nameInterventionIndex[token]) {
          this.nameInterventionIndex[token] = [];
        }
        this.nameInterventionIndex[token].push(element);
      }
    }
  }

  tokenize(text: string): string[] {
    return text.toLowerCase().split(' ');
  }

  filterResults(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const text = inputElement.value;

    if (text.length < 3) {
      this.filteredTableList = this.elementTableList;
      return;
    }

    const lowerText = text.toLowerCase();
    const idResults = this.searchIndex(lowerText, this.idIndex);
    const nameInterventionResults = this.searchIndex(lowerText, this.nameInterventionIndex);

    // Об'єднуємо результати та видаляємо дублікати
    const combinedResults = [...idResults, ...nameInterventionResults];
    const uniqueResults = new Set(combinedResults);
    this.filteredTableList = Array.from(uniqueResults);
    console.log(this.filteredTableList);
  }

  searchIndex(text: string, index: { [key: string]: ElementTable[] }): ElementTable[] {
    const results: ElementTable[] = [];
    for (const key in index) {
      if (key.includes(text)) {
        results.push(...index[key]);
      }
    }
    return results;
  }
}