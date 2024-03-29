## Funcionalidades

### **Cadastro de Carros**

#### Requisitos Funcionais
- [X] Deve ser possível cadastrar um novo carro.
- [X] Deve ser possível listar todas as categorias.

#### Regras de Negócio
- [X] Não deve ser possível cadastrar um carro com uma placa já existente.
- [X] Não deve ser possível alterar a placa de um carro já cadastrado.
- [X] O carro deve estar, por padrão, disponível logo após o cadastro.
- [X] O usuário responsável pelo cadastro deve ser um usuário administrador.


### **Listagem de Carros**

#### Requisitos Funcionais
- [X] Deve ser possível listar todos os carros disponíveis.
- [X] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [X] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [X] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

#### Regras de Negócio
- [X] O usuário não precisa estar logado no sistema.

### **Cadastro de Especificação no Carro**

#### Requisitos Funcionais
- [X] Deve ser possível cadastrar uma especificação para um carro.

#### Regras de Negócio
- [X] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [X] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- [X] O usuário responsável pelo cadastro deve ser um usuário administrador.

### **Cadastro de Imagens do Carro**

#### Requisitos Funcionais
- [X] Deve ser possível cadastrar a imagem do carro

#### Requisitos Não Funcionais
- [X] Utilizar o multer para upload dos arquivos

#### Regras de Negócio
- [X] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- [X] O usuário responsável pelo cadastro deve ser um usuário administrador.

### **Aluguel de Carro**

#### Requisitos Funcionais
- [X] Deve ser possível cadastrar um aluguel.

#### Regras de Negócio
- [X] O aluguel deve ter duração mínima de 24 horas.
- [X] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [X] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.