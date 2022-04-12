const getOl = document.getElementById('lista-tarefas');
const botaoCriaTarefa = document.getElementById('criar-tarefa');
const inputTextoTarefa = document.getElementById('texto-tarefa');
const apagar = document.getElementById('apaga-tudo');
const botaoRemoveFinalizados = document.getElementById('remover-finalizados');
const botaoSalvaTarefa = document.getElementById('salvar-tarefas');

function salvaTudo() {
  const listaAdd = document.getElementsByClassName('lista');

  for (let i = 0; i < listaAdd.length; i += 1) {
    localStorage.setItem(JSON.stringify(listaAdd[i].innerText), JSON.stringify(listaAdd[i].innerText));
  }
  alert('Lista salva no Local Storage!');
}

function removeFinalizados() {
  botaoRemoveFinalizados.addEventListener('click', () => {
    for (let i = 0; i < document.getElementsByClassName('completed').length; i += 1) {
      const finalizados = document.getElementsByClassName('completed');
      finalizados[i].remove();
    }
  });
}

function apaga() {
  apagar.addEventListener('click', () => {
    for (let i = 0; i < getOl.childElementCount; i += 1) {
      const getLista = document.getElementsByClassName('lista');
      getLista[i].remove();
    }
  });
}

function alteraCor() {
  for (let i = 0; i < getOl.childElementCount; i += 1) {
    let getLi = document.getElementsByClassName('lista')[i];

    getLi.addEventListener('click', () => {
      const children = getOl.getElementsByClassName('lista');
      for (i = 0; i < children.length; i += 1) {
        children[i].setAttribute('id', '');
      }
      getLi.setAttribute('id', 'backgroundGray');
    });
  }
}

function criaElemento() {
  const criaLi = document.createElement('li');
  criaLi.innerText = inputTextoTarefa.value;
  criaLi.setAttribute('class', 'lista');
  getOl.appendChild(criaLi);
  inputTextoTarefa.value = '';

  criaLi.addEventListener('dblclick', () => {
    if (criaLi.classList.contains('completed')) {
      criaLi.classList.remove('completed');
    }
    else {
      criaLi.classList.add('completed');
    }
  });

  alteraCor();
  apaga();
  removeFinalizados();
}

window.onload = () => {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i += 1) {
      const criaLi = document.createElement('li');
      criaLi.innerText = JSON.parse(localStorage.getItem(localStorage.key(i)));
      criaLi.setAttribute('class', 'lista');
      getOl.appendChild(criaLi);
      criaLi.addEventListener('dblclick', () => {
        if (criaLi.classList.contains('completed')) {
          criaLi.classList.remove('completed');
        } else {
          criaLi.classList.add('completed');
        }
      });
      alteraCor();
      apaga();
      removeFinalizados();
    }
  }
}

botaoCriaTarefa.addEventListener('click', criaElemento);
botaoSalvaTarefa.addEventListener('click', salvaTudo);
