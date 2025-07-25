import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import ts from "typescript-eslint";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",

      "no-console": "warn",
      "no-debugger": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      "template-curly-spacing": "error",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
      "comma-dangle": ["error", "always-multiline"],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-trailing-spaces": "error",
      "eol-last": "error",
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: pluginVue.parser,
      parserOptions: {
        parser: ts.parser,
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",

      "vue/multi-word-component-names": "off",
      "vue/component-definition-name-casing": ["error", "PascalCase"],
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: 3,
          multiline: 1,
        },
      ],
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always",
          },
        },
      ],
      "vue/attribute-hyphenation": ["error", "always"],
      "vue/v-on-event-hyphenation": ["error", "always"],
      "vue/script-indent": ["error", 2, { baseIndent: 1 }],

      "no-console": "warn",
      "no-debugger": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      "template-curly-spacing": "error",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
      "comma-dangle": ["error", "always-multiline"],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: "off", // Disable regular indent rule for Vue files
      "no-trailing-spaces": "error",
      "eol-last": "error",
    },
  },
];
