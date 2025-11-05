import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingClients = signal(0);
  isLoading = computed(() => this.loadingClients() > 0);

  // incrementing and decrementing means we can have multiple
  // clients use tbis rather than last in wins
  loadingStart(): void {
    this.loadingClients.set(this.loadingClients() + 1);
  }

  loadingStop(): void {
    this.loadingClients.set(this.loadingClients() - 1);
  }
}
