import { IContact } from './i-contact';

export interface ITeam {
  id?: string;
  name: string;
  postCode: string;
  league?: string;
  contacts: IContact[];
}
