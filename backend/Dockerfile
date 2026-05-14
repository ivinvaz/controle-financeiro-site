# Estágio base: define a imagem leve do Node 20
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimiza o cache)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta que sua aplicação utiliza (ajuste se não for 3000)
EXPOSE 8000

# Comando para iniciar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]