const path = require('path');

module.exports = {
  // Your existing Webpack configuration settings go here

  module: {
    rules: [
      {
        test: /canvas\.node$/,
        use: 'file-loader',
        options: {
          name: 'bin/[name].[ext]', // Specify a directory for the binary files
        },
      },
      // Add any other loaders your project requires
    ],
  },
};