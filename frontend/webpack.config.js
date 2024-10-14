const path = require('path');

module.exports = {
    entry: './src/app.ts', // Mude isso para o caminho do seu arquivo de entrada
    output: {
        filename: 'bundle.js', // Nome do arquivo de saída
        path: path.resolve(__dirname, 'dist'), // Pasta de saída
    },
    resolve: {
        extensions: ['.ts', '.js'], // Extensões que o Webpack deve resolver
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Para arquivos .ts
                use: 'ts-loader', // Usar o ts-loader para compilar TypeScript
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'production', // Mude para 'development' se estiver desenvolvendo
};
