document.addEventListener("DOMContentLoaded", () => {
  const itens = document.querySelectorAll(".item");
  const listaPedido = document.getElementById("lista-pedido");
  const totalElemento = document.querySelector(".total span:nth-child(2)");
  const botaoEnviar = document.getElementById("enviar");

  // Função para formatar números em Reais (R$)
  function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  // Atualiza os cálculos e a exibição do resumo
  function atualizarPedido() {
    listaPedido.innerHTML = "";
    let totalGeral = 0;
    let itensSelecionados = 0;

    itens.forEach(item => {
      const nome = item.querySelector("h2").textContent;
      const precoTexto = item.querySelector(".preco").textContent;
      // Extrai o valor numérico do preço
      const preco = parseFloat(precoTexto.replace("R$", "").replace(".", "").replace(",", ".").trim());
      const quantidade = parseInt(item.querySelector(".quantidade").textContent);

      if (quantidade > 0) {
        itensSelecionados++;
        const subtotal = preco * quantidade;
        totalGeral += subtotal;

        // Adiciona o item na lista de resumo
        const li = document.createElement("li");
        li.textContent = `${quantidade}x ${nome} - ${formatarMoeda(subtotal)}`;
        listaPedido.appendChild(li);
      }
    });

    if (itensSelecionados === 0) {
      const li = document.createElement("li");
      li.textContent = "Nenhum item selecionado ainda.";
      listaPedido.appendChild(li);
    }

    totalElemento.textContent = formatarMoeda(totalGeral);
  }

  // Configura os botões de incremento e decremento
  itens.forEach(item => {
    const btnMenus = item.querySelector(".controles button:first-child");
    const btnMais = item.querySelector(".controles button:last-child");
    const spanQtd = item.querySelector(".quantidade");

    btnMais.addEventListener("click", () => {
      let qtd = parseInt(spanQtd.textContent);
      spanQtd.textContent = qtd + 1;
      atualizarPedido();
    });

    btnMenus.addEventListener("click", () => {
      let qtd = parseInt(spanQtd.textContent);
      if (qtd > 0) {
        spanQtd.textContent = qtd - 1;
        atualizarPedido();
      }
    });
  });

  // Ação do botão de enviar para o WhatsApp
  botaoEnviar.addEventListener("click", () => {
    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:%0A";
    let temItens = false;

    itens.forEach(item => {
      const nome = item.querySelector("h2").textContent;
      const quantidade = parseInt(item.querySelector(".quantidade").textContent);

      if (quantidade > 0) {
        temItens = true;
        mensagem += `- ${quantidade}x ${nome}%0A`;
      }
    });

    if (!temItens) {
      alert("Por favor, selecione ao menos um item antes de enviar o pedido.");
      return;
    }

    mensagem += `%0ATotal: ${totalElemento.textContent}`;

    const numeroWhatsApp = "5579999999999"; 
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

    window.open(urlWhatsApp, "_blank");
  });
});
