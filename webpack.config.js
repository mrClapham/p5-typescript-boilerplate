const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


module.exports = {
    entry: ['./src/index.ts'],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            // add as many aliases as you like! 
            src: path.resolve(__dirname, 'src'),
            lib: path.resolve(__dirname, 'src/lib'),
            sketch: path.resolve(__dirname, 'src/sketch'),
        },
        plugins: [new TsconfigPathsPlugin()]
    },

    output: {
        library: 'p5-ts',
        libraryTarget: 'umd',
        filename: 'index.js',
        // auxiliaryComment: 'Test Comment',
        path: path.resolve(__dirname, 'dist'),

    }
};