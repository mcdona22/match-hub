import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSignal: WritableSignal<boolean> = signal(false);
  readonly isLoading: Signal<boolean> = this.isLoadingSignal.asReadonly();

  loadingStart(): void {
    this.setLoading(true);
  }

  loadingStop(): void {
    this.setLoading(false);
  }

  private setLoading(flag: boolean): void {
    console.log(`Setting loading to ${flag}`);
    this.isLoadingSignal.set(flag);
  }
}
