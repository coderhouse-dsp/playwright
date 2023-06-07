import {test,expect} from "./myFixtures"

test("my tests 1",async({hey},info)=>{
    // info.fail()
    info.skip();
    console.log(hey.toUpperCase())
    // let text = hey.toUpperCase()
    console.log("Is it passed? "+ info.status)
})