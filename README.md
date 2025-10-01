# Projeto Germinatec

Uma API robusta para um sistema de controle de estufa, desenvolvida para gerenciar e automatizar o ambiente de cultivo.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

* **Linguagens:** JavaScript, TypeScript e Node
* **Framework:** Express
* **ORM:** Prisma
* **Banco de Dados:** MySQL

## ⚙️ Instalação e Configuração

Siga os passos abaixo para ter uma cópia do projeto rodando na sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos

Certifique-se de ter o Node.js e o npm (ou yarn) instalados. Para testar a API, use uma ferramenta como o **RestClient**.

* [Node.js](https://nodejs.org/)
* [MySQL](https://www.mysql.com/)

### Instalação

1.  Clone este repositório:
    ```bash
    git clone [https://github.com/seu-usuario/germinatec.git](https://github.com/seu-usuario/germinatec.git)
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd germinatec
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn
    ```
4.  Crie um arquivo `.env` na raiz do projeto com a URL de conexão do banco de dados:
    ```
    DATABASE_URL="mysql://root:@localhost:3306/estufa_germinatec"
    ```
5.  Execute as migrações do Prisma para criar o esquema do banco de dados:
    ```bash
        npm run prisma:migrate
    ```
    ou

    ```bash
    npx prisma migrate dev --name init
    ```


6.  Inicie o servidor de desenvolvimento. A API rodará na porta padrão `3000`.
    ```bash
    npm run dev
    ```
    ou
    ```bash
    yarn dev
    ```


## 📚 API Endpoints (Usuários)

Aqui estão os endpoints disponíveis para a API de usuários, com exemplos de uso no formato **RestClient**.

### `CRUD /users`

CRUD para novos usuários

```http
POST http://localhost:3000/users/
GET http://localhost:3000/users/
PUT http://localhost:3000/users/
DELETE http://localhost:3000/users/