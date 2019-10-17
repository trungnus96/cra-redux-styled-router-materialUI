require('dotenv').config();

const mode = process.env.NODE_ENV;
const isProd = mode === "production";

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

// Import the rest of our application.
if(isProd){
  // production mode
  module.exports = require('./server/server.prod.js');
}else{
  // development mode
  module.exports = require('./server/server.dev.js');
}