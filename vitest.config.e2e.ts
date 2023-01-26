import { defineConfig} from "vitest/config"
const timeout = process.env.CI ? 50000 : 30000


export default defineConfig({

    test:{
        include: ['./tests/e2e/**/*.spec.[tj]s'],
        setupFiles:['./mock.ts'],
        testTimeout: timeout,
        hookTimeout: timeout,
    },
})



