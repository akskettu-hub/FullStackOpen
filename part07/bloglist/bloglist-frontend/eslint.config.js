import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  defineConfig([
    {
      files: ["**/*.{js,mjs,cjs,jsx}"],
      languageOptions: { globals: globals.browser },
    },
    pluginReact.configs.flat.recommended,
  ]),
  eslintConfigPrettier,
];
