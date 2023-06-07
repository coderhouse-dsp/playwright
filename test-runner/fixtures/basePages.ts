import HeaderPage from "../../Learn-playwright/page/Header.page";
import CommonFunctions from "../../Learn-playwright/page/common.page";
import LoginPage from "../../Learn-playwright/page/Login.page";

import {test as baseTest} from "@playwright/test"

const test = baseTest.extend<{
    loginPage : LoginPage,
    headerPage: HeaderPage,
    commonPage: CommonFunctions
}>({

    loginPage:async({page},use)=>{
        await use(new LoginPage(page))
    },
    headerPage:async({page},use)=>{
        await use(new HeaderPage(page))
    },
    commonPage:async({page},use)=>{
        await use(new CommonFunctions(page))
    },
})
export default test;
export const expect = test.expect