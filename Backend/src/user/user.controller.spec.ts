import { Test, TestingModule } from '@nestjs/testing';
import { UserController} from './user.controller';
import { UserService } from './user.service';
describe('UserController', () => {
  let controller: UserController;

  const mockUserService={
    registerUser:jest.fn().mockImplementationOnce((name:string,email:string,password:string)=>Promise.resolve('123'))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[{
        provide:UserService,
        useValue:mockUserService
      }]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user',async()=>{
    expect(await controller.registerUser('Sherin','sherin.reda15@gmail.com','1234')).toEqual({
      id:expect.any(String)
    })
  });
});
