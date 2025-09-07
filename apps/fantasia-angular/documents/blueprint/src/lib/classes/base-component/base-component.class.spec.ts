import { BaseComponent } from './base-component.class';

describe('BaseComponent', () => {
  let baseComponent: BaseComponent;

  beforeEach(() => {
    baseComponent = new BaseComponent();
  });

  it('it should be created', () => {
    expect(baseComponent).toBeTruthy();
  });

  it('it should have destroy$ subject unsubscribed', () => {
    baseComponent.ngOnDestroy();

    expect(baseComponent.destroy$.isStopped).toBe(true);
  });

  it('it should emit true from destroy$ Subject', () => {
    baseComponent.destroy$.subscribe((value: boolean) => {
      expect(value).toBe(true);
    });

    baseComponent.ngOnDestroy();
  });
});
