import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Define files to lint
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json", // Required for rules needing type information
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", // Report Prettier issues as ESLint errors
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "warn",
    },
    ignores: ["src/generated/**", "dist/**", "node_modules/**"],
  },
  prettierConfig, // Must be last to override conflicting rules
);
