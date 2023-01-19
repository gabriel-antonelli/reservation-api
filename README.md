# [reservation-api]()

## Instalar e rodar o projeto

Rodar o Reservation-API em sua máquina local é simples como fazer uma reserva.

### Dependências globais

Você precisa ter apenas ter a seguinte ferramenta instalada:

- Node.js LTS v16 (ou qualquer versão superior)

### Rodar o projeto

Para rodar o projeto localmente, basta rodar o comando abaixo:

```bash
npm install
````

Para conseguir rodar o projeto crie um arquivo `.env`, coloque dentro uma porta, se estiver com duvida tem um arquivo de exemplo `.env.example`

```bash
npm run start
````

Com isso a aplicação irá subir e o servidor será exposto no endereço:

```bash
http://localhost:3000/
```

### Rodar os testes

Há várias formas de rodar os testes, mas deixamos configurado alguns comandos para ajudar, o primeiro roda os testes unitários e os de integração.

```bash
npm run test
```

Para rodar os testes unitários:

```bash
npm run test:unit
```

Para rodar os testes integração:

```bash
npm run test:integration 
```
