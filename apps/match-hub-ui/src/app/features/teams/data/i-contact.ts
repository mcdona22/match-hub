export type ContactType = 'EMAIL' | 'PHONE' | 'URL' | 'TEXT';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Simple phone number regex: accepts digits, spaces, hyphens, and parentheses
const PHONE_REGEX = /^[\d\s\-.()]{7,}$/;
// Simple URL regex: checks for protocol (http/s) or non-space characters followed by dot
const URL_REGEX = /^(https?:\/\/[^\s]+|\S+\.[a-zA-Z]{2,})$/i;

export function determineContactType(value: string): ContactType {
  if (EMAIL_REGEX.test(value)) {
    return 'EMAIL';
  }
  if (PHONE_REGEX.test(value.replace(/[()\-\s]/g, ''))) {
    return 'PHONE';
  }
  if (URL_REGEX.test(value)) {
    return 'URL';
  }
  return 'TEXT';
}

export interface IContact {
  label: string;
  value: string;
  contactType: ContactType;
}
