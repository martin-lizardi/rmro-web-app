import { TestBed } from '@angular/core/testing';

import { ControlRobotService } from './control-robot.service';

describe('ControlRobotService', () => {
  let service: ControlRobotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlRobotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
