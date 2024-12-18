🚀 Sistema de Loja de Alimentos
Este projeto é um sistema completo para uma loja de alimentos, permitindo a seleção de comidas, recheios, cálculo de preços e integração com um backend para processamento de pagamentos e exibição do histórico de compras.

📋 Funcionalidades
Frontend:

Escolha de 3 tipos de comida: Tapioca, Cuscuz e Sanduíche.
Input para o CPF do comprador.
Checkbox para seleção de recheios disponíveis de acordo com o tipo de comida.
Exibição do preço dos recheios selecionados.
Cálculo do preço total: preço base da comida somado ao preço dos recheios.
Botão Pagar: Envia os dados da compra ao backend.
Botão Histórico de Compras: Mostra um modal com as compras anteriores.
Backend:

Endpoint /food: Retorna o preço da comida selecionada e os recheios disponíveis.
Endpoint /payment: Processa e salva a compra no banco de dados.
Endpoint /sales: Retorna o histórico de compras.

🛠️ Tecnologias Utilizadas
Frontend
HTML5
CSS3
JavaScript (Vanilla JS)
Fetch API (para requisições HTTP ao backend)
Backend
Kotlin com Spring Boot
Banco de dados PostgreSQL
Repositórios e Controllers seguindo padrões REST

👨‍💻 Autor
Nome: Marcio Ryan Lima QUiroz
Data: Junho/2024
