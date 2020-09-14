module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true, // 联合类型和enum类型写成字符串组合形式
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true), // 过滤继承自第三方xx.d.ts的属性
    },
  },
};
