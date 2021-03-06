var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NpmInstallPlugin = require('npm-install-webpack-plugin');
var autoprefixer = require('autoprefixer');
var helpers = require('./helpers');
var CopyPlugin = require('copy-webpack-plugin');
var path = require('path');

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';
var isDemo = ENV === 'demo';

module.exports = {
    target: "web",
    entry: {
        'polyfills': './scripts/polyfills.ts',
        'framework': './scripts/framework.ts',
        'vendor': './scripts/vendor.ts',
        'app': isDemo ?  './demo/main.ts' : './scripts/main.ts',
        'styles': './scripts/styles.ts'
    },    

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    module: {
        loaders: [{
                test: /^(?!.*\.spec\.ts$).*\.ts$/,                
                loaders: ['ts', 'angular2-template-loader']
            }, {
                test: /\.html$/,
                loader: 'html'
            }, {
                test: /\.(png|jpe?g|gif|svg|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            }, 
            {
                test: /\.css$/,
                loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
            },
            // support for .scss files
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file
            {
                test: /\.scss$/,
                loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
            }        
        ],
        preloaders: [{
            test: /\.js/,
            loader: 'source-map-loader'
        }]
    },

    plugins: [
        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'framework', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: isDemo ? './demo/index.html':'index.html',
            inject: isDemo ? true : false
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),

        new CopyPlugin([{
            from: "node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js",
            to:""
        }])
    ],

    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    postcss: [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ],

    /**
     * Sass
     * Reference: https://github.com/jtangelder/sass-loader
     * Transforms .scss files to .css
     */
    sassLoader: {
        //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
    }
};

