import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 👇 Add this block to ignore Prisma generated files
  {
    ignores: ["app/generated/prisma/**"],
  },

  // Your existing ESLint config
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
