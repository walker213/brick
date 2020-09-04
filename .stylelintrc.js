module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/stylelint')],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
};
