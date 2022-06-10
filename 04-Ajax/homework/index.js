//Boton "Ver Amigos"
let btnAmigos = document.querySelector("#boton");
//Donde se van a mostrar los resultados
let listAmigos = document.querySelector("#lista");

function updateFriendsList() {
  listAmigos.innerHTML = "";

  fetch("http://localhost:5000/amigos")
    .then((response) => response.json())
    .then((amigos) => {
      amigos.forEach((el) => {
        // const $li = document.createElement("li");
        // $li.innerText = el.name;
        // listAmigos.appendChild($li);
        let li = `<li>${el.name} <button onclick="deleteFriend(${el.id})">X</button> </li>`;
        listAmigos.innerHTML = listAmigos.innerHTML + li;
      });
    })
    .catch((error) => console.log(error));
}

//Si aprieto el boton X --> idAmigo = 2(un numero)
//Si aprieto el boton Borrar --> idAmigo = {...} (un objeto con los valores del eventListener)
function deleteFriend(idAmigo) {
    if(typeof idAmigo != "number") {
        idAmigo = inputDelete.value;
        inputDelete.value = "";
    }
    fetch(`http://localhost:5000/amigos/${idAmigo}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
          spanDelete.innerText = `Amigo borrado exitosamente`;
          updateFriendsList();
      })
      .catch((error) => console.log(error));
}

//Añade lista de amigos al hacer click al boton Ver Amigos
btnAmigos.addEventListener("click", updateFriendsList);

//Boton "Buscar"
let btnSearch = document.querySelector("#search");
//Lee el Id a buscar
let inputAmigo = document.querySelector("#input");
//Donde se van a mostrar los resultados
let spanAmigo = document.querySelector("#amigo");

//Añade amigo por ID al hacer click al boton Buscar
btnSearch.addEventListener("click", () => {
  let idAmigo = inputAmigo.value;
  inputAmigo.value = "";

  fetch(`http://localhost:5000/amigos/${idAmigo}`)
    .then((response) => response.json())
    .then((amigo) => (spanAmigo.innerText = amigo.name))
    .catch((error) => console.log(error));
});

//Boton Delete
let btnDelete = document.querySelector("#delete");
//Lee el ID a borrar
let inputDelete = document.querySelector("#inputDelete");
//Donde se van a mostrar los resultados
let spanDelete = document.querySelector("#success");

//Borra amigo por ID al hacer click al boton Delete
btnDelete.addEventListener("click", deleteFriend);
