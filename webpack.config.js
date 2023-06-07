const path = require('path');

module.exports = {
  entry: './script.js', // Ange sökvägen till din huvudfil
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  mode: 'development', // eller 'production'
};