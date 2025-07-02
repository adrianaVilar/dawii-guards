/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModulesService } from './users-modules.service';

describe('UsersModulesService', () => {
  let service: UsersModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersModulesService],
    }).compile();

    service = module.get<UsersModulesService>(UsersModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
