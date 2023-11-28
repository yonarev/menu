// RETORNA DIA 
function diaDeHoy() {
    // console.log("diaDeHoy()");
    let fecha =  new Date(); //Thu Jun 30 2022 14:08:47 GMT-0400 (hora estándar de Chile)
    const hoy = fecha.getDate();
    const hoyIso = fecha.toISOString()
    let dias=['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    let dia=dias[fecha.getDay()];
        console.log(dia);
        console.log(hoy);
        console.log(fecha);
        console.log(hoyIso);
    return dia;
}
function cargarPagina(pagina) {
    let nuevaVentana = window.open(pagina, "_blank"); 
    if (nuevaVentana != null && !nuevaVentana.closed) {
      // mensajeAyuda("Se cargo la pagina " + pagina)
      console.log("Se cargo la pagina " + pagina);
      nuevaVentana.location.reload();
    }
}
function tiempoPantalla(){
    console.log("tiempoPantalla()");
    let horNow;
    let fecNow;
    horNow=horaAhora();
    fecNow=fechaAhora()
    let diaH= diaDeHoy();
    console.log(diaH);
    let ele = document.getElementById("fechaHora"); 
    // DESPLIEGUE DATS EN PANTALLA
    ele.style.background = "rgb(253, 253, 5)";
    ele.innerText=diaH+"/"+fecNow+"/"+horNow;
}
function indiceAhora(){
  let listaFecha=retornaDiaMesAno()
  let dia=listaFecha[0]
  let mes=listaFecha[1]
  let anio=listaFecha[2]
  let tiempo=retornaHoraMinSeg()
  return dia+mes+anio+tiempo
  // // OBTENIENDO FECHA
  // let date = new Date();
  // let fecha=date.toLocaleDateString();
  // let fechaIso=date.toISOString();
  // // console.log("Fecha iso: " + fechaIso);
  // let anioHoy=fechaIso.substring(0,4);
  // let mesHoy=fechaIso.substring(5,7);
  // let diaHoy=fechaIso.substring(8,10);
  // let fechaHoy= diaHoy+mesHoy+anioHoy; 
  // debugger
  // // OBTENIENDO HORA
  // let currentTime = new Date();
  // let hora=currentTime.getHours();
  // let mini = currentTime.getMinutes().toString().padStart(2, '0');
  // let segundos=currentTime.getSeconds();
  // let hori= hora.toString();  
  // let segi= segundos.toString();  
  // let horaTrans=(hori + mini + segi);
  // let indiceAho=fechaHoy+horaTrans; // entrega indice global
  // return indiceAho
}
function horaAhora() {
  // console.log("horaAhora()");
  // OBTENIENDO HORA
  let currentTime = new Date();
  let hora = currentTime.getHours();
  let minutos = currentTime.getMinutes();
  let segundos = currentTime.getSeconds();
  // Convierte a string
  let hor = hora < 10 ? "0" + hora.toString() : hora.toString();
  let min = minutos < 10 ? "0" + minutos.toString() : minutos.toString();
  let seg = segundos < 10 ? "0" + segundos.toString() : segundos.toString();
  // Hora actual
  let horaTrans = hor + min + seg;
  var horaIng = hor + ":" + min + ":" + seg; // Entrega hora global horaIng
  // console.log("horaTrans: " + horaTrans);
  // console.log("hora Ingreso: " + horaIng); //*
  return horaIng;
}
function fechaAhora() {
  // console.log("fx fechaAhora()");
  const date = new Date();
  const anioHoy = date.getFullYear();
  const mesHoy = ("0" + (date.getMonth() + 1)).slice(-2); // Agrega un 0 delante del mes si es menor que 10
  const diaDeHoy = ("0" + date.getDate()).slice(-2); // Agrega un 0 delante del día si es menor que 10
  const fechaHoy = anioHoy + mesHoy + diaDeHoy; // entrega fechaHoy global
  const fechaIng = `${diaDeHoy}/${mesHoy}/${anioHoy}` // en variable global fechaIng
  return fechaIng;
}
function resolucionPantalla(){
    let datSis=document.getElementById("datSis")
    datSis.innerHTML=("祝福 La resolución de tu pantalla es: " + screen.width +"px" + " x " + screen.height +"px" )        
}
function diasMes(){
    let date = new Date();
    let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    // console.log("<br>El primer día es: "+primerDia.getDate());
    // console.log("<br>El ultimo día es: "+ultimoDia.getDate());
}
function diasEnUnMes(mes,ano) {
	return new Date(ano, mes, 0).getDate();
}
function fechaCompleta(){
    let meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    let diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    let f=new Date();
    let respuesta=diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
}
function mueveReloj(){
  //da hora en pantalla
    momentoActual = new Date()
    hora = momentoActual.getHours()
    minuto = momentoActual.getMinutes()
    segundo = momentoActual.getSeconds()
    str_segundo = new String (segundo)
    if (str_segundo.length == 1)
       segundo = "0" + segundo
    str_minuto = new String (minuto)
    if (str_minuto.length == 1)
       minuto = "0" + minuto
    str_hora = new String (hora)
    if (str_hora.length == 1)
       hora = "0" + hora
    horaImprimible = hora + " : " + minuto + " : " + segundo
    document.form_reloj.reloj.value = horaImprimible;
    setTimeout("mueveReloj()",1000)
}
function jsonAxls(){
  / * Datos JSON para exportar * /
  let data = [
        {"name":"John", "city": "Seattle"},
        {"name":"Mike", "city": "Los Angeles"},
        {"name":"Zach", "city": "New York"}
  ];
  / * Si el componente xlsx no se importa, entonces importe * /
  if(typeof XLSX == 'undefined') XLSX = require('xlsx');
  // / * Crear hoja de trabajo * /
  let ws = XLSX.utils.json_to_sheet(data);
  // / * Cree un libro de trabajo vacío y luego agregue la hoja de trabajo * /
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "People");
  // / * Generar archivo xlsx * /
  XLSX.writeFile(wb, "archivo.xlsx");
}
function verificarPestanaAbierta(url) {
  var pestanaAbierta = false;
  // Intentar abrir una nueva pestaña
  var nuevaPestana = window.open(url, '_blank'); 
  // Verificar si la pestaña se abrió correctamente o si ya existe
  if (nuevaPestana === null || typeof nuevaPestana === 'undefined') {
      pestanaAbierta = true; // La pestaña ya está abierta
  } else {
      nuevaPestana.close(); // Cerrar la pestaña recién abierta
  }
  return pestanaAbierta;
}
function retornaDiaMesAno() {
  // RETORNA UNA LISTA ORDENADA
  let today = new Date();
  let day = today.getDate().toString().padStart(2, '0');
  let month = (today.getMonth() + 1).toString().padStart(2, '0');
  let year = today.getFullYear().toString();
  let listaTemporal=[day,month,year]
  return listaTemporal
}
function retornaHoraMinSeg() {
  let fecha = new Date();
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();
  let segundos = fecha.getSeconds();
  // Asegurarse de que todas las partes tengan dos dígitos
  horas = ('0' + horas).slice(-2);
  minutos = ('0' + minutos).slice(-2);
  segundos = ('0' + segundos).slice(-2);
  // Retornar la hora en el formato deseado
  return horas + minutos +  segundos;
}
function abrirVentana(archivo) {
  let ancho = 500; // Ancho deseado en píxeles
  let altura = window.innerHeight; // Altura igual al tamaño de la ventana actual
  let posicionX = window.innerWidth + window.screenX; // Posición X a la derecha de la pantalla
  let opciones = "width=" + ancho + ",height=" + altura + ",left=" + posicionX;
  window.open(archivo, "_blank", opciones);
}
function generateID() {
    const now = new Date();
    const fecha = getCurrentDate();
    const hora = getCurrentTime();
    // Eliminar los dos puntos (:) y el slash (/) usando el método replace
    const fechaFormateada = fecha.replace(/\//g, "");
    const horaFormateada = hora.replace(/:/g, "");
    return fechaFormateada + horaFormateada;
}
function getCurrentDate() {
    var date = new Date();
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}
function getCurrentTime() {
  var date = new Date();
  var hours = ("0" + date.getHours()).slice(-2);
  var minutes = ("0" + date.getMinutes()).slice(-2);
  var seconds = ("0" + date.getSeconds()).slice(-2);
  return hours + ":" + minutes + ":" + seconds;
}
function formatNumber(myInput) {
  let input = document.getElementById(myInput).value;
  let unformattedNumber = input.replace(/\D/g, '');
  let formattedNumber = unformattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  document.getElementById(myInput).value = formattedNumber;
}
function formatoMoneda(myInput) {
   // Obtén el valor del input
   let input = document.getElementById(myInput).value;
   // Remueve cualquier caracter que no sea número
   let numericValue = input.replace(/\D/g, '');
   // Formatea el número con separadores de miles y símbolo de pesos
   let formattedValue = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(numericValue);
   // Actualiza el valor del input con el número formateado
   document.getElementById(myInput).value = formattedValue;
}
function getNumericValue(myInput) {
  // Obtén el valor del input
  let input = document.getElementById(myInput).value;
  // Remueve cualquier caracter que no sea número
  let numericValue = input.replace(/\D/g, '');
  // Devuelve el valor numérico
  return parseFloat(numericValue);
}
function borraTabla(idTabla){
  // Obtén el elemento de la tabla por su id
  var table = document.getElementById(idTabla);
  // Obtén todas las filas de la tabla
  var rows = table.getElementsByTagName("tr");
  // Elimina todas las filas, excepto la primera (encabezado)
  while (rows.length > 1) {
      table.deleteRow(1);
  }
}
function formatoPeso(numero){
  return '$'+ numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function separadorMiles(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function obtenerFechaActual() {
  let fecha = new Date();
  let dia = fecha.getDate().toString().padStart(2, "0");
  let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  let anio = fecha.getFullYear();
  return dia + "/" + mes + "/" + anio;
}
function obtenerHoraActual() {
  let fecha = new Date();
  let horas = fecha.getHours().toString().padStart(2, "0");
  let minutos = fecha.getMinutes().toString().padStart(2, "0");
  let segundos = fecha.getSeconds().toString().padStart(2, "0");
  return horas + ":" + minutos + ":" + segundos;
}
function borrrarContenido(elemento){
  var textarea = document.getElementById(elemento); // Reemplaza 'miTextarea' con el ID de tu elemento textarea
  textarea.value = '';
}
function formatoPeso(numero) {
  let numeroStr = String(numero); // Convertir el número a cadena de texto
  let separador = "."; // Separador de miles
  let partes = numeroStr.split(".");
  let parteEntera = partes[0];
  let parteDecimal = partes[1] || "";
  let parteEnteraConSeparador = "";
  for (let i = parteEntera.length - 1, j = 0; i >= 0; i--, j++) {
    if (j > 0 && j % 3 === 0) {
      parteEnteraConSeparador = separador + parteEnteraConSeparador;
    }
    parteEnteraConSeparador = parteEntera[i] + parteEnteraConSeparador;
  }
  let resultado = "$" + parteEnteraConSeparador;
  if (parteDecimal.length > 0) {
    resultado += "." + parteDecimal;
  }
  return resultado;
}
function pesoANumero(valorPeso) {
  return Number(valorPeso.replace(/[^0-9.-]+/g, ''));
}
function formatoSeparador(num) {
  let input = document.getElementById(num.id);
  let numero = input.value.replace(/[^\d]/g, "");
  input.value = agregarSeparadorMiles(numero);
}
function nombreArchivoJson(nombre){
  let listaFecha=retornaDiaMesAno()
  let dia=listaFecha[0]
  let mes=listaFecha[1]
  let anio=listaFecha[2]
  let tiempo=retornaHoraMinSeg()
  return nombre+dia+mes+tiempo+'.json'
}
function activaBotones(activa,seccionControl,event) {
  event.preventDefault();
  sec='.'+seccionControl
  var seccion = document.querySelector(sec);
  if (activa) {
      seccion.classList.remove('oculto');
  } else {
      seccion.classList.add('oculto');
  }
}
function redirije(ruta) {
  window.location.href = ruta;
}
function eliminarLocal(key) {
  var confirmacion = confirm("¿Estás seguro de que deseas eliminar esta clave del Local Storage?");
  if (confirmacion) {
    localStorage.removeItem(key);
    alert("La clave '" + key + "' ha sido eliminada del Local Storage.");
  } else {
    alert("La clave no ha sido eliminada.");
  }
}
function vaciaTabla(id) {
  var tabla = document.getElementById(id);
  var filas = tabla.getElementsByTagName('tr');
  while (filas.length > 0) {
    tabla.deleteRow(0);
  }
  //   var tabla = document.getElementById(id);
  //   var filas = tabla.getElementsByTagName('tr');
  
  //   for (var i = 0; i < filas.length; i++) {
  //     var celdas = filas[i].getElementsByTagName('td');
  //     for (var j = 0; j < celdas.length; j++) {
  //       celdas[j].innerHTML = "";
  //     }
  //   }
}
function convierteFechaString(fecha) {
  // Dividir la fecha en día, mes y año
  var partes = fecha.split('-');
  var anio = partes[0];
  var mes = partes[1];
  var dia = partes[2];
  // Concatenar los elementos en el nuevo formato
  var fechaConvertida = dia + '/' + mes + '/' + anio;
  return fechaConvertida;
}
function convertirStringAFecha(fechaString) {
  var partes = fechaString.split("/");
  var dia = partes[0];
  var mes = partes[1];  
  var anio = partes[2];
  var fechaFormateada = anio + "-" + mes + "-" + dia;
  var fechaObjeto = new Date(fechaFormateada);
  var fechaValida = fechaObjeto.toISOString().split("T")[0];
  return fechaValida;
}
function fechaEnFormatoFecha() {
  var fecha = new Date();
  var year = fecha.getFullYear();
  var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
  var day = ("0" + fecha.getDate()).slice(-2);
  var formatoFecha = year + "-" + month + "-" + day;
  return formatoFecha;
}
function getCurrentDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}
function getCurrentTime() {
  let today = new Date();
  let hh = String(today.getHours()).padStart(2, '0');
  let mm = String(today.getMinutes()).padStart(2, '0');
  let ss = String(today.getSeconds()).padStart(2, '0');
  return hh + ':' + mm + ':' + ss;
}
function convertirFormatoFecha(fecha) {
  let partes = fecha.split("-");
  let dia = partes[0];
  let mes = partes[1];
  let anio = partes[2];
  return dia + "/" + mes + "/" + anio;
}
function mostrarTabla(id) {
  let tabla = document.getElementById(id);
  tabla.style.display = 'table';
}
function ocultarTabla(id) {
  let tabla = document.getElementById(id);
  tabla.style.display = 'none';
}
function mostrarTablaMod(id) {
  let tabla = document.getElementById(id);
  tabla.style.display = 'table';
}
function ocultarTablaMod(id){
  let tabla = document.getElementById(id);
  tabla.style.display = 'none';
}
function formatearFecha(fecha) {
  let fechaObjeto = new Date(fecha);
  let dia = fechaObjeto.getDate();
  let mes = fechaObjeto.getMonth() + 1;
  let anio = fechaObjeto.getFullYear();
  // Asegurarse de que el día y el mes tengan dos dígitos
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;
  return dia + "/" + mes + "/" + anio;
}   
function vaciarLocal(id) {
  let confirma=confirm('esta seguro de eliminar de local storage '+id)
  if(!confirma){
      return
  }
  localStorage.removeItem(id);
  console.log("Se ha vaciado el local storage para la clave "+id);
  location.reload(true);
}
function encriptar(data, key) {
  let ciphertext = CryptoJS.AES.encrypt(data, key);
  return ciphertext.toString();
}
function desencriptar(encryptedData, key) {
  let decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
  let decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}
function encriptarArchivo() {
  let input = document.createElement('input');
  input.type = 'file';
  input.onchange = function(e) {
  let archivo = e.target.files[0];
  let reader = new FileReader();
  reader.onload = function(e) {
      let contenido = e.target.result;
      // let password = promptPsw('Ingrese palabra clave')
      let password = prompt('Ingrese palabra clave')
      let encrypted = CryptoJS.AES.encrypt(contenido, password);
      let archivoEncriptado = new Blob([encrypted], { type: "text/plain" });

      let link = document.createElement("a");
      link.href = URL.createObjectURL(archivoEncriptado);
      link.download = archivo.name + ".enk";
      link.click();
  };
  reader.readAsText(archivo);
  };
  input.click();
}
function desencriptarArchivo() {
  let input = document.createElement('input');
  input.type = 'file';
  input.onchange = function(e) {
  let archivoEncriptado = e.target.files[0];
  let reader = new FileReader();
  reader.onload = function(e) {
      let contenidoEncriptado = e.target.result;
      // let password = promptpsw('Palabra clave')
      let password = prompt('Palabra clave')
      let decrypted = CryptoJS.AES.decrypt(contenidoEncriptado, password);
      let contenidoDesencriptado = decrypted.toString(CryptoJS.enc.Utf8);
      let link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([contenidoDesencriptado], { type: "text/plain" }));
      link.download = archivoEncriptado.name.replace(".enk", "");
      link.click();
  };
  reader.readAsText(archivoEncriptado);
  };
  input.click();
}
function activaMod(idMod){
  let modulo=document.getElementById(idMod)
  modulo.style.display = "block";
  modulo.hidden = false;
}
function desactivaMod(idMod){
    let modulo=document.getElementById(idMod)
    // modulo.classList.add("ocultar");
    modulo.style.display = "none";
    modulo.hidden = true;
}  
function activaElemento(id){
  let elemento = document.getElementById(id); 
  elemento.style.display = "flex";
}
function desactivaElemento(id){
  let elemento=document.getElementById(id)
  // var elementosHijos = elemento.children;
  // Recorre todos los elementos hijos y borra su contenido
  // for (var i = 0; i < elementosHijos.length; i++) {
  //   elementosHijos[i].innerHTML = "";
  // }
  elemento.style.display = "none";
} 
function bajarJSON(key) {
  var datosLocalStorage = localStorage.getItem(key);
  // Crear un objeto Blob con los datos en formato JSON
  var blob = new Blob([datosLocalStorage], {type: 'application/json'});
  // Crear un enlace de descarga
  var url = URL.createObjectURL(blob);
  var enlaceDescarga = document.createElement('a');
  enlaceDescarga.href = url;
  let indice=indiceAhora()
  enlaceDescarga.download = key+indice+'.json';
  // enlaceDescarga.download = 'datos.json';
  // Simular un clic en el enlace para iniciar la descarga
  enlaceDescarga.click();
  // Liberar el objeto URL creado
  URL.revokeObjectURL(url);
}
function formatoMoneda(valor) {
  // Convertir el valor a entero
  let entero = parseInt(valor);

  // Verificar si el valor es un número válido
  if (isNaN(entero)) {
    return "Valor inválido";
  }

  // Aplicar formato de moneda con separador de miles y símbolo de peso chileno
  let formato = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(entero);

  return formato;
}
// function cargarJSONenLocalStorage(keyLocal) {
//   let input = document.createElement('input');
//   input.type = 'file';
//   input.onchange = function(event) {
//     let archivo = event.target.files[0];
//     let lector = new FileReader();
//     lector.onload = function(e) {
//       let contenidoArchivo = e.target.result;
//       localStorage.setItem(keyLocal, contenidoArchivo);
//       alert('Archivo JSON cargado en Local Storage con éxito.');
//     }
//     lector.readAsText(archivo);
//   }
//   input.click();
// }
function cargarJSONenLocalStorage(keyLocal) {
  let input = document.createElement('input');
  input.type = 'file';
  input.onchange = function(event) {
    let archivo = event.target.files[0];
    let lector = new FileReader();
    lector.onload = function(e) {
      let contenidoArchivo = e.target.result;
      localStorage.setItem(keyLocal, contenidoArchivo);
      // alert('Archivo JSON cargado en Local Storage con éxito.');
      console.log('Archivo JSON cargado en Local Storage con éxito.');
      mensajeAyuda('Archivo JSON cargado en Local Storage con éxito.','correcto')
      return true;
    }
    lector.readAsText(archivo);
  }
  input.click();
  return false;
}
function eliminareyLocal(key) {
  let confirma=confirm("seguro de eliminar de local storage el key: "+key)
  if(!confirma){
      return
  }
  var valor = localStorage.getItem(key);
  let resultado
  if (valor !== null) {
    localStorage.removeItem(key);
    resultado = true
  }else {
    resultado = false
  }
  return resultado
}
function siKeyLocal(key) {
  if (localStorage.getItem(key)) {
    return true;
  } else {
    return false;
  }
}
function obtenerFechaActual() {
  let fechaActual = new Date();
  let dia = fechaActual.getDate();
  let mes = fechaActual.getMonth() + 1;
  let anio = fechaActual.getFullYear();
  // Asegurarse de que el día y el mes tengan dos dígitos
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;
  return dia + "/" + mes + "/" + anio;
}
function fechaActual() {
  var fecha = new Date();
  var year = fecha.getFullYear();
  var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
  var day = ("0" + fecha.getDate()).slice(-2);
  var formatoFecha = year + "-" + month + "-" + day;
  return formatoFecha;
}
function horaActual() {
  let today = new Date();
  let hours = String(today.getHours()).padStart(2, '0');
  let minutes = String(today.getMinutes()).padStart(2, '0');
  let seconds = String(today.getSeconds()).padStart(2, '0');
  return hours + ':' + minutes + ':' + seconds;
}
function genId(){
  const currentDate = new Date();
  let fecha=fechaAhora(currentDate)
  let hora=horaAhora(currentDate)
  // let id=fecha+hora
  let id = fecha.replace(/\//g, '') + hora.replace(/:/g, '');
  return id
}
// function fechaAhora(){
//   const currentDate = new Date();
//   const day = String(currentDate.getDate()).padStart(2, '0');
//   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//   const year = currentDate.getFullYear();
//   const fechaActual = `${day}/${month}/${year}`;
//   return fechaActual
// }

// function horaAhora() {
//   const currentDate = new Date();
//   const horaActual = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
//   return horaActual;
// }

