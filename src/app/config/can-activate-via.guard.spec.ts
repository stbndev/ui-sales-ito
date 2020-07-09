import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateViaGuard } from './can-activate-via.guard';

describe('CanActivateViaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateViaGuard]
    });
  });

  it('should ...', inject([CanActivateViaGuard], (guard: CanActivateViaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
