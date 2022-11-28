import { TestBed } from '@angular/core/testing';

import { PermissionsRolesService } from './permissions-roles.service';

describe('PermissionsRolesService', () => {
  let service: PermissionsRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionsRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
