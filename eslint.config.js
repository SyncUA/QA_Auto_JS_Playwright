import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import playwright from "eslint-plugin-playwright";

export default defineConfig([
    // === Playwright тести ===
    {
        files: ["tests/**/*.ts", "**/*.spec.ts"],
        languageOptions: {
            globals: { ...globals.node },
        },
        plugins: { playwright },
        extends: ["plugin:playwright/playwright-test"],
    },

    // === Загальні JS/TS файли ===
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: { js, prettier },
        extends: ["eslint:recommended", "plugin:prettier/recommended"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            /* === Prettier інтеграція === */
            "prettier/prettier": "error",

            /* === Базові правила стилю === */
            semi: ["error", "always"],
            quotes: ["error", "double"],
            "no-console": "off",
            "no-unused-vars": "warn",
            "prefer-const": "warn",
            curly: ["error", "all"],
            "no-var": "error",
            eqeqeq: ["error", "always"],
            "no-multiple-empty-lines": ["error", { max: 1 }],
            "comma-dangle": ["warn", "always-multiline"],
            "object-curly-spacing": ["error", "always"],
            "array-bracket-spacing": ["error", "never"],
            "space-before-blocks": ["error", "always"],
            "keyword-spacing": ["error", { before: true, after: true }],
            "arrow-body-style": ["warn", "always"],
            "consistent-return": "error",
            "no-else-return": "warn",
            "no-lonely-if": "error",
        },
    },

    // === TypeScript рекомендовані правила ===
    ...tseslint.configs.recommended,
]);
