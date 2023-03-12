import { defineConfig} from "vitest/config"
import path from 'path'

const timeout = process.env.CI ? 50000 : 30000
export default defineConfig({
    resolve:{
        alias:{
            '@': path.resolve(__dirname, './src')
        }
    },
    test:{
    
        include: ["**/*.e2e.spec.ts"],
        setupFiles:['./mock.ts'],
        testTimeout: timeout,
        hookTimeout: timeout,
        
    },
})



