const currentTask = process.env.npm_lifecycle_event;
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
];

class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap('copy images and fonts', () => {
          fse.copySync('./app/assets/images', './docs/assets/images');
          fse.copySync('./app/assets/fonts', './docs/assets/fonts');
        });
    }
}

let cssConfig = {
    test: /\.css$/i,
    use: ['css-loader?url=false', 
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: postCSSPlugins
            }
        }
    }]
};

let pages = fse.readdirSync('./app').filter(file => file.endsWith('html')).map(page => new HtmlWebpackPlugin({
                                                                                            filename: page,
                                                                                            template: `./app/${page}`
                                                                                        }));

const config = {
    entry: './app/assets/scripts/App',
    module: {
        rules: [
            cssConfig
        ]
    },
    plugins: pages
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html',
    //         template: './app/index.html'
    //     })
    // ]
};

if(currentTask === 'dev') {
    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    };
    config.mode = 'development';
    config.devServer = {
        before: function(app, server) {
            server._watch('./app/**/*.html')
        },
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    };
    cssConfig.use.unshift('style-loader');
}

if(currentTask === 'build') {
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs'),
        clean: true,
    };
    config.mode = 'production';
    config.optimization = {
        splitChunks: {
            name: 'vendors',
            chunks: 'all'
        }
    }
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: 'styles.[chunkhash].css',
        }),
        new RunAfterCompile()
    );
    cssConfig.use.unshift(MiniCssExtractPlugin.loader);
    config.module.rules.push({
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
    });
    postCSSPlugins.push(require('cssnano'));
}

module.exports = config;
