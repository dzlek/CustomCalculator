import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import jestPlugin from 'eslint-plugin-jest'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
        },
        plugins: {
            js,
            jest: jestPlugin,
        },
        extends: ['js/recommended'],
    },
    eslintPluginPrettierRecommended,
    {
        ignores: ['dist/**', 'build/**', 'node_modules/**'],
    },
])
