const path = require('path');
const fs = require('fs');

module.exports = {
    mode:'development',
    entry:  ['babel-polyfill','./src/client/clientEntryPoint.js'],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    //watch: true,
    module: {
      rules: [
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: "file-loader",
                options: {
                  name: "fonts/[name].[ext]",
                },
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'raw-loader', 'sass-loader']
            },
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader',
                //query: {
                    //presets: ['babel-preset-env'].map(require.resolve)
                //}
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  'url-loader?limit=10000',
                  'img-loader'
                ]
            }
        ]
    },
    plugins: [
        
    ],
    resolve: {
        alias: {
            
        },
        extensions: ['*', '.js', '.jsx', '.json']
    }
};