var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var documents = require('./documents');

const ENV = process.env.NODE_ENV;

let webpackEntry = {
    'polyfills': helpers.src + '/polyfills.ts',
    'vendor': helpers.src + '/vendor.ts', 
    'main': helpers.src + '/assets/main.scss'
};

documents.forEach(docName => {
  webpackEntry[docName] = helpers.getDocPath(docName);
})

module.exports = {
  entry: webpackEntry,

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: 'tsconfig.json' }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },          
      {
        test: /\.scss$/,
        include: helpers.root('./src/assets'),
        loader: ExtractTextPlugin.extract({ 
          fallbackLoader: 'style-loader', 
          loader: 'css-loader!resolve-url-loader!sass-loader?sourceMap' })
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,        
        loader: 'url-loader?limit=5000&name=/images/[name].[hash:4].[ext]'
      },
      {
        test: /\.(svg|eot|ttf|woff)$/,        
        loader: 'url-loader?limit=5000&name=/fonts/[name].[hash:4].[ext]'
      },      
    ]
  },

  plugins: [
    //new webpack.NoEmitOnErrorsPlugin(),
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),   

    new webpack.DefinePlugin({
      'ENV': JSON.stringify(ENV),   
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),    
  ]
};