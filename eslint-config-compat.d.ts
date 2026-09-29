declare module '@eslint/js' {
  const eslintJs: {
    configs: {
      recommended: any[];
    };
  };
  export default eslintJs;
}

declare module 'eslint-config-prettier' {
  const prettierConfig: any;
  export default prettierConfig;
}

declare module 'typescript-eslint' {
  const tsEslint: {
    config: (...args: any[]) => any[];
    configs: {
      recommended: any[];
    };
  };
  export default tsEslint;
}
