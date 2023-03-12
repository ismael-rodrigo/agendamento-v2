
import { fileURLToPath, URL } from 'url'
import { defineConfig} from "vitest/config"
console.log(fileURLToPath(new URL('./src/', import.meta.url)))

export default defineConfig({
    resolve:{
        alias:{
            '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
            '@domain': fileURLToPath(new URL('./src/domain', import.meta.url)),
            '@external': fileURLToPath(new URL('./src/external', import.meta.url)),
            '@main': fileURLToPath(new URL('./src/main', import.meta.url)),

        }
    },
    test:{
        include: ["**/*.spec.ts"],
        exclude:[
            "**/*.e2e.spec.ts",
            "**/*.unity.spec.ts"

        ]
    },
})

