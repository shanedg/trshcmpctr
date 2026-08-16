export const baseLint = {
  'package.json': 'sort-package-json',
  '*.md': 'markdownlint-cli2 --config projects/markdownlint-config/src/.markdownlint-cli2.jsonc --no-globs --fix',
}

export const jsLint = {
  '*.{cjs,js,jsx,mjs,ts,tsx}': 'npx eslint --max-warnings 0 --no-warn-ignored',
};

export default {
  'package.json': 'sort-package-json',
  '*.md': 'markdownlint-cli2 --config projects/markdownlint-config/src/.markdownlint-cli2.jsonc --no-globs --fix'
}
