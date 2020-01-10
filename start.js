// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require("@babel/register")({
    presets: [
        "@babel/preset-env",
        "@babel/preset-react"],
    plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
    ]
});

// Import the rest of our application.
module.exports = require('./server.js')