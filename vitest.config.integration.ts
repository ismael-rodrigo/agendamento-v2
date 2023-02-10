import { defineConfig} from "vitest/config"
export default defineConfig({
    test:{
        include: ["**/*.spec.ts"],
        exclude:[
            "**/*.e2e.spec.ts",
            "**/*.unity.spec.ts"

        ]
    },
})

