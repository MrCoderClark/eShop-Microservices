const { join } = require('path');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development', // Change to 'production' for prod builds
  target: 'node',
  entry: './apps/auth-service/src/main.ts',
  output: {
    path: join(__dirname, 'dist'),
    filename: 'main.js',
    libraryTarget: 'commonjs2',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: 'apps/auth-service/tsconfig.app.json' })],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'apps/auth-service/tsconfig.app.json',
            transpileOnly: true
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],

  devtool: 'inline-source-map',
};
