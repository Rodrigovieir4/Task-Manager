function openSidebar() {
  document.getElementById('sidebar').classList.remove('-translate-x-full');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.add('-translate-x-full');
}

function mostrarFormulario() {
  document.getElementById("adicionarLista").classList.add("hidden");
  document.getElementById("formNovaLista").classList.remove("hidden");
  document.getElementById("nomeLista").focus();
}

function cancelarCriacao() {
  document.getElementById("formNovaLista").classList.add("hidden");
  document.getElementById("adicionarLista").classList.remove("hidden");
  document.getElementById("nomeLista").value = "";
}

function criarLista() {
  const nome = document.getElementById("nomeLista").value.trim();
  if (!nome) return;

  const novaColuna = document.createElement("div");
  novaColuna.className = "lista bg-gray-50 rounded-lg shadow-md p-4 min-w-[250px] flex-shrink-0";

  novaColuna.innerHTML = `
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-700 cursor-pointer" onclick="editarTitulo(this)">
        ${nome}
      </h2>
      <button onclick="this.closest('.lista').remove()" class="text-xl font-bold text-gray-600 hover:text-red-500">&times;</button>
    </div>
    <div class="cartoes space-y-2"></div>
    <div class="mt-2">
      <button onclick="mostrarFormularioCartao(this)" class="text-sm text-gray-600 hover:underline flex items-center gap-1">
        + Adicionar um cartão
      </button>
      <div class="form-cartao mt-2 hidden">
        <input type="text" placeholder="Nome do cartão..." class="w-full border rounded p-1 mb-1">
        <div class="flex gap-2">
          <button onclick="criarCartao(this)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">Adicionar</button>
          <button onclick="cancelarCartao(this)" class="text-xl text-gray-500 hover:text-red-500">&times;</button>
        </div>
      </div>
    </div>
  `;

  const container = document.getElementById("colunas");
  const addBtn = document.getElementById("adicionarLista");
  container.insertBefore(novaColuna, addBtn);

  new Sortable(novaColuna.querySelector(".cartoes"), {
    group: "cartoes",
    animation: 150,
    ghostClass: "bg-yellow-100"
  });

  cancelarCriacao();
}

function editarTitulo(tituloElemento) {
  const tituloAtual = tituloElemento.innerText;
  const input = document.createElement("input");
  input.type = "text";
  input.value = tituloAtual;
  input.className = "text-xl font-semibold text-gray-700 w-full bg-white border rounded px-1";

  input.onblur = function() {
    if (this.value.trim()) {
      tituloElemento.innerText = this.value.trim();
    }
    tituloElemento.style.display = "block";
    this.remove();
  };

  input.onkeydown = function(e) {
    if (e.key === "Enter") {
      this.blur();
    }
  };

  tituloElemento.style.display = "none";
  tituloElemento.parentElement.insertBefore(input, tituloElemento);
  input.focus();
}


function mostrarFormularioCartao(botao) {
  const form = botao.nextElementSibling;
  form.classList.remove("hidden");
  botao.classList.add("hidden");
  form.querySelector("input").focus();
}

function cancelarCartao(botao) {
  const form = botao.closest(".form-cartao");
  form.classList.add("hidden");
  form.previousElementSibling.classList.remove("hidden");
  form.querySelector("input").value = "";
}

function criarCartao(botao) {
  const form = botao.closest(".form-cartao");
  const input = form.querySelector("input");
  const titulo = input.value.trim();
  if (!titulo) return;

  const cartao = document.createElement("div");
  cartao.className = "bg-white p-2 rounded shadow cursor-pointer hover:shadow-md";
  cartao.textContent = titulo;

  const listaDeCartoes = form.closest(".lista").querySelector(".cartoes");
  listaDeCartoes.appendChild(cartao);

  input.value = "";
  cancelarCartao(botao);
}

const areasDeTrabalho = [
  { id: 1, nome: "Marketing" },
  { id: 2, nome: "Desenvolvimento" },
  { id: 3, nome: "Design" }
];
const areaAtualId = 2;

const areaAtual = areasDeTrabalho.find(area => area.id === areaAtualId);
document.getElementById("areaAtual").textContent = areaAtual ? areaAtual.nome : "Nenhuma";

const outrasAreas = areasDeTrabalho.filter(area => area.id !== areaAtualId);
const listaUl = document.getElementById("outrasAreas");
outrasAreas.forEach(area => {
  const li = document.createElement("li");
  li.textContent = area.nome;
  li.className = "p-2 rounded hover:bg-gray-100 cursor-pointer";
  li.onclick = () => alert("Trocar para: " + area.nome);
  listaUl.appendChild(li);
});

new Sortable(document.getElementById("colunas"), {
  animation: 150,
  draggable: ".lista",
  filter: "#adicionarLista",
  ghostClass: "bg-red-100"
});

document.querySelectorAll(".cartoes").forEach(container => {
  new Sortable(container, {
    group: "cartoes",
    animation: 150,
    ghostClass: "bg-yellow-100"
  });
});
