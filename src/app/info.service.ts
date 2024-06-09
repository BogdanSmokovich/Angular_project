import { Injectable } from '@angular/core';
import { ElementTable } from './element-table';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  url = 'http://localhost:3000/elements';

  async getAllElementTable(): Promise<ElementTable[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getElementTableById(id: string): Promise<ElementTable | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, phonenumber: string) {
    const encryptedFirstName = toBase64(firstName);
    const encryptedLastName = toBase64(lastName);
    const encryptedPhoneNumber = toBase64(phonenumber);

    console.log(`People application received: firstName: ${firstName}, lastName: ${lastName}, phonenumber: ${phonenumber}.`);
  }
}

function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function fromBase64(base64: string): string {
  return decodeURIComponent(escape(atob(base64)));
}
