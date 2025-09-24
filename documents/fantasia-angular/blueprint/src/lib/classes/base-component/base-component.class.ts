import { OnDestroy, HostListener, Directive } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Handles component destroy to clear memory leaks
 */
@Directive()
export class BaseComponent implements OnDestroy {

  public destroy$: Subject<boolean> = new Subject<boolean>();

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
