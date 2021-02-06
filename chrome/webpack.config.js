const { CheckerPlugin } = require('awesome-typescript-loader');
const { join } = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    contentPage: join(__dirname, 'src/contentPage.ts'),
    backgroundPage: join(__dirname, 'src/backgroundPage.ts'),
    fbSupportMobile: join(__dirname, 'src/fbSupportMobile.ts'),
    controller: join(__dirname, 'src/controller.ts'),
    cookiesController: join(__dirname, 'src/controllers/cookiesController.ts'),
    
  },
  output: {
    path: join(__dirname, '../angular/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: 'awesome-typescript-loader?{configFileName: "chrome/tsconfig.json"}'
      }
    ]
  },
  plugins: [new CheckerPlugin()],
  resolve: {
    extensions: ['.ts', '.js']
  }
};
