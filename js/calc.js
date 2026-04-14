// pegar as teclas
const teclaNum = [...document.querySelectorAll(".num")];
const teclaOp = [...document.querySelectorAll(".op")];
const teclaRes = document.querySelector(".res");
const teclaCLS = document.querySelector("#tcls");
const teclaAp = document.querySelector("#tap");
const display = document.querySelector(".display");

// variaveis de controle
let sinal = false;
let decimal = false;

// teclas numericas (clique)
teclaNum.forEach((tecla) => {
  tecla.addEventListener("click", (evt) => {
    sinal = false;

    if (evt.target.innerHTML === ",") {
      if (!decimal) {
        decimal = true;
        if (display.innerHTML === "0") {
          display.innerHTML = "0,";
        } else {
          display.innerHTML += ",";
        }
      }
    } else {
      if (display.innerHTML === "0") {
        display.innerHTML = "";
      }
      display.innerHTML += evt.target.innerHTML;
    }
  });
});

// operadores (clique)
teclaOp.forEach((tecla) => {
  tecla.addEventListener("click", (evt) => {
    if (!sinal) {
      sinal = true;
      decimal = false;

      if (display.innerHTML === "0") {
        display.innerHTML = "";
      }

      if (evt.target.innerHTML === "x") {
        display.innerHTML += "*";
      } else {
        display.innerHTML += evt.target.innerHTML;
      }
    }
  });
});

// limpar tudo
teclaCLS.addEventListener("click", () => {
  sinal = false;
  decimal = false;
  display.innerHTML = "0";
});

// apagar
teclaAp.addEventListener("click", () => {
  if (display.innerHTML.length > 1) {
    display.innerHTML = display.innerHTML.slice(0, -1);
  } else {
    display.innerHTML = "0";
  }
});

// resultado (botão)
teclaRes.addEventListener("click", () => {
  try {
    const res = eval(display.innerHTML.replace(/,/g, "."));
    display.innerHTML = res;
  } catch {
    display.innerHTML = "Erro";
  }
  sinal = false;
  decimal = false;
});

// teclado
document.addEventListener("keydown", (evt) => {
  const tecla = evt.key;

  // números
  if (tecla >= "0" && tecla <= "9") {
    sinal = false;
    if (display.innerHTML === "0") {
      display.innerHTML = "";
    }
    display.innerHTML += tecla;
  }

  // operadores
  if (["+", "-", "*", "/"].includes(tecla)) {
    if (!sinal) {
      sinal = true;
      decimal = false;
      display.innerHTML += tecla;
    }
  }

  // decimal
  if (tecla === "." || tecla === ",") {
    if (!decimal) {
      decimal = true;
      display.innerHTML += ",";
    }
  }

  // enter = calcular
  if (tecla === "Enter") {
    try {
      const res = eval(display.innerHTML.replace(/,/g, "."));
      display.innerHTML = res;
    } catch {
      display.innerHTML = "Erro";
    }
    sinal = false;
    decimal = false;
  }

  // apagar
  if (tecla === "Backspace") {
    evt.preventDefault();
    if (display.innerHTML.length > 1) {
      display.innerHTML = display.innerHTML.slice(0, -1);
    } else {
      display.innerHTML = "0";
    }
  }

  // limpar (ESC)
  if (tecla === "Escape") {
    display.innerHTML = "0";
    sinal = false;
    decimal = false;
  }
});
