const texto = document.getElementById('texto');

//inputs y botones
const inputText = document.getElementById('input-texto');
const inputTa = document.getElementById('selector-tamano');
const btnActualizar = document.getElementById('btn-actualizar');

const contador = document.getElementById('contador-caracteres');

const estados = {
  negrita: false,
  cursiva: false,
  subrayado: false,
  color: false     
};

function activo(boton, estado) {
  if (estado) {
    boton.classList.add('active');
  } else {
    boton.classList.remove('active');
  }
}

function actualizarEstilos() {
  texto.style.fontWeight = estados.negrita ? 'bold' : 'normal';
  texto.style.fontStyle = estados.cursiva ? 'italic' : 'normal';
  texto.style.textDecoration = estados.subrayado ? 'underline' : 'none';
  texto.style.color = estados.color ? 'red' : 'black';
}

function funcionNegrita() {
  estados.negrita = !estados.negrita;
  actualizarEstilos();
  activo(document.getElementById('btn-negrita'), estados.negrita);
}       

function funcionCursiva() {
  estados.cursiva = !estados.cursiva;
  actualizarEstilos(); 
  activo(document.getElementById('btn-cursiva'), estados.cursiva);
}

function funcionSubrayado() {
  estados.subrayado = !estados.subrayado;
  actualizarEstilos(); 
  activo(document.getElementById('btn-subrayado'), estados.subrayado);
}

function funcionColor() {
  estados.color = !estados.color;
  actualizarEstilos(); 
  activo(document.getElementById('btn-color'), estados.color);
}

function actualizarTexto() {
  const nuevoTexto = inputText.value;
  texto.textContent = nuevoTexto;  
  contador.textContent = `Caracteres: ${nuevoTexto.length}`;         
}
btnActualizar.addEventListener('click', actualizarTexto);

inputTa.addEventListener('change', () => {
  texto.style.fontSize = inputTa.value;
});

function handlerBoton(e) {
  const funcionBoton = e.target.dataset.formato;
  switch (funcionBoton) {
    case 'negrita':
      funcionNegrita();
      break;
    case 'cursiva':
      funcionCursiva();
      break;
    case 'subrayado':
      funcionSubrayado();
      break;
    case 'color':
      funcionColor();
      break;  
    }     
}
document.querySelectorAll('button.btn').forEach(e => e.addEventListener('click', handlerBoton));