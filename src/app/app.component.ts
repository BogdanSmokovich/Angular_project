import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SearchComponent,
    RouterModule,
  ],
  template: `
    <main>
    <a [routerLink]="['/']">
      <header class="brand-name">
        <img class="brand-logo" src="/assets/healthy.svg" alt="healthy" aria-hidden="true">
      </header>
</a>
      <section class="content">
      <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}
