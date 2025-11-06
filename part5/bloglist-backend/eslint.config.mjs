import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin";

export default defineConfig([
  js.configs.recommended,
  {
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      "@stylistic": stylisticJs,
    },
    languageOptions: { globals: globals.node },
  },
]);
