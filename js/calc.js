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

// adicionar um evento click para as teclas numericas
teclaNum.forEach((tecla) => {
  tecla.addEventListener("click", (evt) => {
    // volta o sinal para false, para permitir um novo sinal
    sinal = false;
    // verificar se o valor ja é decimal
    if (evt.target.innerHTML === ",") {
      if (!decimal) {
        decimal = true;
        // caso seja zero, adicionar 0 antes do separador
        if (display.innerHTML === "0") {
          display.innerHTML = "0,";
        } else {
          display.innerHTML += evt.target.innerHTML;
        }
      }
    } else {
      // quando o display tiver 0, limpa para não ficar 0 na frente
      if (display.innerHTML === "0") {
        display.innerHTML = "";
      }
      display.innerHTML += evt.target.innerHTML;
    }
  });
});

// adicionar o evento clique para as teclas de operacao
teclaOp.forEach((tecla) => {
  tecla.addEventListener("click", (evt) => {
    // verificar se o sinal existe no display
    if (!sinal) {
      sinal = true;
      // verificar se no display tem 0
      if (display.innerHTML === "0") {
        display.innerHTML = "";
      }
      // trocar do x por '*'
      if (evt.target.innerHTML === "x") {
        display.innerHTML += "*";
      } else {
        display.innerHTML += evt.target.innerHTML;
      }
    }
  });
});

// adicionar o botao clear
teclaCLS.addEventListener("click", (evt) => {
  sinal = false;
  decimal = false;
  display.innerHTML = "0";
});

// adicionar o botao apagar
teclaAp.addEventListener("click", (evt) => {
  if (display.innerHTML.length > 1) {
    display.innerHTML = display.innerHTML.slice(0, -1);
  } else {
    display.innerHTML = "0";
  }
});

// adicionar o botao resultado
teclaRes.addEventListener("click", (evt) => {
  sinal = false;
  decimal = false;
  const res = eval(display.innerHTML);
  display.innerHTML = res;
});

// teclas numericas
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
      display.innerHTML += tecla;
    }
  }

  // decimal (ponto do teclado)
  if (tecla === "." || tecla === ",") {
    if (!decimal) {
      decimal = true;
      display.innerHTML += ",";
    }
  }

  // ENTER = resultado
  if (tecla === "Enter") {
    try {
      const res = eval(display.innerHTML);
      display.innerHTML = res;
    } catch {
      display.innerHTML = "Erro";
    }
    sinal = false;
    decimal = false;
  }

  // apagar (backspace)
  if (tecla === "Backspace") {
    evt.preventDefault();
    if (display.innerHTML.length > 1) {
      display.innerHTML = display.innerHTML.slice(0, -1);
    } else {
      display.innerHTML = "0";
    }
  }

  // limpar tudo (ESC)
  if (tecla === "Escape") {
    display.innerHTML = "0";
    sinal = false;
    decimal = false;
  }
});
