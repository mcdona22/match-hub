import { Component, input } from '@angular/core';
import { ContactType, IContact } from '../../../teams/data/i-contact';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-contact-tile',
  imports: [MatIcon],
  templateUrl: './contact-tile.html',
  styleUrl: './contact-tile.scss',
})
export class ContactTile {
  contact = input.required<IContact>();

  contactGraphic(contactType: ContactType): string {
    switch (contactType) {
      case 'EMAIL':
        return 'mail';
      case 'PHONE':
        return 'phone';
      case 'URL':
        return 'public';
      default:
        return 'chat';
    }
  }
}
