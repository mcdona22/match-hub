import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postcodeFormat',
  standalone: true, // Use if you are using modern Angular/standalone components
})
export class PostcodeFormatPipe implements PipeTransform {
  /**
   * Transforms a cleaned (space-stripped, lowercase) postcode into the
   * correctly formatted (spaced, uppercase) version.
   * @param value The cleaned postcode string (e.g., 'hd22dd').
   * @returns The formatted postcode string (e.g., 'HD2 2DD').
   */
  transform(value: string | null | undefined): string | null {
    if (!value) {
      return null;
    }

    // 1. Ensure the value is a string and cleaned
    const cleanedPostcode = value.toString().toLowerCase().replace(/\s/g, '');

    // 2. Apply the parsing strategy: Inward Code is always the last 3 characters
    const len = cleanedPostcode.length;

    // Safety check for minimum length (a valid postcode must be 5-7 chars)
    if (len < 5 || len > 7) {
      return value.toUpperCase(); // Fallback: just uppercase the invalid input
    }

    const outwardCode = cleanedPostcode.substring(0, len - 3);
    const inwardCode = cleanedPostcode.substring(len - 3);

    // 3. Reinsert the space and capitalize
    return `${outwardCode} ${inwardCode}`.toUpperCase();
  }
}
