const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.ts', // Altere para o caminho do seu arquivo de entrada
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // Adicione essas linhas
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
            
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true // Limpa a pasta dist antes de gerar novos arquivos
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Pasta onde o arquivo index.html está
        },
        compress: true,
        port: 8080, // A porta em que o servidor será executado
        historyApiFallback: true, // Isso pode ajudar com o roteamento em SPA
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // Altere para o caminho do seu index.html
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/uploads', to: 'uploads' }
            ]
        })
    ],
};
