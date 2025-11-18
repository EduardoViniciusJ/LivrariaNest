 A **Livraria Nest API** é uma aplicação backend construída com **NestJS** e **TypeORM**, utilizando **MySQL** como banco de dados.  
O sistema fornece um CRUD completo de **Livros** e **Categorias**, com validações utilizando `class-validator`, mapeamento de entidades com TypeORM e tratamento de erros via exceções HTTP do NestJS.

---

## 🧰 Tecnologias Utilizadas

### **Backend**
- **NestJS**
- **TypeORM**
- **MySQL**
- **Class Validator / Class Transformer**
- **Node.js**
- **TypeScript**
- **Git/GitHub**

---

## ⚙️ Funcionalidades

### 📘 Livros (Books)
- Criação de livros com validações.
- Atualização completa dos dados.
- Restrições:
  - O livro não pode ser criado com mais de 3 categorias.
  - mínimo de 1 categoria e máximo de 3.
  - preço obrigatório e positivo.
  - imagem opcional, mas apenas JPG ou PNG.
- Busca de livros por ID e listagem geral.
- Exclusão com retorno de mensagem personalizada.

### 🏷️ Categorias (Categories)
- Criação de categorias com nome único.
- Validações contra nomes vazios ou apenas espaços.
- Listagem completa ou busca por ID.
- Impede exclusão caso a categoria tenha livros associados.
- Atualização do nome com validação contra duplicação.

### 🛠️ Validações (DTOs)
- Uso extensivo de `class-validator` para:
  - tamanho de campos
  - formatos aceitos
  - números inteiros e positivos
  - arrays com tamanho mínimo/máximo
  - textos não vazios

### 🔄 Relacionamentos
- **Many-to-Many** entre `Book` e `Category`.
---

## 🔗 Endpoints Principais

### 📘 **Livros (Book)**  
| Método | Rota                     | Descrição            |
|--------|---------------------------|------------------------|
| POST   | /api/book/create         | Criar um novo livro   |
| GET    | /api/book                | Buscar todos os livros |
| GET    | /api/book/:id            | Buscar livro por ID    |
| PUT    | /api/book/update/:id     | Atualizar livro        |
| DELETE | /api/book/delete/:id     | Deletar livro          |

---

### 🏷️ **Categorias (Category)**  
| Método | Rota                         | Descrição               |
|--------|-------------------------------|---------------------------|
| POST   | /api/category/create         | Criar categoria          |
| GET    | /api/category                | Listar categorias        |
| GET    | /api/category/:id            | Buscar categoria por ID  |
| PUT    | /api/category/update/:id     | Atualizar categoria      |
| DELETE | /api/category/delete/:id     | Deletar categoria        |


## 🏗️ Arquitetura
O projeto segue a organização padrão NestJS com módulos independentes

