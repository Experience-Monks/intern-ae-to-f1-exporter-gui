import path from 'path';
import webpack from 'webpack';

export default {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.svg$/,
      loader: 'svg-inline'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [
     new webpack.DefinePlugin({
       __dirname: '__dirname',
     }),
  ],
  externals: {
    'after-effects': 'after-effects',
    'node-zip': 'node-zip',
    'ae-to-json': 'ae-to-json/after-effects',
    'ae-to-f1-dom': 'ae-to-f1/f1-dom',
    'ae-to-f1-exporter': 'ae-to-f1-exporter',
    'exporters-react-f1': 'ae-to-f1-exporter/exporters/react-f1',
    'exporters-f1-dom': 'ae-to-f1-exporter/exporters/f1-dom'
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  }
};
