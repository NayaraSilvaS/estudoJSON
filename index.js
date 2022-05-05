const fatura = {
  cliente: {
    ano: 2020,
    nome: "Maria Aparecida",
  },
  pagamentos: [
    {
      id: 123,
      descricacao: "arlequina",
      valor: 50.5,
      vendidos: 180,
      estudante: 25,
      publico: 150,
      custo: 500,
      meta: 1000,
      imposto: 10,
    },
    {
      id: 124,
      descricacao: "Batman",
      valor: 1500.5,
      vendidos: 30,
      estudante: 15,
      publico: 10,
      custo: 600,
      meta: 5000,
      imposto: 50,
    },
    {
      id: 124,
      descricacao: "Coringa",
      valor: 1500,
      vendidos: 650,
      estudante: 140,
      publico: 400,
      custo: 70,
      meta: 80000,
      imposto: 80,
    },
    {
      id: 124,
      descricacao: "Abc",
      valor: 1500,
      vendidos: 650,
      estudante: 140,
      publico: 400,
      custo: 70,
      meta: 80000,
      imposto: 80,
    },
  ],
};

const container = document.querySelector(".container");

container.innerHTML = fatura["pagamentos"]
  .map((pagamentos) => {
    const lucro = calculaLucro(pagamentos);
    return `<tr>
  <td>${pagamentos.descricacao}</td>
  <td>${formataNumero(pagamentos.valor)}</td>
  <td>${pagamentos.vendidos}</td>
  <td>${pagamentos.publico}</td>
  <td class="${meta(pagamentos, lucro)}">${formataNumero(lucro)}</td>
      <td>${formataNumero(descontoImposto(pagamentos, lucro))}</td>
  </tr>`;
  })
  .join("");
var tr = document.createElement("tr");
tr.innerHTML = `
<td colspan="2">Total</td>
<td>${fatura["pagamentos"].reduce(function (acc, cur) {
  return acc + cur.vendidos;
}, 0)}</td>
<td>${fatura["pagamentos"].reduce(function (acc, cur) {
  return acc + cur.publico;
}, 0)}</td>
<td>${formataNumero(
  fatura["pagamentos"].reduce(function (acc, cur) {
    const lucro = calculaLucro(cur);
    return acc + lucro;
  }, 0)
)}</td>
<td>${formataNumero(
  fatura["pagamentos"].reduce(function (acc, cur) {
    const lucro = descontoImposto(cur, calculaLucro(cur));
    return acc + lucro;
  }, 0)
)}</td>
`;
container.appendChild(tr);

function descontoImposto(pagamento, lucro) {
  return lucro - (lucro * pagamento.imposto) / 100;
}

function calculaLucro(pagamento) {
  return (
    pagamento.valor * (pagamento.vendidos - pagamento.estudante) +
    pagamento.valor * 0.1 * pagamento.estudante -
    pagamento.custo
  );
}

function meta(pagamento, lucro) {
  return pagamento.meta < lucro ? "text-success" : "text-danger";
}

function formataNumero(valor) {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}
