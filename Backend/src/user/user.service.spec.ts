import { Test, TestingModule } from '@nestjs/testing';
import { UserService} from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User} from './user';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<User>;
  let mockUser={    
      id:'1',
      name:"Sherin",
      email:"sherin.reda15@gmail.com",
      password:"1234"
    }
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     providers: [UserService,{
      provide:getModelToken('User'),
      useValue:{
        create : jest.fn().mockImplementation(()=> mockUser),
        // constructor:jest.fn().mockResolvedValue(mockUser),
        findOne: jest.fn(),
        exec: jest.fn(),
        save:jest.fn().mockImplementation(user=>Promise.resolve({id:'12345',...user}))
      }
     }],
    }).compile();

    service= module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return token string',()=>{
    expect(service.generateToken("sherin.reda15@gmail.com","1234")).toEqual(expect.any(String));
  })
  it('should return user',async()=>{
    const user = {
      id:'1',
      name:"Sherin",
      email:"sherin.reda15@gmail.com",
      password:"1234"
    } as any
    const findOneSpy =  jest.spyOn(userModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue(user),
    } as any);
    let result=await service.findUserByEmail("sherin.reda15@gmail.com")
    expect(result).toEqual(user)
    expect (findOneSpy).toBeCalledWith({email : "sherin.reda15@gmail.com"})
  })

  it('should return string',async()=>{
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

   const createSpy =  jest.spyOn(userModel, 'create').mockImplementation(()=> mockUser as any)

    const result = await service.registerUser(user.name, user.email, user.password);
    expect(createSpy).toBeCalled()
    expect(result).toEqual('1');
});
  })
  

