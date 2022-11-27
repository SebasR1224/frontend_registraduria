import { TestBed } from '@angular/core/testing';

import { PoliticalPartiesService } from './political-parties.service';

describe('PoliticalPartiesService', () => {
  let service: PoliticalPartiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliticalPartiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
