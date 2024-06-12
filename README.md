# Registro de Programa de Computador

 Informações sobre o sistema -
 
### Tecnologias Utilizadas

Linguagens e Tecnologias
* [Java](https://github.com/golang/go)
* [SpringBoot](https://spring.io/projects/spring-boot)
* [MySQL](https://www.mysql.com/)
* [React](https://pt-br.legacy.reactjs.org/)
* [Bootstrap](https://getbootstrap.com/)

Ferramentas utilizadas
* [Visual Studio Code](https://code.visualstudio.com/)
* [Postman](https://www.postman.com/)
* [Eclipse](https://www.eclipse.org/downloads/)
* [XAMPP](https://www.apachefriends.org/pt_br/index.html)

## Dependências e Versões Necessárias

Dependências
* Spring Boot Starter Data JPA
* Spring Boot Starter Web
* Spring Boot Starter Test
* Spring Boot Maven Plugin
* Lombok
* MySQL Connector

Versões
* React - Versão: 18.2.0
* Bootstrap - Versão: 5.3.x
* Java - Versão: 17
* XAMPP - Versão: 3.3.0
* SpringBoot - Versão: 3.2.0
* Spring Tool Suite 4

## Como rodar o projeto - BACKEND ✅

Como estou usando o Spring Tool Suite 4, estou iniciando a API direto dele. Assim:

⚠️ Não se esqueça de verificar a porta que está sendo usada para a API no arquivo "application.properties". A que está configurada no meu é "http://localhost:1000/", mas pode ser que, no seu dispositivo, seja "http://localhost:8080/". Optei por essa porta porque a API não estava sendo executada quando eu a iniciava, já que a porta 8080 estava em uso."

⚠️ Caminho "src/main/resources"

No documento "application.properties" poderá ser visto onde é definido a porta onde a API é executada: ```server.port=1000```

[Tutorial](https://www.youtube.com/)

Para iniciar o front-end usando o Visual Studio Code. Aqui estão as etapas:

1 - Abra o Visual Studio Code.
2 - Abra os arquivos da branch "frontend".
3 - No terminal do VS Code, execute o comando:

```
cd front
```

Após entrar na pasta "front", execute o seguinte comando para iniciar o front-end:

```
npm start
```

⚠️ Se ocorrer algum erro, instale as dependências usando o comando:

```
npm install
```

[Tutorial Front](https://www.youtube.com/)


## Como rodar os testes

Se for usar o front para fazer os testes, é só executar que ele vai abrir as telas e o formulário. Agora se for usar o Postman para fazer o cadastro, primeiro verifique se há linguagens já cadastradas no bando de dados:

Método "GET" 

Caminho "http://localhost:PORT/api/listarlang"

Se estiver vazio vai retornar:

```
[]
```

Caso não tiver linguagens no banco de dados, é preciso adicionar no banco de dados as linguagens:

Método "POST" 

Caminho "http://localhost:PORT/api/postlang"

[Tutorial Add Linguagem]()

Na aba "Body" 

Modo "raw"

Tipo "JSON"

```
[
    {"nomeLinguagem": "Java"},
    {"nomeLinguagem": "Python"},
    {"nomeLinguagem": "JavaScript"},
    {"nomeLinguagem": "Ruby"},
    {"nomeLinguagem": "Elixir"}
]
```

Depois de verificar se há linguagens existentes vamos inserir um programa usando o postman:

Método "POST"

Caminho "http://localhost:PORT/api/save&edit"

[Tutorial Add Programa]()

Na aba "Body" 

Modo "raw"

Tipo "JSON"
```
{
  "nomePrograma": "Nome 3",
  "dataPrograma": "2021-10-05",
  "autores": [{"nome": "Autor 1", "porcentagem": 30},{"nome": "Autor 2", "porcentagem": 70}],
  "idLinguagem": [{"idLinguagem": 4},{"idLinguagem": 2},{"idLinguagem": 3}]
}
```

Para saber se rodou corretamente vai aparecer:

Status `200 OK`

#

Explique como rodar os testes da aplicação. Exemplo de um comando usando Makefile para rodar os testes:

```
make test
```

## Como rodar o projeto - FRONTEND ✅

Como estou usando o Visual Studio Code, vou iniciar o frontend direto dele. Assim:


## 📌 Lembrando que o sistema está em desenvolvimento 📌
