import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    plugins: {
      prettier: {
        configs: {
          recommended: {
            rules: {
              'prettier/prettier': 'error',
              'arrow-body-style': 'off',
              'prefer-arrow-callback': 'off',
            },
          },
        },
      },
    },
  },
];
export default eslintConfig;
