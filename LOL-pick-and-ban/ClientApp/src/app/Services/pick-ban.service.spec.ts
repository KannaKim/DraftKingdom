import { TestBed } from '@angular/core/testing';

import { PickBanService } from './pick-ban.service';

describe('PickBanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickBanService = TestBed.get(PickBanService);
    expect(service).toBeTruthy();
  });
});
