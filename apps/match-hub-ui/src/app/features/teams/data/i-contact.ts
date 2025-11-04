export type ContactType = 'EMAIL' | 'PHONE' | 'URL' | 'TEXT';

export interface IContact {
  label: string;
  value: string;
  contactType: ContactType;
}
