let intentos = 6;
let tieneVidas = intentos;
let palabra = "APPLE";

const API = "https://random-word-api.vercel.app/api?words=1&length=5";
fetch(API)
  .then((response) => {
    response.json().then((body) => {
      palabra = body[0].toUpperCase();
    });
  })
  .catch((error) => {
    console.log(error);
  });

document.getElementById("guess-button").addEventListener("click", () => {
  if (tieneVidas === 0) {
    terminar("¡PERDISTE!");
    return;
  }

  const INTENTO = leerIntento();
  if (INTENTO === palabra) {
    console.log("GANASTE!");
    terminar("¡GANASTE!");
    return;
  }

  const row = document.createElement("div");
  row.className = "row";
  const GRID = document.getElementById("grid");

  for (let i in INTENTO){
    const span = document.createElement("span");
    span.className = "letter";

    if (INTENTO[i] === palabra[i]){ //COLOR VERDE
      span.innerText = INTENTO[i];
      span.style.backgroundColor = '#79b851';
      console.log(INTENTO[i],"VERDE");

    } else if (palabra.includes(INTENTO[i])){ //COLOR AMARILLO
      span.innerHTML = INTENTO[i];
      span.style.backgroundColor = '#f3c237';
      console.log(INTENTO[i],"AMARILLO");

    } else { //COLOR GRIS
      span.innerHTML = INTENTO[i];
      span.style.backgroundColor ='#a4aec4';
      console.log(INTENTO[i],"GRIS");
    }
    row.appendChild(span);
  }
  GRID.appendChild(row);
  console.log(row);

  tieneVidas--;
  if (!tieneVidas){
    terminar("¡PERDISTE!");
    return;
  }
});

function leerIntento(){
  const input = document.getElementById("guess-input");
  const valor = input.value.toUpperCase();
  if (valor.length > 5) {
    alert("Solo puedes ingresar hasta 5 letras");
    input.value = '';
    return;
  }
  input.value = '';
  return valor;
}

function terminar(mensaje){
  let p = document.getElementById("guesses");
  p.innerHTML = mensaje;
}