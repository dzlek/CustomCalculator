import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
    },
    extends: ["js/recommended"],
  },
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/**", "build/**", "node_modules/**"],
  },
]);
