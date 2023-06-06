import { PlaywrightTestConfig } from "@playwright/test";

const config:PlaywrightTestConfig = {
    use:{
        headless:false,
        channel:"chrome",
        screenshot:"only-on-failure",
        video:"retry-with-video",
    },
    testMatch:["github.test.ts"],
    retries:2,
    reporter:[["dot"],["json",{outputFile:"test-result.json"}]]
}
export default config