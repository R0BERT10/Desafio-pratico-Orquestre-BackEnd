# Desafio Prático Orquestre - BackEnd

Desafio técnico de desenvolvimento da API para o site de streaming de vídeo da Orquestre.

Cumprindo os requisitos propostos, desenvolvi uma API HTTP utilizando TypeScript, integrada a um banco de dados relacional, e implementando um sistema de login com e-mail e senha.


## API de Gerenciamento de Usuários e Filmes

**Descrição:** 
Esta API RESTful permite o gerenciamento de usuários e dados dos filmes. As funcionalidades incluem cadastro, login, atualização de perfil, criação e gerenciamento de filmes da plataforma.

**Tecnologias:**
* Node.js
* Express.js
* PostgreSQL
* Firebase (Authentication)

**Principais Features**
* Implementação da classe Result para transporte e tratamento de erros e dados entre classes, métodos e chamadas. Ela permite a separação de ClientError (erros provenientes de dados do lado do cliente) e ServerError (erros do lado do servidor). Além disso, possibilita a criação de um método para capturar erros do servidor para registro em log, facilitando futuras correções.
* Integração com Firebase Authentication para controle de usuários, gerenciamento de senhas e hashes, e geração e validação de tokens para segurança dos dados. Permite futuras integrações com outros métodos de cadastro, como contas do Google, Facebook, X (Twitter), entre outros.

**Instalação:**
1. Clone o repositório: `git clone https://github.com/R0BERT10/Desafio-pratico-Orquestre-BackEnd.git`
2. Instale as dependências: `yarn`   ;
3. Crie um arquivo .env com as configurações do banco de dados (utilizar o arquivo .env.example como referência);
4. Crie as tabelas necessárias `yarn migration:run`;
5. Execute o script para rodar o projeto em desenvolvimento `yarn dev`.


**Execução:**
```bash
yarn start
Use o código com cuidado.
```

### Endpoints: ###

***Cadastro de Usuário:***  
Cadastra um novo usuário no banco de dados.  
__Rota:__ `/account:signUp`  
__Método:__ POST  
__Requisição:__
|Nome da propriedade |	Tipo  | Classificação |	Descrição |
|-------------|----------|--------|----------|
| user | string | obrigatório | Nome único do usuário. |
| email   | string | obrigatório| Email do usuário. |
| name    | string | obrigatório| Nome completo do usuário.
| password | string | obrigatório| Senha (maior de 6 caracteres). |

__Requisição exemplo:__
```json
{
  "user": "john.doe",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "strongpassword"
}
```
__Resposta exemplo:__  
```json
{
  "idToken": "your_token",
  "refreshToken": "your_refresh_token",
  "email": "john.doe@example.com",
  "name": "John Doe",
  "user": "john.doe",
  "uid": "user_id"
}
```

***Login de Usuário:***  
Autentica um usuário existente utilizando email e senha.    
__Rota:__ `/account:signInWithEmailAndPassword`  
__Método:__ POST  
__Requisição:__   
|Nome da propriedade |	Tipo  | Classificação |	Descrição |
|-------------|----------|--------|----------|
| email   | string | obrigatório| Email do usuário. |
| password | string | obrigatório| Senha (maior de 6 caracteres). |

__Requisição exemplo:__
```json
{
  "email": "john.doe@example.com",
  "password": "strongpassword"
}
```
__Resposta exemplo:__  
```json
{
  "idToken": "your_token",
  "refreshToken": "your_refresh_token",
  "uid": "user_id",
  "user": "john.doe",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2023-11-22T10:35:24.984Z",
  "lastLoginAt": "2023-11-22T10:35:24.984Z"
}
```

***Atualização de Perfil:***  
Atualiza as informações de um usuário.    
__Rota:__ `/account:signUp`  
__Método:__ POST  
__Requisição:__   
|Nome da propriedade |	Tipo  | Classificação |	Descrição |
|-------------|----------|--------|----------|
| idToken | string | obrigatório | Token de autenticação |
| user   | string | opcional| Nome único do usuário. |
| name    | string | opcional| Nome completo do usuário.
| newPassword | string | opcional| Senha (maior de 6 caracteres). |

__Requisição exemplo:__
```json
{
 "idToken": "your_token",
  "user": "john.doe",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "newPassword" : "novaSenha"
}
```
__Resposta exemplo:__  
```json
{
  "email": "john.doe@example.com",
  "name": "John Doe",
  "user": "john.doe",
  "uid": "user_id"
}
```

***Deleção de Perfil:***  
Remove o usuário do banco de dados.      
__Rota:__ `/account:deleteProfile`  
__Método:__ POST  
__Requisição:__   
|Nome da propriedade |	Tipo  | Classificação |	Descrição |
|-------------|----------|--------|----------|
| idToken | string | obrigatório | Token de autenticação |

__Requisição exemplo:__
```json
{
  "idToken": "your_token"
}
```
__Resposta exemplo:__  `(204) No Content`

***Atualização de Token:***  
Atualiza o token do usuário.  
__Rota:__ `/account:refresh`  
__Método:__ POST  
__Requisição:__   
|Nome da propriedade |	Tipo  | Classificação |	Descrição |
|-------------|----------|--------|----------|
| refreshToken | string | obrigatório | Token de atualização, para novo token de usuário. |

__Requisição exemplo:__
```json
{
  "refreshToken": "your_refresh_token"
}
```
__Resposta exemplo:__  
```json
{
  "idToken": "new_token",
  "refreshToken": "new_refresh_token",
  "expiresIn": "3600"
}
```

***Criação de Gênero:***  
Adiciona um novo gênero de filme ao banco de dados.      
****É necessário o idToken do usuário logado.****     
__Rota:__ `/genre?idToken=[IDTOKEN]`  
__Método:__ POST  
__Requisição:__   
|Nome da propriedade |	Tipo  | Classificação |	Descrição |
|-------------|----------|--------|----------|
| name   | string | obrigatório| Nome do gênero. |

__Requisição exemplo:__
```json
{
  "name": "New Genre Name"
}
```
__Resposta exemplo:__  
```json
{
  "id": 123,
  "name": "Genre Name"
}
```

***Obter Gênero:***  
Obtém informações de um gênero de filme específico.      
****É necessário o idToken do usuário logado.****   
__Rota:__ `/genre/[IDGENRE]?idToken=[IDTOKEN]`  
__Método:__ GET  
__Requisição:__ NoBody (Só e necessário o parâmetro de rota.)

__Resposta exemplo:__  
```json
{
  "id": 123,
  "name": "Genre Name"
}
```

***Obter Todos Gêneros:***  
Obtém todos os gêneros de filmes.  
****É necessário o idToken do usuário logado.****   
__Rota:__ `/genre?idToken=[IDTOKEN]`  
__Método:__ GET  
__Requisição:__  NoBody  
__Resposta exemplo:__  
```json
{
  [
    { "id": 1, "name": "Action" },
    { "id": 2, "name": "Comedy" }
  ]
}
```

***Atualização de Gênero:***  
Atualiza o gênero de filme do banco de dados.   
****É necessário o idToken do usuário logado.****   
__Rota:__ `/genre/[IDGENRE]?idToken=[IDTOKEN]`  
__Método:__ PUT  
__Requisição:__   
|Nome da propriedade |	Tipo  | Classificação |	Descrição |
|-------------|----------|--------|----------|
| name   | string | obrigatório| Nome do gênero. |
__Requisição exemplo:__
```json
{
  "name": "New Genre Name"
}
```
__Resposta exemplo:__  
```json
{
  "id": 123,
  "name": "New Genre Name"
}
```



***Deleção de Gênero:***  
Remove o gênero de filme do banco de dados.  
****É necessário o idToken do usuário logado.****    
__Rota:__ `/genre/[IDGENRE]?idToken=[IDTOKEN]`  
__Método:__ DELETE  
__Requisição:__ NoBody (Só e necessário o parâmetro de rota.)    
__Resposta exemplo:__  `(204) No Content`

**Note**:  
•	Substitua [IDGENRE] e [IDTOKEN] pelos valores reais.  


### Estrutura da aplicação: ###

Seguindo os princípios do SOLID, todas as funções, métodos e classes foram separadas por categoria, abstraindo-as para que cada uma tenha apenas uma responsabilidade.

Essa organização permite rápidas alterações de banco de dados e provedores sem quebrar a aplicação, além de possibilitar a adição de novas rotas e funcionalidades sem afetar o restante da aplicação.

Atualmente, estamos utilizando o PostgreSQL como banco de dados relacional, mas ele pode ser trocado a qualquer momento por outro banco relacional (como MySQL) ou não relacional (como MongoDB), ou até mesmo usar mais de um banco de dados, bastando implementar as interfaces de repositório. Também estamos usando o Firebase Authentication como provedor de serviços de autenticação, que pode ser substituído pelo JWT, por exemplo, desde que siga o contrato de implementação dos métodos da interface vigente.

* __Controllers__: Responsáveis por receber e tratar os dados da requisição e retornar a resposta para o requisitante.   

  __Fluxo:__ 
  ```
    Recebe a requisição => trata os dados => chama a função de ‘services’ adequada => envia a resposta para o usuário.
  ```

* __Entities__: Classes de dados das entidades da aplicação.   

* __Repositories__: Administram os repositórios da aplicação.

  __Obs.__: Os repositórios devem seguir a implementação das interfaces.

* __Routes__: Rotas e endpoints da aplicação.

  __Fluxo__: 
  ```
  Gera o endpoint => chama o ‘Controller’ adequado.
  ```

* __Services__: Casos de uso da aplicação. Responsáveis pela lógica da aplicação.

  __Fluxo__: 
  ```
  Recebe a chamada => se comunica com a instância do repositório e o provedor, se necessário => realiza a lógica do caso de uso => retorna os dados para o chamante.
  ```

* __Providers__: Gerenciam os provedores externos necessários para a aplicação.

  __Obs__: Os provedores devem seguir as implementações das interfaces.

### Contribuições: ###
Contribuições são bem-vindas!  
Para contribuir, por favor, siga estes passos:
1.	Fork este repositório
2.	Crie um novo branch
3.	Faça suas alterações
4.	Envie um pull request
