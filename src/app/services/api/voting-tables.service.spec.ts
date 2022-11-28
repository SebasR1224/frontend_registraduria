import { TestBed } from '@angular/core/testing';

import { VotingTablesService } from './voting-tables.service';

describe('VotingTablesService', () => {
  let service: VotingTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotingTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
