import UserRepository from "../../../database/repositories/user";
import { Op } from "sequelize";

const mockUserModel = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
});
describe("userRository Layer Text",() => {
  //인스턴스화 시킴
let usersrepository = new UserRepository()
//시퀄라이즈 모델을 모킹함
usersrepository.User = mockUserModel()



 beforeEach(()=>{
  //모든mock을 리셋한다.
  jest.resetAllMocks()
 })


test("findOne method 호출",async ()=>{
  const ID = 'afsdaf'

// usersrepository.User.findOne = (option)=>{
//   if (Object.hasOwn(option,'where'))return true
//   return false
// }

 const user = await usersrepository.findOne(ID)
// console.log(usersrepository.User.findOne)
//findOne 메소드가 몇번 작동하는가?
expect(usersrepository.User.findOne).toHaveBeenCalledTimes(1);
//findOne 메소드가 호출된 메소드를 검사합니다
expect(usersrepository.User.findOne).toHaveBeenCalledWith({
  where: { 
      [Op.or]: [
          { userId: ID },
          { nickname: ID }
      ]
  },
})

});

test("createOne method 호출", async()=>{
  const  ID = {
    "nickname" : "sdf",
    "password" : "1234"
  }                                     //어떤 메소드를 검사할꺼니?
  const users = await usersrepository.createOne(ID)
 //create method 몇번 호출 하는가?
  expect(usersrepository.User.create).toHaveBeenCalledTimes(1);
   //create 메소드가 호출된 인자를 검증                    //인자 확인
  expect(usersrepository.User.create).toHaveBeenCalledWith(ID)
  
})
})