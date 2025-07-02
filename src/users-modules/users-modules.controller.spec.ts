/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModulesController } from './users-modules.controller';
import { UsersModulesService } from './users-modules.service';

describe('UsersModulesController', () => {
  let controller: UsersModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersModulesController],
      providers: [UsersModulesService],
    }).compile();

    controller = module.get<UsersModulesController>(UsersModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
