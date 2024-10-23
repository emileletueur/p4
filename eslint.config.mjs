import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default  [
  {
    files: ['src/**/*.ts'], // Chemin vers les fichiers TypeScript
    languageOptions: {
      parser: '@typescript-eslint/parser', // Utiliser le parser TypeScript
      parserOptions: {
        project: './tsconfig.json', // Chemin vers le fichier de configuration TypeScript
        tsconfigRootDir: './', // Racine de la configuration
        sourceType: 'module', // Type de module
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'), // Plugin TypeScript
      prettier: eslintPluginPrettier, // Plugin Prettier
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error', // Règle pour les variables inutilisées
      'prettier/prettier': 'error', // Fait en sorte que Prettier soit une erreur
    },
    extends: [
      'eslint:recommended', // Règles ESLint recommandées
      'plugin:@typescript-eslint/recommended', // Règles recommandées pour TypeScript
      'plugin:prettier/recommended', // Intègre Prettier avec ESLint
      eslintConfigPrettier, // Désactive les règles ESLint qui peuvent entrer en conflit avec Prettier
    ],
  },
];