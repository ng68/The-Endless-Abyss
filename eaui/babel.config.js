module.exports = {
  presets: [
    ["env", {"modules": false}],
    "stage-2",
    '@vue/app'
  ],
  "test": {
    "plugins": ["transform-es2015-modules-commonjs"]
  }
}
