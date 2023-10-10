// METHODS/VEBS HTTP

// GET: Receber uma informação:
fetch("https://www.api.pizzalivery.com.br/order");

const filter = "coca-cola";
fetch(`https://www.api.pizzalivery.com.br/bebidas=${filter}`);

// POST: Enviar uma informação:
fetch("https://www.api.pizzalivery.com.br/order", {
  method: "POST",
  body: JSON.stringify(pizzaOrder),
});

// PUT: Alterar uma informação:
fetch("https://www.api.pizzalivery.com.br/order", {
  method: "POST",
  body: JSON.stringify(pizzaOrder),
});

// DELETE: Remover uma informação;
const orderID = 12345;

fetch(`https://www.api.pizzalivery.com.br/order${orderID}`, {
  method: "DELETE",
});

// OPTIONS: Autorização de recurso;
