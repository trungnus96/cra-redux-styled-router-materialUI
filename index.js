require('dotenv').config();

const mode = process.env.NODE_ENV;

// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('@babel/register')({
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": "3.0.0"
      }
    ]
  ]
});

console.log(`Running in ${mode}...`);

module.exports = require('./server/index.js');