# Teste para Desenvolvedor Full Stack - RBR Digital

## Como Rodar o Projeto Localmente

1. Clone o repositório:

```
git clone https://github.com/FabianoMassignani/teste_RBR-Digital.git
```

2. Instale as dependências:

```
cd .\api\
npm install

cd .\next-app\
npm install
```

3. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias:

```
cd .\api\
cp .env
```

```
MONGO_URI="mongodb+srv://fabiano:fabiano@app.4x3lw9q.mongodb.net/?retryWrites=true&w=majority&appName=app"
PORT=3001
```

4. Inicie o servidor de desenvolvimento:

```
cd .\api\
npm start

cd .\next-app\
npm run dev
```

## Autor

- [FabianoMassignani](https://github.com/FabianoMassignani)
