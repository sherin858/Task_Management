import { Test, TestingModule } from '@nestjs/testing';
import { UserController} from './user.controller';
import { UserService } from './user.service';
describe('UserController', () => {
  let controller: UserController;
  const mockUserService={
    registerUser:jest.fn().mockImplementation((name:string,email:string,password:string)=>Promise.resolve('123')),
    validateUser:jest.fn().mockImplementation((email:string,password:string)=>{
      if(email=="sherin.reda15@gmail.com" && password=="1234"){
        return '11111111111'
      }
      return undefined
    })
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
  it('should return token',async()=>{
    let result=await controller.loginUser("sherin.reda15@gmail.com","1234");
    expect(result).toEqual(expect.any(String));
    expect(mockUserService.validateUser).toHaveBeenCalledWith('sherin.reda15@gmail.com', '1234');
  });

  it('should return undefined',async()=>{
    let result=await controller.loginUser("rewan@yahoo.com","1234");
    expect(result).toEqual(undefined);
    expect(mockUserService.validateUser).toHaveBeenCalledWith("rewan@yahoo.com","1234");
  })
});
