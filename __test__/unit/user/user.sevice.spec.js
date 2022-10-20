import UserService from "../../../services/user";
import { UniqueConstraintError } from 'sequelize';

const mockUserModel = () =>({
  findOne : jest.fn(),
  createOne : jest.fn(),
})
describe("usersevice Layer Text",() => {
  let Userservice = new UserService()
  //시퀄라이즈 모델을 모킹함
  Userservice.User = mockUserModel()

 beforeEach(()=>{
  //모든mock을 리셋한다.
  jest.resetAllMocks()
 })


test("user sevice success", async ()=>{
  //인스턴스화 시킴
  //내가 모킹한것 Userservice.User에있는 findOne
const ID = {
   get : function(){
   return {"nickname": "Develope",
          "userId": "Develop2e",
          "password": "Devel2ope",}
   }
}                     //Userservice.User.findOne의 함수를 가진 findNickname

Userservice.User.findOne = jest.fn(()=>{
  return ID
 })
const result = await Userservice.findNickname(ID.nickname)
//몇번 동작하니?
expect(Userservice.User.findOne).toHaveBeenCalledTimes(1)
//result가 생각한 결과 값과 같은지 //
expect(Userservice.User.findOne).toHaveBeenCalledWith(ID.get.nickname)
})

test("user sevice fail ", async ()=>{
const nickname = null

//레포 동작에서 동작하는 결과 값을 보여줌
Userservice.User.findOne = jest.fn((nickname)=>{
  if (nickname === null) return null;
 })

const result = await Userservice.findNickname(nickname)
//함수 실행 했을때 값이 result가 리턴 받은 값이 null과 같으면 null을 반환해라
// const result = await Userservice.findNickname(ID)
expect(result).toBe(null)

})

test("user sevice signupUser",async ()=>{
  const user = {
    "nickname": "Develope",
    "password": "1234",
}     

const result = await Userservice.signupUser(user)
expect(Userservice.User.createOne).toHaveBeenNthCalledWith(user)

})
test("user sevice falil signup",async()=>{
//  1번조건 매개변수 모킹함수,

const unique = new UniqueConstraintError();

unique.parent = {
code: "ER_DUP_ENTRY"
}


const user = "0"

Userservice.User.createOne = jest.fn((user)=>{
  const unique = new UniqueConstraintError();
    unique.parent = {
    code: "ER_DUP_ENTRY"
    }
  return unique
  })

// 2번조건 signupUser실행한다
const result = await Userservice.signupUser(user)
 
//3번 결과
 expect(result).toBeInstanceOf(InternalError())
 expect(Userservice.User.createOne).toHaveBeenCalledTimes(1)
//  .toBeInstanceOf(Class)
 

})
})