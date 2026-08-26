import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  prettier,
  {
    rules: {
      // Advisory performance rules (react-hooks v6) that flag several
      // intentional, correct patterns here: reduced-motion seeding in
      // TypewriterText and prop-sync/reset effects in BlogSearchForm.
      // Keep them visible as warnings rather than blocking, since the flagged
      // code is deliberate and refactoring it risks regressions.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;
