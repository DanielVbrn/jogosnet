# Use a imagem Node.js oficial
FROM node:20.9.0

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json para o container
COPY package*.json tsconfig.json ./

# Instala as dependências (inclusive as de desenvolvimento)
RUN npm install

# Instala o TypeScript globalmente para garantir que o ts-node funcione
RUN npm install -g typescript

# Copia o restante do código para o container
COPY . .

# Expõe a porta usada pela aplicação (ajuste conforme necessário)
EXPOSE 3333

# Comando para iniciar o servidor com nodemon e ts-node
CMD ["npm", "run", "start"]
