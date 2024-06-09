import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InfoService } from '../info.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <section class="listing-apply">
      <h2 class="section-heading">Вкажіть свої дані, і наш менеджер <br> зв'яжеться з вами за лічені хвилини</h2>
      <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
        <label for="first-name">Ім'я</label>
        <input id="first-name" type="text" formControlName="firstName">

        <label for="last-name">Прізвище</label>
        <input id="last-name" type="text" formControlName="lastName">

        <label for="phonenumber">Номер телефону</label>
        <input id="phonenumber" type="text" formControlName="phonenumber">
        <button type="submit" class="primary">Надіслати</button>
      </form>
    </section>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  elementTableId = -1;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phonenumber: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private infoService: InfoService
  ) {
    this.elementTableId = Number(this.route.snapshot.params['id']);
  }

  submitApplication() {
    const firstName = this.applyForm.value.firstName ?? '';
    const lastName = this.applyForm.value.lastName ?? '';
    const phonenumber = this.applyForm.value.phonenumber ?? '';

    const encryptedFirstName = toBase64(firstName);
    const encryptedLastName = toBase64(lastName);
    const encryptedPhoneNumber = toBase64(phonenumber);

    console.log(`Зашифровані дані: firstName: ${encryptedFirstName}, lastName: ${encryptedLastName}, phonenumber: ${encryptedPhoneNumber}.`);

    this.infoService.submitApplication(firstName, lastName, phonenumber);
  }
}

function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function fromBase64(base64: string): string {
  return decodeURIComponent(escape(atob(base64)));
}
