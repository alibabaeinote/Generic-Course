import nextConfig from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = [
  ...nextConfig,
  prettierConfig,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "scripts/.atlas-bundle.js",
      "prototype/**",
      "exports/**",
    ],
  },
];

export default eslintConfig;
