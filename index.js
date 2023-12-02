// ------ GENERAL ----------

// NO DA LOS COLORES
function mensajeAyuda(msg,tipo){
    // debugger
    let mensaje=document.getElementById('mensajeAyuda')
    mensaje.style.display='block'
    mensaje.innerHTML= msg
    mensaje.classList.add(tipo)
    // if(tipo==='alerta'){
    //     mensaje.classList.add("alerta")
    // } 
    // if(tipo==='correcto'){
    //     mensaje.classList.add('correcto')
    // }
}
function mensajeActivo(log){
    let msg=document.getElementById('usuarioLog')
    if(log==='out'){
        msg.style.display='none'
    } else {
        msg.style.display='block'
        msg.innerHTML="Usuario Activo: "+ log
    }
}
function copiarAlPortapapelesNumCnx(){
    let input = document.getElementById('numero');
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
}
function copiarAlPortapapelesPswCnx() {
    if (!document.hasFocus()) {
    document.querySelector('body').click();
    }
    let inputCandado = document.getElementById('psw')
    inputCandado.focus()
    let inputI=inputCandado.value;
    let psw=desencriptar(inputI,inputP)
    // debugger
    if(psw){
    aPswAlias()
    document.getElementById('alias').value=psw
    }
}
function toggleMostrar() {
    let passwordInput = document.getElementById('alias');
    if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    } else {
    passwordInput.type = 'password';
    }
}
function pasador() {
    inputP = document.getElementById("pestillo").value;
    let modal = document.getElementById("modalPestillo");
    modal.style.display = "none";
    document.getElementById('numero').select()
}
function cargaModalClave(){
    let modal = document.getElementById("modalPestillo");
    modal.style.display = "block";
    document.getElementById("pestillo").value = "";
    document.getElementById("pestillo").select();
}
function mostrarFechaHoraActual() {
    let fechaActual = getCurrentDate();
    let horaActual = getCurrentTime();
    document.getElementById('fecha').value = fechaActual;
    document.getElementById('hora').value = horaActual;
}
// ------------------- CONEXIONES
function aPswAlias(){
    let passwordInput = document.getElementById('alias');
    passwordInput.type = 'password';
}
function aTextAlias(){
    let passwordInput = document.getElementById('alias');
    passwordInput.type = 'text';
}
function aTextFecha()  {
    let fechaInput = document.getElementById('fecha');
    fechaInput.type = 'text';
}
function copiarAlPortapapelesAliasCnx() {
    let input = document.getElementById('alias');
    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value)
    .then(function() {
        // alert("Texto copiado al portapapeles: " + input.value);
        console.log('');("Texto copiado al portapapeles: ");
    })
    .catch(function(error) {
        console.error("Error al copiar al portapapeles: ", error);
    });
}
function borrarCamposCnx() {
    document.getElementById('idCnx').value = '';
    document.getElementById('psw').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('alias').value = '';
}
function limpiaInputCnx(){
    document.getElementById('idCnx').value = "";
    document.getElementById('fecha').value = fechaAhora();
    document.getElementById('hora').value = horaAhora();
    document.getElementById('psw').value = "";
    document.getElementById('numero').value = "";
    document.getElementById('alias').value = "";
    document.getElementById('psw').focus()

}
function editarConexion(index) {
    aTextAlias() 
    aTextFecha()   
    let conexiones = JSON.parse(localStorage.getItem('conexiones'));
    let conexion = conexiones[index];
    document.getElementById('idCnx').value = conexion.idCnx;
    document.getElementById('fecha').value = conexion.fecha;
    document.getElementById('hora').value = conexion.hora;
    document.getElementById('psw').value = conexion.psw;
    document.getElementById('numero').value = conexion.numero;
    document.getElementById('alias').value = conexion.alias;
}
// ------------- LOCAL S
function mostrarConexiones() {
    // VALIDA SI USUARIO AUTORIZADO
    let idUsuAct=retornaUsuarioActivo()
    let permiso = permisoUsuarioActivo(idUsuAct)
    if(permiso[0]!=='to2'){
        mensajeAyuda("no tiene acceso a esta info","alerta")
        return
    }
    let conexiones = JSON.parse(localStorage.getItem('conexiones')) || [];
    if(conexiones.length===0 ){
        mensajeAyuda("sin conexiones en local S","alerta")
        return false
    }
    mensajeAyuda("hay conexiones en local S","correcto")
    let tabla = document.getElementById('tabla-conexiones').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    for (let i = 0; i < conexiones.length; i++) {
        let conexion = conexiones[i];
        let fila = tabla.insertRow();
        let celdaIdCnx = fila.insertCell(0);
        let celdaFecha = fila.insertCell(1);
        let celdaHora = fila.insertCell(2);
        let celdaPsw = fila.insertCell(3);
        let celdaNumero = fila.insertCell(4);
        let celdaAlias = fila.insertCell(5);
        let celdaAcciones = fila.insertCell(6);
        celdaIdCnx.innerHTML = conexion.idCnx;
        celdaIdCnx.setAttribute('class','columnaId')
        celdaFecha.innerHTML = conexion.fecha;
        celdaFecha.setAttribute('class','columnaFecha')
        celdaHora.innerHTML = conexion.hora;
        celdaHora.setAttribute('class','columnaHora')
        celdaPsw.innerHTML = conexion.psw;
        celdaPsw.setAttribute('class','columnaPsw')
        celdaNumero.innerHTML = conexion.numero;
        celdaNumero.setAttribute('class','columnaNumero')
        celdaAlias.innerHTML = conexion.alias;
        celdaAlias.setAttribute('class','columnaAlias')
        let botonEditar = document.createElement('button');
        botonEditar.innerHTML = 'Editar';
        botonEditar.setAttribute('class','btnEdita')
        botonEditar.setAttribute('onclick', 'editarConexion(' + i + ')');
        botonEditar.addEventListener('click', function() {
                fila.classList.add('seleccionada');
        });
        celdaAcciones.appendChild(botonEditar);
        let botonEliminar = document.createElement('button');
        botonEliminar.innerHTML = 'Eliminar';
        botonEliminar.setAttribute('class','btnElimina')
        botonEliminar.setAttribute('onclick', 'eliminarConexion(' + i + ')');
        celdaAcciones.appendChild(botonEliminar);
        // celdaAcciones.setAttribute('class','filaAcciones')
        celdaAcciones.setAttribute('class','columnaAcciones')

    }
    return true
}
function guardarConexion() {
    let idCnx = document.getElementById('idCnx').value;
    let fecha,hora
    if(!idCnx){
        idCnx=indiceAhora()
        fecha = fechaAhora();
        hora = horaAhora();
    }
    let fechaInput= document.getElementById('fecha').value
    fecha=fechaInput;
    hora = document.getElementById('hora').value 
    let pswInput = document.getElementById('psw').value;
    let psw = encriptar(pswInput, inputP)
    let numero = document.getElementById('numero').value;
    let alias = document.getElementById('alias').value;
    let conexion = {
        "idCnx": idCnx,
        "fecha": fecha,
        "hora": hora,
        "psw": psw,
        "numero": numero,
        "alias":alias
    };
    let conexiones = JSON.parse(localStorage.getItem('conexiones')) || [];
    let index = conexiones.findIndex(function(c) {
        return c.idCnx === idCnx;
    });
    if (index !== -1) {
        conexiones[index] = conexion;
    } else {
        conexiones.push(conexion);
    }
    localStorage.setItem('conexiones', JSON.stringify(conexiones));
    borrarCamposCnx() 
    mostrarConexiones();
}
function eliminarConexion(index) {
    let conexiones = JSON.parse(localStorage.getItem('conexiones'));
    conexiones.splice(index, 1);
    localStorage.setItem('conexiones', JSON.stringify(conexiones));
    mostrarConexiones();
}
// -------------- JSON
function recuperaCnx() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function(e) {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        let contenido = e.target.result;
        let conexiones = JSON.parse(contenido);
        localStorage.setItem('conexiones', JSON.stringify(conexiones));
        // alert('Conexiones cargadas desde el archivo JSON al almacenamiento local.');
        mensajeAyuda('Conexiones cargadas desde el archivo JSON al almacenamiento local.','correcto');
        mostrarConexiones();
    };
    reader.readAsText(file);
    };
    input.click();
}
function grabaArchivoJsonCnx(event) {
    event.preventDefault()
    let conexiones = JSON.parse(localStorage.getItem('conexiones')) || [];
    let data = JSON.stringify(conexiones);

    let blob = new Blob([data], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let ext=indiceAhora()
    let nombreArchivo='conexiones'+ext+'.json'
    let a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
function eliminarConexiones() {
    let confirma=confirm("seguro de eliminar las conexiones en Local S. ?")
    if(!confirma){
        return
    }
    localStorage.removeItem('conexiones');
    mensajeAyuda('Se ha eliminado la clave "conexiones" del almacenamiento local.','correcto');
    mostrarConexiones()
}
function encriptaArchivoJsonConexiones(event) {
    event.preventDefault();
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = function(e) {
        let archivo = e.target.files[0];
        let reader = new FileReader();
        reader.onload = function(e) {
            let contenido = e.target.result;
            // let password = promptpsw('palabra clave');
            // let password = prompt('palabra clave');

            let encrypted = CryptoJS.AES.encrypt(contenido, password);
            let archivoEncriptado = new Blob([encrypted], { type: "application/json" });
            let link = document.createElement("a");
            link.href = URL.createObjectURL(archivoEncriptado);
            link.download = archivo.name + ".enk";
            link.click();
        };
        reader.readAsText(archivo);
    };
    let conexiones = localStorage.getItem('conexiones') || '';
    // let password = promptPsw('palabra clave');
    let password = prompt('palabra clave');

    let encrypted = CryptoJS.AES.encrypt(conexiones, password);
    let archivoEncriptado = new Blob([encrypted], { type: "application/json" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(archivoEncriptado);
    let archivo='conexiones'+indiceAhora()+'.enk'
    link.download = archivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    input.click();
}
// ---------- USUARIOS ------------
function recuperaUsuarios() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        let contenido = e.target.result;
        let usuarios = JSON.parse(contenido);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        // alert('Conexiones cargadas desde el archivo JSON al almacenamiento local.');
        mensajeAyuda('Usuarios en el almacenamiento local.','correcto');
        mostrarConexiones();
    };
    reader.readAsText(file);
    };
    input.click();
}
function cargaUsuarios(){
    mostrarUsuariosEnTablaLocal();
    presentaId()
    document.getElementById('usuario').select()
}
function agregarUsuario() {
    enLocalModoGraba('nuevo')
    let validado=validaInputsUsu()
    if(!validado){
            presentaId()
            // alert('debe ingresar todos los datos')
            console.log('debe ingresar todos los datos')
            return
    }
    let idUsu = indiceAhora();
    let fecha=fechaAhora();
    let hora=horaAhora()
    let usuario = document.getElementById('usuario').value;
    let gps = document.getElementById('gps').value;
    let psw = document.getElementById('psw').value;
    let pswEnc=encriptar(psw, usuario)
    let obs = document.getElementById('obs').value;
    let accesos = document.getElementById('accesos').value.split(',');
    let usuarios = obtenerUsuarios();
    let usuarioExistente = usuarios.find(user => user.idUsu === idUsu || user.usuario === usuario);
    if (usuarioExistente) {
        mensajeAyuda('El ID de usuario o el nombre de usuario ya existen. Introduce valores únicos.','alerta')
        // alert('El ID de usuario o el nombre de usuario ya existen. Introduce valores únicos.');
        return;
    }
    let nuevoUsuario = {
        fecha:fecha,
        hora:hora,
        idUsu: idUsu,
        usuario: usuario,
        gps: gps,
        psw: pswEnc,
        accesos: accesos,
        obs: obs
    };
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    console.log('Nuevo usuario guardado en el almacenamiento local.');
    mostrarUsuariosEnTablaLocal();
    limpiaFormUsuario();
    location.reload(true);
}
function grabarUsuario(event) {
    event.preventDefault();
    let validado = validaInputsUsu();
    if (!validado) {
        presentaId();
        // alert('Debe ingresar todos los datos')
        mensajeAyuda('Debe ingresar todos los datos','alerta')
        console.log('Debe ingresar todos los datos');
        return;
    }
    let idUsu = document.getElementById('idUsu').value;
    let usuario = document.getElementById('usuario').value;
    let gps = document.getElementById('gps').value;
    let psw = document.getElementById('pswUsu').value;
    let pswEnc=encriptar(psw, usuario)
    let obs = document.getElementById('obs').value;
    let accesos = document.getElementById('accesos').value.split(',');
    let usuarios = obtenerUsuarios();
    let usuarioExistente = usuarios.find(user => user.idUsu === idUsu);
    let usuarioExistenteNombre = usuarios.find(user => user.usuario === usuario);
    if (usuarioExistenteNombre && usuarioExistenteNombre.idUsu !== idUsu) {
        // alert('El nombre de usuario ya existe. Introduce un valor único.');
        mensajeAyuda('El nombre de usuario ya existe. Introduce un valor único.','alerta')
        return;
    }
    if (usuarioExistente) {
        // Realizar actualización
        usuarios.forEach((user, index) => {
            if (user.idUsu === idUsu) {
                usuarios[index].usuario = usuario;
                usuarios[index].gps = gps;
                usuarios[index].psw = pswEnc;
                usuarios[index].obs = obs;
                usuarios[index].accesos = accesos;
                return;
            }
        });
        console.log('Usuario actualizado en el almacenamiento local.');
    } else {
        // Agregar nuevo usuario
        let fecha = fechaAhora();
        let hora = horaAhora();
        let nuevoUsuario = {
            fecha: fecha,
            hora: hora,
            idUsu: idUsu,
            usuario: usuario,
            gps: gps,
            psw: pswEnc,
            accesos: accesos,
            obs: obs
        };
        usuarios.push(nuevoUsuario);
        console.log('Nuevo usuario guardado en el almacenamiento local.');
    }
    guardarUsuarios(usuarios);
    mostrarUsuariosEnTablaLocal();
    limpiaFormUsuario();
    
    presentaId()
}
function mostrarUsuariosEnTablaLocal() {
    let usuarios = obtenerUsuarios();
    let tablaUsuarios = document.getElementById('bodyTablaUsu');
    tablaUsuarios.innerHTML = '';
    // Crear la fila de encabezados
    let encabezados = ['ID', 'Usuario', 'Gps', 'Psw', 'Accesos', 'Obs', 'edita', 'elimina'];
    let filaEncabezados = document.createElement('tr');
    // Agregar cada encabezado a la fila
    for (let i = 0; i < encabezados.length; i++) {
      let encabezado = document.createElement('th');
      encabezado.textContent = encabezados[i];
      filaEncabezados.appendChild(encabezado);
    }
    // Agregar la fila de encabezados a la tabla
    tablaUsuarios.appendChild(filaEncabezados);
    // Crear las filas de datos
    for (let i = 0; i < usuarios.length; i++) {
      let usuario = usuarios[i];
      let fila = document.createElement('tr');
      let celdaIdUsu = document.createElement('td');
      let celdaUsuario = document.createElement('td');
      let celdaGps = document.createElement('td');
      let celdaPsw = document.createElement('td');
      let celdaAccesos = document.createElement('td');
      let celdaObs = document.createElement('td');
      let celdaEditar = document.createElement('td');
      let celdaEliminar = document.createElement('td');
      celdaIdUsu.textContent = usuario.idUsu;
    //   celdaIdUsu.setAttribute('class','columnaId')
      celdaUsuario.textContent = usuario.usuario;
      celdaGps.textContent = usuario.gps;
      celdaPsw.textContent = usuario.psw;
    //   celdaPsw.setAttribute('class','columnaPsw')
      celdaAccesos.textContent = usuario.accesos;
      celdaObs.textContent = usuario.obs;
      let botonEditar = document.createElement('button');
      botonEditar.textContent = 'Editar';
      botonEditar.setAttribute('class','btnEdita')
      botonEditar.addEventListener('click', function() {
        editarUsuario(usuario);
      });
      let botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.setAttribute('class','btnElimina')
      botonEliminar.addEventListener('click', function() {
        eliminarUsuario(usuario);
      });
      celdaEditar.appendChild(botonEditar);
      botonEditar.classList.add('edita')
      celdaEliminar.appendChild(botonEliminar);
      fila.appendChild(celdaIdUsu);
      fila.appendChild(celdaUsuario);
      fila.appendChild(celdaGps);
      fila.appendChild(celdaPsw);
      fila.appendChild(celdaAccesos);
      fila.appendChild(celdaObs);
      fila.appendChild(celdaEditar);
      fila.appendChild(celdaEliminar);
      tablaUsuarios.appendChild(fila);
    }
}
function eliminarUsuario(usuario) {
    let usuarios = obtenerUsuarios();
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].idUsu === usuario.idUsu && usuarios[i].usuario === usuario.usuario) {
            usuarios.splice(i, 1);
            guardarUsuarios(usuarios);
            console.log('Usuario eliminado del almacenamiento local.');
            mostrarUsuariosEnTablaLocal();
            break;
        }
    }
}
function obtenerUsuarios() {
    let usuarios = localStorage.getItem('usuarios');
    if (usuarios) {
        return JSON.parse(usuarios);
    } else {
        return [];
    }
}
function guardarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
function obtenerUsuarioActual() {
    let usuarioActual = localStorage.getItem('usuarioActual');
    if (usuarioActual) {
        return JSON.parse(usuarioActual);
    } else {
        return null;
    }  
}     
function guardarUsuarioActual(usuario) {
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
}
function presentaPsw(){
    let pswVer=document.getElementById('pswVer')
    pswVer.style.display = "block";
    pswVer.hidden = false;
    let usuario=document.getElementById('usuario').value
    let pswEnc=document.getElementById('pswUsu').value
    let pswOk=desencriptar(pswEnc, usuario)
    pswVer.value=pswOk
    pswVer.innerText=pswOk
}
function ocultaPsw(){
    let pswVer=document.getElementById('pswVer')
    pswVer.classList.add("ocultar");
    pswVer.style.display = "none";
    pswVer.hidden = true;
}
// -------------- INPUT
function presentaId(){
    let idUsu=indiceAhora()
    document.getElementById('idUsu').value=idUsu
    return idUsu
}
function editarUsuario(usuario) {
    guardarUsuarioActual(usuario);
    document.getElementById('idUsu').value = usuario.idUsu;
    document.getElementById('usuario').value = usuario.usuario;
    document.getElementById('gps').value = usuario.gps;
    document.getElementById('pswUsu').value = usuario.psw;
    document.getElementById('obs').value = usuario.obs;
    document.getElementById('accesos').value = usuario.accesos;
    ocultaPsw()
}
function validaInputsUsu() {
    let form = document.getElementById('formIngreso');
    let inputs = form.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            return false; // Si algún campo está vacío, retornar falso
        }
    }
    return true; // Si todos los campos están llenos, retornar verdadero
}
function editarUsuarioBd(id){
    let fila = id.parentNode.parentNode; // Obtener la fila padre del botón
    let idUsu = fila.cells[0].textContent; // Obtener el valor del ID del usuario en la primera celda
    let usuario=fila.cells[1].textContent;
    let gps=fila.cells[2].textContent;
    let psw=fila.cells[3].textContent;
    let obs=fila.cells[4].textContent;
    let accesos=fila.cells[5].textConte
    document.getElementById('idUsu').value = idUsu;
    document.getElementById('usuario').value = usuario;
    document.getElementById('gps').value = gps;
    document.getElementById('pswUsu').value = psw;
    document.getElementById('obs').value = obs;
    document.getElementById('accesos').value = accesos; 
}
function reseteo() {
    // Obtener el formulario
    let form = document.getElementById('formIngreso');
    // Restablecer los valores predeterminados del formulario
    form.reset();
    document.getElementById('usuario').focus()
}
function limpiaFormUsuario() {
    document.getElementById('idUsu').value = '';
    document.getElementById('usuario').value = '';
    document.getElementById('gps').value = '';
    document.getElementById('pswUsu').value = '';
    document.getElementById('obs').value = '';
    document.getElementById('accesos').value = '';
    ocultaPsw()
}
// ------------- JSON
function cargaUsuariosJson() {
    let fileInput = document.getElementById('fileInput');
    let file = fileInput.files[0];
    let reader = new FileReader();
    reader.onload = function(event) {
        let jsonData = event.target.result;
        localStorage.setItem('usuarios', jsonData);
    };
    reader.readAsText(file);
    location.reload(true);
}
function grabaArchivoJsonUsu(event){
        let datosLocalStorage = localStorage.getItem('usuarios');
        let blob = new Blob([datosLocalStorage], {type: 'application/json'});
        let enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = URL.createObjectURL(blob);
        let ext=indiceAhora()
        let nombreArchivo='usuarios'+ext+'.json'
        enlaceDescarga.download = nombreArchivo;
        enlaceDescarga.click();
        event.preventDefault()
}
function grabaUsuariosJson() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    if (!usuarios) {
        console.log("No se encontraron datos de usuarios en el local storage.");
        return;
    }
    let jsonData = JSON.stringify(usuarios);
    let blob = new Blob([jsonData], { type: 'application/json' });
    let blobUrl = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'usuarios.json';
    link.click();
    URL.revokeObjectURL(blobUrl);
}
// ------------ ENK
function encriptaArchivoJsonUsuarios(){
    let input = document.createElement('input');
    input.type = 'file';

    input.onchange = function(e) {
        let archivo = e.target.files[0];
        let reader = new FileReader();

        reader.onload = function(e) {
            let contenido = e.target.result;
            // let password = promptpsw('palabra clave');
            // let password = prompt('palabra clave');

            let encrypted = CryptoJS.AES.encrypt(contenido, password);
            let archivoEncriptado = new Blob([encrypted], { type: "application/json" });

            let link = document.createElement("a");
            link.href = URL.createObjectURL(archivoEncriptado);
            let idArchivo=indiceAhora()
            link.download = archivo.name+idArchivo + ".enk";
            link.click();
        };

        reader.readAsText(archivo);
    };
    let conexiones = localStorage.getItem('usuarios') || '';
    // let password = promptPsw('palabra clave');
    let password = prompt('palabra clave');
    let encrypted = CryptoJS.AES.encrypt(conexiones, password);
    let archivoEncriptado = new Blob([encrypted], { type: "application/json" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(archivoEncriptado);
    let idArchivo=indiceAhora()
    let nombreArchivo='usuarios'+idArchivo+'.enk'
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    input.click();
}
function encriptaArchivoJsonBitacoras(){
    let input = document.createElement('input');
    input.type = 'file';

    input.onchange = function(e) {
        let archivo = e.target.files[0];
        let reader = new FileReader();

        reader.onload = function(e) {
            let contenido = e.target.result;
            // let password = promptpsw('palabra clave');
            // let password = prompt('palabra clave');

            let encrypted = CryptoJS.AES.encrypt(contenido, password);
            let archivoEncriptado = new Blob([encrypted], { type: "application/json" });

            let link = document.createElement("a");
            link.href = URL.createObjectURL(archivoEncriptado);
            let idArchivo=indiceAhora()
            link.download = archivo.name+idArchivo + ".enk";
            link.click();
        };

        reader.readAsText(archivo);
    };
    let bitacoras = localStorage.getItem('bitacoras') || '';
    // let password = promptPsw('palabra clave');
    let password = prompt('palabra clave');
    let encrypted = CryptoJS.AES.encrypt(bitacoras, password);
    let archivoEncriptado = new Blob([encrypted], { type: "application/json" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(archivoEncriptado);
    let idArchivo=indiceAhora()
    let nombreArchivo='bitacoras'+idArchivo+'.enk'
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    input.click();
}
async function cargarArchivoDesencriptadoEnLocalS(nombreClave) {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = async function(e) {
        let archivoEncriptado = e.target.files[0];
        let reader = new FileReader();

        reader.onload = async function(e) {
            let contenidoEncriptado = e.target.result;
            // let password = await promptPsw('Palabra clave');
            let password = prompt('Palabra clave');

            // debugger;

            let decrypted = CryptoJS.AES.decrypt(contenidoEncriptado, password);
            let contenidoDesencriptado = decrypted.toString(CryptoJS.enc.Utf8);

            localStorage.setItem(nombreClave, contenidoDesencriptado);
            // alert('El archivo desencriptado se ha cargado en el local storage.');
            console.log('El archivo desencriptado se ha cargado en el local storage.');

            mensajeAyuda('Se ha cargado en el local storage '+nombreClave,'correcto')
        };
        reader.readAsText(archivoEncriptado);
    };

    input.click();
}
async function promptPsw(message) {
    let password = "";
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "OK";
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    const promptContainer = document.createElement("div");
    promptContainer.appendChild(document.createTextNode(message));
    promptContainer.appendChild(document.createElement("br"));
    promptContainer.appendChild(passwordInput);
    promptContainer.appendChild(confirmButton);
    promptContainer.appendChild(cancelButton);
    // Añadir estilos CSS dinámicamente
    promptContainer.style.padding = "10px";
    promptContainer.style.border = "1px solid #ccc";
    promptContainer.style.borderRadius = "5px";
    // promptContainer.style.backgroundColor = "#f9f9f9";
    promptContainer.style.backgroundColor = "rgb(125, 104, 104)";
    promptContainer.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
    passwordInput.style.marginBottom = "10px";
    confirmButton.style.marginRight = "5px";
    // Establecer estilos adicionales según tus necesidades
    document.body.appendChild(promptContainer);
    passwordInput.select();
    passwordInput.focus();
    await new Promise((resolve) => {
      confirmButton.addEventListener("click", () => {
        password = passwordInput.value;
        document.body.removeChild(promptContainer);
        resolve();
      });
      cancelButton.addEventListener("click", () => {
        document.body.removeChild(promptContainer);
        resolve();
      });
    });
    return password;
}
// ----------- LOGIN ---------------
function validaLogin(){
    let acceso=''
    let usuarios=JSON.parse(localStorage.getItem('usuarios'))
    if(!usuarios || usuarios===null ){
        mensajeAyuda("sin Usuarios en el sistema","alerta")
        return false
    }
    let usuarioLog=document.getElementById('usuarioLogin').value
    let psw=document.getElementById('pswLogin').value
    for (let r=0;r < usuarios.length;r++){
        let usuario = usuarios[r]
        if(usuario.usuario===usuarioLog){
                let pswEnc= usuario.psw
                let pswDes=desencriptar(pswEnc, usuarioLog)
           if (pswDes === psw) {
                document.getElementById('usuarioLogin').value=''
                document.getElementById('pswLogin').value=''
                acceso=usuario.accesos[0]
                if(acceso){
                    desactivaUsuarios()
                    usuarioActivo(usuario.idUsu,true)
                    mensajeActivo(usuarioLog)
                    setAcceso(acceso)
                    desactivaMod('formularioLogin')
                    mensajeAyuda('Usuario activo','correcto')
                }
                return true
           } else {
                // alert('Paswword Incorrecta')
                mensajeAyuda('Paswword Incorrecta','alerta')
                document.getElementById('pswLogin').select()
                return false
           }
        }
    }
    // alert('El usuario no existe en el sistema')
    mensajeAyuda('El usuario no existe en el sistema','alerta')
    document.getElementById('usuarioLogin').select()
}
function setAcceso(acceso){
    // if(acceso==='admin'){
    if(acceso==='to2'){
        // logins
        let navLogAdm =document.getElementById('navLogAdm')
        navLogAdm.style.display='block'
        let navLogEli =document.getElementById('navLogEli')
        navLogEli.style.display='block'
        let navLogBck =document.getElementById('navLogBck')
        navLogBck.style.display='block'
        let navLogLee =document.getElementById('navLogLee')
        navLogLee.style.display='block'
        let navLogEnc =document.getElementById('navLogEnc')
        navLogEnc.style.display='block'
        // conexiones
        let navLogLec =document.getElementById('navLogLec')
        navLogLec.style.display='block'
        let navCnx =document.getElementById('navCnx')
        navCnx.style.display='block'
        //bitacora 
        let navBit =document.getElementById('navBit')
        navBit.style.display='block'
        //archivos
        let navArch =document.getElementById('navArch')
        navArch.style.display='block'
        // let navEdiBit =document.getElementById('navEdiBit')
        // navEdiBit.style.display='block'
        // let navBckBit =document.getElementById('navBckBit')
        // navBckBit.style.display='block'
        // let navLeeBit =document.getElementById('navLeeBit')
        // navLeeBit.style.display='block'
        // let navBckEnk =document.getElementById('navBckEnk')
        // navBckEnk.style.display='block'
        // let navleeEnk =document.getElementById('navleeEnk')
        // navleeEnk.style.display='block'
    }
    if(acceso==='usuario'){
        let navLogAdm =document.getElementById('navLogAdm')
        navLogAdm.style.display='none'
        //bitacora 
        let navBit =document.getElementById('navBit')
        navBit.style.display='block'
    }
    if(acceso==='sin acceso'){
        // ingreso
        let navLogAdm =document.getElementById('navLogAdm')
        navLogAdm.style.display='none'
        let navLogEli =document.getElementById('navLogEli')
        navLogEli.style.display='none'
        let navLogBck =document.getElementById('navLogBck')
        navLogBck.style.display='none'
        let navLogLee =document.getElementById('navLogLee')
        navLogLee.style.display='none'
        let navLogEnc =document.getElementById('navLogEnc')
        navLogEnc.style.display='none'
        let navLogLec =document.getElementById('navLogLec')
        navLogLec.style.display='none'
        // conexiones
        let navCnx =document.getElementById('navCnx')
        navCnx.style.display='none'
        //bitacora 
        let navBit =document.getElementById('navBit')
        navBit.style.display='none'
        //archivios
         let navArch =document.getElementById('navArch')
         navArch.style.display='none'
        // let navEdiBit =document.getElementById('navEdiBit')
        // navEdiBit.style.display='none'
        // let navEliBit =document.getElementById('navEliBit')
        // navEliBit.style.display='none'
        // let navBckBit =document.getElementById('navBckBit')
        // navBckBit.style.display='none'
        // let navLeeBit =document.getElementById('navLeeBit')
        // navLeeBit.style.display='none'
        // let navBckEnk =document.getElementById('navBckEnk')
        // navBckEnk.style.display='none'
        // let navleeEnk =document.getElementById('navleeEnk')
        // navleeEnk.style.display='none'
    }
}
function setInicio(){
    mensajeActivo('out')
    // LOGIN
    let navLogAdm =document.getElementById('navLogAdm')
    navLogAdm.style.display='none'
    let navLogEli =document.getElementById('navLogEli')
    navLogEli.style.display='none'
    let navLogBck =document.getElementById('navLogBck')
    navLogBck.style.display='none'
    let navLogLee =document.getElementById('navLogLee')
    navLogLee.style.display='none'
    let navLogEnc =document.getElementById('navLogEnc')
    navLogEnc.style.display='none'
    let navLogLec =document.getElementById('navLogLec')
    navLogLec.style.display='none'
    // CONEXIONES
    let navCnx =document.getElementById('navCnx')
    navCnx.style.display='none'
}
function usuarioActivo(idUsu,activo) {
    fecha=fechaAhora()
    hora=horaAhora()
    let act = {
      id: idUsu,
      fecha: fecha,
      hora: hora,
      activo:activo
    };
    // Obtener los datos existentes de session storage (si los hay)
    let acts = JSON.parse(sessionStorage.getItem('acts')) || [];
    // Agregar el nuevo objeto al array
    acts.push(act);
    // Guardar el array actualizado en session storage
    sessionStorage.setItem('acts', JSON.stringify(acts));
}
function siUsuarioActivo(id) {
    let acts = JSON.parse(sessionStorage.getItem('acts')) || [];
    let usuario = acts.find(function(act) {
      return act.id === id;
    });
    if (usuario && usuario.activo) {
      return true;
    } else {
      return false;
    }
}
function desactivaUsuarios() {
    let acts = JSON.parse(sessionStorage.getItem('acts')) || [];
    acts.forEach(function(act) {
      act.activo = false;
    });
    sessionStorage.setItem('acts', JSON.stringify(acts));
}
function retornaUsuarioActivo() {
    let acts = JSON.parse(sessionStorage.getItem('acts')) || [];
    let usuarioActivo = acts.find(function(act) {
      return act.activo === true;
    });
    if (usuarioActivo) {
      return usuarioActivo.id;
    } else {
      return null;
    }
}
function nombreUsuarioActivo(idUsu){ 
    let usuarios = JSON.parse(sessionStorage.getItem('usuarios')) || []; 
    let usuarioActivo = usuarios.find(usuario => usuario.id === idUsu); 
    if (usuarioActivo) { 
      return usuarioActivo.nombre; 
    } else { 
      return null; 
    }  
} 
function permisoUsuarioActivo(idUsu) {
    // Obtener el valor de 'usuarios' desde el Local Storage
    let usuarios = localStorage.getItem('usuarios');
    if (usuarios) {
      usuarios = JSON.parse(usuarios);
      let usuario = usuarios.find(function(u) {
        return u.idUsu === idUsu;
      });
      // Verificar si se encontró el usuario
      if (usuario) {
        // Retornar el valor de 'accesos' del usuario encontrado
        return usuario.accesos;
      }
    }
    // Retornar null si no se encontró el usuario o la clave 'usuarios'
    return null;
}
// ------------- LOCAL
function cargarUsuarios(event) {
    event.preventDefault()
    if (localStorage.getItem('usuarios')) {
        return true;
    } else {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = function(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            
            reader.onload = function(e) {
                let contenido = e.target.result;
                let usuarios = JSON.parse(contenido);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                // alert('Usuarios cargados en el almacenamiento local.');
                mensajeAyuda('Usuarios cargados en el almacenamiento local.','correcto')
            };
            reader.readAsText(file);
        };
        
        input.click();
    }
}
// ------------ BITACORAS -------------------
function cargaEdicionBit(){
    activaMod("modBit")
    presentaTiempoBit();
    cargarRegistrosBitacora();
}
function grabarBitacora() {
    let idUsu = document.getElementById("idUsuBit").value;
    let idBit = document.getElementById("idBit").value;
    let fecha = document.getElementById("fechaBit").value;
    let hora = document.getElementById("horaBit").value;
    let bitacora = document.getElementById("bitacora").value;
    let detalle = document.getElementById("detalleBit").value;
  
    // Validar que todos los campos estén completos
    if (!idUsu) {
       let usuAct=retornaUsuarioActivo()  
       if(!usuAct){
        //    alert('No hay ningún usuario logeado');
           mensajeAyuda('No hay ningún usuario logeado','alerta')
           return
       } else {
            // alert('No aparece logeado pero lo esta');
            mensajeAyuda('? usuario logeado','correcto')
            document.getElementById("idUsuBit").value=usuAct
            // idUsu=usuAct
       }
    } else if (!idBit) {
    //   alert('Falta ingresar el ID de la bitácora');
      mensajeAyuda('Falta ingresar el ID de la bitácora','alerta')
      document.getElementById("idBit").select();
      document.getElementById("idBit").focus();
    } else if (!fecha) {
    //   alert('Falta ingresar la fecha');
      mensajeAyuda('Falta ingresar la fecha','alerta');
      document.getElementById("fechaBit").select();
    } else if (!hora) {
    //   alert('Falta ingresar la hora');
      mensajeAyuda('Falta ingresar la hora','alerta');

      document.getElementById("horaBit").select();
    } else if (!bitacora) {
    //   alert('Falta ingresar la bitácora');
      mensajeAyuda('Falta ingresar la bitácora');
      document.getElementById("bitacora").select();
    } else if (!detalle) {
    //   alert('Falta ingresar el detalle');
      mensajeAyuda('Falta ingresar el detalle','alerta');
      document.getElementById("detalleBit").select();
    } else {
      fechaOk = convierteFechaString(fecha);
      // Obtener todos los registros
      let registros = obtenerRegistrosBits();
      // Buscar si existe un registro con el mismo ID
      let registroExistente = registros.find(function(registro) {
        return registro.idBit === idBit;
      });
      if (registroExistente) {
        // Validar que la bitácora no se repita en otros registros
        let registroDuplicado = registros.find(function(registro) {
          return registro.idBit !== idBit && registro.bitacora === bitacora;
        });
        if (registroDuplicado) {
        //   alert('La bitácora ingresada ya existe en otro registro');
          mensajeAyuda('La bitácora ingresada ya existe en otro registro','alerta');
          document.getElementById("bitacora").select();
          return;
        }
        // Si no hay registros duplicados, actualizar el registro existente
        registroExistente.idUsu = idUsu;
        registroExistente.fecha = fechaOk;
        registroExistente.hora = hora;
        registroExistente.bitacora = bitacora;
        registroExistente.detalle = detalle;
        mensajeAyuda('registro actualizado','correcto')
        limpiaInputsBit();
      } else {
        // Si no existe un registro con el mismo ID, crear un nuevo registro
        let nuevoRegistro = {
          idUsu: idUsu,
          idBit: idBit,
          fecha: fechaOk,
          hora: hora,
          bitacora: bitacora,
          detalle: detalle
        };
        registros.push(nuevoRegistro);
        presentaTiempoBit();
      }
      // Guardar los registros actualizados
      guardarRegistrosBits(registros);
      // Limpiar los campos
      // Recargar la tabla de registros
      cargarRegistrosBitacora();
      //   presentaTiempoBit();
    }
}
function cargarRegistrosBitacora() {
    presentaTiempoBit()
    let tabla = document.getElementById("tablaBitacoras");
    let tbody = tabla.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    // filtro
    let idUsuAct=retornaUsuarioActivo()
    let bitacorasTodas = JSON.parse(localStorage.getItem("bitacoras")) || [];
    let bitacoras= bitacorasTodas.filter(bitacora => bitacora.idUsu === idUsuAct);

    bitacoras.forEach(function(bitacora) {
      let fila = document.createElement("tr");
      let idUsu = document.createElement("td");
      idUsu.textContent = bitacora.idUsu;
      fila.appendChild(idUsu);
      let idBit = document.createElement("td");
      idBit.textContent = bitacora.idBit;
      fila.appendChild(idBit);
      let fecha = document.createElement("td");
      fecha.textContent = bitacora.fecha;
      fila.appendChild(fecha);
      let hora = document.createElement("td");
      hora.textContent = bitacora.hora;
      fila.appendChild(hora);
      let bitacoraTexto = document.createElement("td");
      bitacoraTexto.textContent = bitacora.bitacora;
      fila.appendChild(bitacoraTexto);
      let detalle = document.createElement("td");
      detalle.textContent = bitacora.detalle;
      fila.appendChild(detalle);
      let acciones = document.createElement("td");
      let botonEditar = document.createElement("button");
      botonEditar.textContent = "Editar";
      botonEditar.setAttribute('class','btnEdita')
      botonEditar.onclick = function() {
        editarRegistroBit(bitacora.idBit);
      };
      acciones.appendChild(botonEditar);
      
      let botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.setAttribute('class','btnElimina')
      botonEliminar.onclick = function() {
        eliminarRegistroBit(bitacora.idBit);
      };
      acciones.appendChild(botonEliminar);
      acciones.setAttribute('class','filaAcciones')
      fila.appendChild(acciones);
      
      tbody.appendChild(fila);
    });
}
function cargaBitacoras(){
    cargarJSONenLocalStorage('bitacoras');
    cargaEdicionBit()
    cargarRegistrosBitacora()
}
function obtenerRegistrosBits() {
    let registros = localStorage.getItem("bitacoras");
    if (registros) {
        return JSON.parse(registros);
    } else {
        return [];
    }
}
function guardarRegistrosBits(registros) {
    localStorage.setItem("bitacoras", JSON.stringify(registros));
}        
function editarRegistroBit(idBit) {
    let registros = obtenerRegistrosBits();
    let registro = registros.find(function(registro) {
        return registro.idBit === idBit;
    });
    if (registro) {
        document.getElementById("idUsuBit").value = registro.idUsu;
        document.getElementById("idBit").value = registro.idBit;
        let fechaReg=registro.fecha
        let fechaOk=convertirStringAFecha(fechaReg) 
        document.getElementById("fechaBit").value = fechaOk;
        document.getElementById("horaBit").value = registro.hora;
        document.getElementById("bitacora").value = registro.bitacora;
        document.getElementById("detalleBit").value = registro.detalle;
    }
}
function eliminarRegistroBit(idBit) {
    let confirma=confirm("? seguro de eliminar la bitacora? ")
    if(!confirma){return}
    let registros = obtenerRegistrosBits();
    let indice = registros.findIndex(function(registro) {
        return registro.idBit === idBit;
    });
    if (indice !== -1) {
        registros.splice(indice, 1);
        guardarRegistrosBits(registros);
        cargarRegistrosBitacora();
    }
}
function eliminarBitacoras(key){
    let respuesta=eliminareyLocal(key)
    if(respuesta){
        vaciaTabla('tablaBitacoras')
        mensajeAyuda('Se ha eliminado la clave '+key+' de la memoria','correcto');
    } else {
        mensajeAyuda('no esta la clave '+key+' en Memoria','alerta');
    }
}
// ------------- INPUT
function presentaTiempoBit() {
    document.getElementById('idUsuBit').value=retornaUsuarioActivo()
    document.getElementById("idBit").value = indiceAhora();
    let fechaActual = new Date().toISOString().split("T")[0];
    document.getElementById("fechaBit").value = fechaActual;
    document.getElementById("horaBit").value = horaAhora();
}
function limpiaInputsBit(){
    idBit=indiceAhora()
    document.getElementById("idBit").value = idBit;
    fecha = fechaEnFormatoFecha()
    document.getElementById("fechaBit").value = fecha;
    document.getElementById("horaBit").value = horaAhora();
    document.getElementById("bitacora").value = "";
    document.getElementById("detalleBit").value = "";
}
// ------------- ARCHIVOS ---------
function grabarBaseEnJSON(keys) {
    const data = {};
    // Recorrer los keys y obtener los datos de Local Storage
    keys.forEach((key) => {
      const datos = JSON.parse(localStorage.getItem(key));
      data[key] = datos;
    });
  
    // Convertir los datos a JSON
    const jsonData = JSON.stringify(data);
  
    // Crear un enlace de descarga para el archivo JSON
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    // Crear un elemento <a> para el enlace y descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    let archivo= nombreArchivoJson('baseDatos');
    link.download = archivo
    document.body.appendChild(link);
    link.click();
}
function cargaBaseJson() {
    const input = document.createElement('input');
    input.type = 'file';
    input.addEventListener('change', function (event) {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const jsonData = e.target.result;
        const data = JSON.parse(jsonData);
  
        for (const key in data) {
          localStorage.setItem(key, JSON.stringify(data[key]));
        }
  
        // alert('Datos cargados exitosamente en Local Storage.');
        mensajeAyuda("Base de datos completa en memoria","correcto")
      };
  
      reader.readAsText(file);
    });
    input.click();
}
function eliminaBaseLocal(keys){
    let confirmacion = confirm("¿Estás seguro de que deseas eliminar La Base de datos de Local Storage?");
    if (confirmacion) {
        keys.forEach((key) => {
            localStorage.removeItem(key);
        });
    }
}
function grabaBaseEncriptada(keys) {
    // Obtener los datos de Local Storage y convertirlos a un objeto JSON
    const data = {};
    keys.forEach((key) => {
      const datos = JSON.parse(localStorage.getItem(key));
      data[key] = datos;
    });
    // Encriptar los datos utilizando una clave secreta
    const secretKey = prompt("Ingresa la palabra clave para encriptar")
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    // Crear un archivo encriptado y guardarlo en disco duro
    const blob = new Blob([encryptedData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // let extension=generateID()
    let extension=indiceAhora()
    let archivo='baseDatos'+extension+'.enk'
    link.download = archivo; // Cambia el nombre del archivo si lo deseas
    document.body.appendChild(link);
    link.click();
}
function cargaBaseEncriptada() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.enk'; // Acepta solo archivos con extensión .enc
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (fileEvent) => {
        const encryptedData = fileEvent.target.result;
        // Desencriptar los datos utilizando la misma clave secreta utilizada para la encriptación
        const secretKey = prompt("Ingresa la palabra clave") // Reemplaza "clave_secreta" con tu propia clave
        const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
        // Convertir los datos desencriptados a un objeto JSON
        const data = JSON.parse(decryptedData);
        // Guardar los datos en Local Storage
        Object.keys(data).forEach((key) => {
          localStorage.setItem(key, JSON.stringify(data[key]));
        });
      };
      reader.readAsText(file);
    };
    fileInput.click();
}
// EN DESARROLLO VER
function descargaArchivo(url) {
    // debugger
    // const url = 'https://elkizen.000webhostapp.com/conexion/conexiones.enc';
    // const url = './conexiones.enc'; // URL del archivo a descargar
    const ext=indiceAhora()
    const nombreArchivo="conexiones"+ext+'.enk'
    // const nombreArchivo = 'conexiones.enc'; // Nombre del archivo
    // Crear un enlace temporal
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = nombreArchivo;
    // Simular un clic en el enlace
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}
//------------    NOTAS ---------------
function cargarBitacoras() {
    idUsuAct=retornaUsuarioActivo()
    let bitacorasTodas = JSON.parse(localStorage.getItem('bitacoras')) || [];
    let bitacoras = bitacorasTodas.filter(bitacora => bitacora.idUsu === idUsuAct);
    let selectBitacora = document.getElementById('bitNot');
    if (selectBitacora) {
        selectBitacora.innerHTML = '';
        let nombresBitacoras = [];
        bitacoras.forEach(bitacora => {
        if (!nombresBitacoras.includes(bitacora.bitacora)) {
            let option = document.createElement('option');
            option.value = bitacora.idBit;
            option.text = bitacora.bitacora;
            selectBitacora.appendChild(option);
            nombresBitacoras.push(bitacora.bitacora);
        }
        });
    }
}
function mostrarIdBitSeleccionado() {
    let selectBitacora = document.getElementById('bitNot');
    let inputIdBit = document.getElementById('idBitNot');
    inputIdBit.value = selectBitacora.value;
}
function actualizarTablaNotas() {
    let tablaNotas = document.getElementById('tablaNotas');
    let tbody = tablaNotas.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    // filtra notas por usuario activo
    let idUsuAct=retornaUsuarioActivo()
    let notasTodas = JSON.parse(localStorage.getItem('notas')) || [];
    let notas = notasTodas.filter(nota => nota.idUsu === idUsuAct);
    for (let i = 0; i < notas.length; i++) {
        let nota = notas[i];
        let row = tbody.insertRow();

        let idUsuCell = row.insertCell();
        idUsuCell.textContent = nota.idUsu;
        idUsuCell.setAttribute('class','columnaId')


        let idBitCell = row.insertCell();
        idBitCell.textContent = nota.idBit;

        let idNotaCell = row.insertCell();
        idNotaCell.textContent = nota.idNota;

        let fechaCell = row.insertCell();
        fechaCell.textContent = nota.fecha;
        fechaCell.setAttribute('class','columnaFecha')

        let horaCell = row.insertCell();
        horaCell.textContent = nota.hora;
        horaCell.setAttribute('class','columnaHora')


        let notaCell = row.insertCell();
        notaCell.textContent = nota.nota;

        let tituloCell = row.insertCell();
        tituloCell.textContent = nota.titulo;

        let lugarCell = row.insertCell();
        lugarCell.textContent = nota.lugar;

        let accionesCell = row.insertCell();

        accionesCell.innerHTML = '<button class="btnEdita" onclick="editarNota(this)">Editar</button> <button class="btnElimina" onclick="eliminarNota(this)">Eliminar</button>';
        accionesCell.setAttribute('class','filaAcciones')

    }
}
function guardarNota() {
    let idUsu = document.getElementById('idUsuNot').value;
    let idBit = document.getElementById('idBitNot').value;
    let idNota = document.getElementById('idNota').value;
    let fecha = document.getElementById('fechaNota').value;
    let hora = document.getElementById('horaNota').value;
    let nota = document.getElementById('notaBit').value;
    let titulo = document.getElementById('tituloNota').value;
    let lugar = document.getElementById('lugarNota').value;
    // filtro de notas por usuario activo
    let idUsuAct = retornaUsuarioActivo();
    let notasTodas = JSON.parse(localStorage.getItem('notas')) || [];
    let notas = [];
    // guarda notas del usuario activo en 
    for (let i = 0; i < notasTodas.length; i++) {
      if (notasTodas[i].idUsu === idUsuAct) {
        notas.push(notasTodas[i]);
      } else {
        // aqui prevalecen las notas que no son del usuario
        notas.push(Object.assign({}, notasTodas[i]));
      }
    }
    let notaExistente = notas.find(nota => nota.idNota === idNota);
    if (notaExistente) {
      // Editar la nota existente
      notaExistente.idUsu = idUsu;
      notaExistente.idBit = idBit;
      notaExistente.fecha = fecha;
      notaExistente.hora = hora;
      notaExistente.nota = nota;
      notaExistente.titulo = titulo;
      notaExistente.lugar = lugar;
      mensajeAyuda("Se actualizó la nota", "correcto");
    } else {
      // Crear una nueva nota
      let nuevaNota = {
        idUsu,
        idBit,
        idNota,
        fecha,
        hora,
        nota,
        titulo,
        lugar
      };
      notas.push(nuevaNota);
      mensajeAyuda("Se grabó la nueva nota", "correcto");
    }
  
    localStorage.setItem('notas', JSON.stringify(notas));
    actualizarTablaNotas();
    presentaTitulosNotas();
    presentaLugaresNotas();
}
function editarNota(button) {
    let row = button.parentNode.parentNode;
    let cells = row.getElementsByTagName('td');
    let idNota = cells[2].textContent;
    // notas del usuario activo
    let idUsuAct = retornaUsuarioActivo();
    let notasTodas = JSON.parse(localStorage.getItem('notas')) || [];
    let notas = notasTodas.filter(nota => nota.idUsu === idUsuAct);
    // toma el registro de local storage a editar
    let notaEditando = notas.find(nota => nota.idNota === idNota);
    // actualiza id y nombre de la bitacora
    let idBit = notaEditando.idBit;
    document.getElementById("idBitNot").value = idBit;
    encuentraBitacora(idBit);
    // actualiza id  Y nombre del usuario activo en pantalla
    let idUsu = notaEditando.idUsu;
    document.getElementById('idUsuNot').value = idUsu;
    nombreUsuarioActivoNotas(idUsu);
    // //presenta registro a editar en pantalla
    document.getElementById('idNota').value = notaEditando.idNota;
    document.getElementById('fechaNota').value = notaEditando.fecha;
    document.getElementById('horaNota').value = notaEditando.hora;
    document.getElementById('notaBit').value = notaEditando.nota;
    document.getElementById('tituloNota').value = notaEditando.titulo;
    document.getElementById('lugarNota').value = notaEditando.lugar;
}
function encuentraBitacora(idBit) {
    let bitacoras = JSON.parse(localStorage.getItem('bitacoras')) || [];
    let selectBitacora = document.getElementById('bitNot');
    
    if (selectBitacora) {
        // Buscar la bitácora con el idBit proporcionado
        let selectedBitacora = bitacoras.find(bitacora => bitacora.idBit === idBit);
        
        if (selectedBitacora) {
            // Seleccionar la opción correspondiente en el combo box
            selectBitacora.value = selectedBitacora.idBit;
            
            // Desplegar el valor de la bitácora en pantalla (por ejemplo, en un elemento <div>)
            let displayElement = document.getElementById('displayBitacoraValue');
            if (displayElement) {
                displayElement.textContent = selectedBitacora.bitacora;
            }
        }
    }
}
function eliminarNota(button) {
    let row = button.parentNode.parentNode;
    let cells = row.getElementsByTagName('td');
    let idUsu = cells[0].textContent;
    let idBit = cells[1].textContent;
    let idNota = cells[2].textContent;
    // Eliminar la nota del local storage
    let idUsuAct=retornaUsuarioActivo()
    let notasTodas = JSON.parse(localStorage.getItem('notas')) || [];
    let notas = notasTodas.filter(nota => nota.idUsu === idUsuAct);
    notas = notas.filter(nota => {
        return nota.idUsu !== idUsu || nota.idBit !== idBit || nota.idNota !== idNota;
    });
    localStorage.setItem('notas', JSON.stringify(notas));
    actualizarTablaNotas();
}
function nuevaNota(){
    limpiarCamposNotas()
    usuarioActivoNotas()
    cargarBitacoras();
    presentaTiempoNota()
    presentaIdNota()
    presentaTitulosNotas()
    presentaLugaresNotas()
    document.getElementById('notaBit').select()
}
function limpiarCamposNotas() {
    document.getElementById('idUsuNot').value = '';
    document.getElementById('bitNot').value = '';
    document.getElementById('idNota').value = '';
    document.getElementById('fechaNota').value = fechaActual();
    document.getElementById('horaNota').value = horaActual();
    document.getElementById('notaBit').value = '';
    document.getElementById('tituloNota').value = '';
    document.getElementById('lugarNota').value = '';
}
function presentaTiempoNota(){
    document.getElementById('fechaNota').value = fechaActual();
    document.getElementById('horaNota').value = horaActual();
}
function presentaIdNota(){
    let idNow=indiceAhora()
    document.getElementById('idNota').value=idNow
}
function presentaTitulosNotas() {
    // DEL USUARIO ACTIVO
    idUsuAct=retornaUsuarioActivo()
    let notasTodas = JSON.parse(localStorage.getItem('notas'));
    // SI NO HAY NOTAS EN LOCAL
    if(notasTodas===null){
        mensajeAyuda("No Hay notas en Local","alerta")
        return
    }
    let notas= notasTodas.filter(nota => nota.idUsu === idUsuAct);
    // si el usuario no tiene notas
    if(!notas){
        mensajeAyuda("El usuario no tiene notas en Local","alerta")
        return
    }
    // Obtener una lista de títulos no repetidos
    let titulos = [];
    notas.forEach(function(nota) {
        if (!titulos.includes(nota.titulo)) {
            titulos.push(nota.titulo);
        }
    });
    // Generar opciones para el combobox
    let combobox = document.getElementById('titulosNotas');
    combobox.innerHTML = ''
    titulos.forEach(function(titulo) {
    let option = document.createElement('option');
    option.text = titulo;
    combobox.add(option);
});
}
function mostrarTituloSeleccionado() {
    let combobox = document.getElementById('titulosNotas');
    let inputTitulo = document.getElementById('tituloNota');
    inputTitulo.value = combobox.value;
}
function presentaLugaresNotas() {
    // DEL USUARIO ACTIVO
    idUsuAct=retornaUsuarioActivo()
    let notasTodas = JSON.parse(localStorage.getItem('notas'));
    if(notasTodas===null){
        mensajeAyuda("No Hay notas en Local","alerta")
        return
    }
    let notas= notasTodas.filter(nota => nota.idUsu === idUsuAct);
    // si el usuario no tiene notas
    if(!notas){
        mensajeAyuda("El usuario no tiene notas en Local","alerta")
        return
    }
    let lugares = [];
    // Obtener una lista de lugares no repetidos
    notas.forEach(function(nota) {
        if (!lugares.includes(nota.lugar)) {
        lugares.push(nota.lugar);
        }
    });

    // Generar opciones para el combobox
    let combobox = document.getElementById('lugaresNotas');
    combobox.innerHTML = ''
    lugares.forEach(function(lugar) {
        let option = document.createElement('option');
        option.text = lugar;
        combobox.add(option);
    });
}
function mostrarLugarSeleccionado() {
    let combobox = document.getElementById('lugaresNotas');
    let inputLugar = document.getElementById('lugarNota');
    inputLugar.value = combobox.value;
}
function correjirFormatoFecha(fecha) {
    let partes = fecha.split("-");
    if (partes.length === 3) {
        let dia = partes[0];
        let mes = partes[1];
        let anio = partes[2];
        return anio + "-" + mes + "-" + dia;
    }
    return fecha;
}
function usuarioActivoNotas(){
    let idUsuNotas=retornaUsuarioActivo()
    if(!idUsuNotas){
        mensajeAyuda('el usuario no esta activo','alerta')
        return
    }
    document.getElementById('idUsuNot').value=idUsuNotas
    // let nombreUsu=nombreUsuarioActivoNotas(idUsuNotas)
    // document.getElementById('usuNot').value=nombreUsu
    nombreUsuarioActivoNotas(idUsuNotas)
}
function nombreUsuarioActivoNotas(idUsu){
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuarioSel = usuarios.find(usuario =>usuario.idUsu === idUsu);
    // return usuarioSel.usuario
    let usuario=usuarioSel.usuario
    document.getElementById('usuNot').value=usuario
}
function cargaNotasBItacora(){
    usuarioActivoNotas()
    cargarBitacoras();
    mostrarIdBitSeleccionado()
    // debugger
    actualizarTablaNotas()
    presentaTiempoNota()
    presentaIdNota()
    presentaTitulosNotas()
    presentaLugaresNotas()
    setInterval(() => {
        document.getElementById('horaNota').value = horaActual();
    }, 1000);
}
// -------------------------------- TIPOS ------------------
function grabaNuevoTipo() {
    let idUsu = document.getElementById('idUsuTip').value;
    // debe haber usuario
    if(!idUsu){
        // alert('falta id usuario')
        mensajeAyuda('falta id usuario','alerta')
        document.getElementById('idUsuTip').select();
        return
    }
    let tipos = JSON.parse(localStorage.getItem('tipos'));
    let idTipo = indiceAhora();
    // debe haber tipo
    let tipo = document.getElementById('tipo').value;
    if(!tipo){
        // alert('falta tipo')
        mensajeAyuda('falta tipo','alerta')
        document.getElementById('tipo').select();
        return
    }
    // Verificar si el tipo ya existe en el local storage
    if (tipos) {
        let tipoExistente = tipos.find(function(t) {
            return t.tipo === tipo;
        });
        if (tipoExistente) {
            alert('El tipo ya existe. Por favor, ingresa uno nuevo.');
            mensajeAyuda('El tipo ya existe. Por favor, ingresa uno nuevo.','alerta');
            document.getElementById('tipo').select()
            return;
        }
    } else {
        tipos = [];
    }
    // Obtener el resto de los valores del formulario
    let fechaTipo = document.getElementById('fechaTipo').value;
    let horaTipo = document.getElementById('horaTipo').value;
    let detalle = document.getElementById('detalle').value;
    // Crear el nuevo registro
    let nuevoRegistro = {
        idUsu: idUsu,
        fechaTipo: fechaTipo,
        horaTipo: horaTipo,
        idTipo: idTipo,
        tipo: tipo,
        detalle: detalle
    };
    // Agregar el registro al array de tipos
    tipos.push(nuevoRegistro);
    // Guardar el array actualizado en el local storage
    localStorage.setItem('tipos', JSON.stringify(tipos));
    limpiaFormTipo();
    mostrarRegistrosTipos();
}
function editarRegistroTipo(registro) {
    // Llenar el formulario con los datos del registro
    document.getElementById('idUsuTip').value = registro.idUsu;
    document.getElementById('idTipo').value = registro.idTipo;
    document.getElementById('fechaTipo').value = registro.fechaTipo;
    document.getElementById('horaTipo').value = registro.horaTipo;
    document.getElementById('tipo').value = registro.tipo;
    document.getElementById('detalle').value = registro.detalle;
    // Guardar el registro en edición en el local storage
    localStorage.setItem('registroEditandoTipo', JSON.stringify(registro));
}
function grabaEdicionTipo() {
    let tipos = JSON.parse(localStorage.getItem('tipos'));
    let idTipo = document.getElementById('idTipo').value;
    // Verificar si se está editando un registro existente
    let registroEditandoTipo = JSON.parse(localStorage.getItem('registroEditandoTipo'));
    if (registroEditandoTipo) {
      // Encontrar el índice del registro editando en el array de tipos
      let index = tipos.findIndex(function(t) {
        return t.idTipo === registroEditandoTipo.idTipo;
      });

      if (index !== -1) {
        // Obtener el tipo ingresado en el formulario
        let tipoIngresado = document.getElementById('tipo').value;
        // Verificar si el tipo ingresado ya existe en el local storage
        let tipoExistente = tipos.find(function(t, i) {
          return t.tipo === tipoIngresado && i !== index;
        });
        if (tipoExistente) {
            //alert('El tipo ya existe. Por favor, ingresa uno nuevo.');
            mensajeayuda('El tipo ya existe. Por favor, ingresa uno nuevo.')
            return;
        }
        // Actualizar los datos del formulario en el registro existente
        tipos[index].idUsu = document.getElementById('idUsuTip').value;
        tipos[index].fechaTipo = document.getElementById('fechaTipo').value;
        tipos[index].horaTipo = document.getElementById('horaTipo').value;
        tipos[index].tipo = tipoIngresado;
        tipos[index].detalle = document.getElementById('detalle').value;
        // Guardar el array actualizado en el local storage
        localStorage.setItem('tipos', JSON.stringify(tipos));
        // Eliminar el registro en edición del local storage
        localStorage.removeItem('registroEditandoTipo');
      }
    }

    limpiaFormTipo();
    mostrarRegistrosTipos();
}
function grabarRegistroTipo() {
   let idTipo = document.getElementById('idTipo').value;
   if (idTipo !== '') {
     grabaEdicionTipo();
   } else {
     grabaNuevoTipo();
   }
   usuarioActivoTipos()
}
function limpiaFormTipo(){
   document.getElementById('idUsuTip').value = '';
   document.getElementById('tipo').value = '';
   document.getElementById('idTipo').value = '';
   document.getElementById('detalle').value = '';
   document.getElementById('tipo').select()
}
function mostrarRegistrosTipos() {
    // Obtener los registros del local storage
    let tipos = localStorage.getItem('tipos');
    if (tipos) {
      tipos = JSON.parse(tipos);
      // Crear la tabla
      let tablatipos = document.createElement('table');
      // Crear la fila de cabecera y las celdas de título
      let filaCabecera = document.createElement('tr');

      let celdaIdUsuTitulo = document.createElement('th');
      celdaIdUsuTitulo.textContent = 'ID Usuario';
      filaCabecera.appendChild(celdaIdUsuTitulo);

      let celdaFechaTipoTitulo = document.createElement('th');
      celdaFechaTipoTitulo.textContent = 'Fecha Tipo';
      filaCabecera.appendChild(celdaFechaTipoTitulo);

      let celdaHoraTipoTitulo = document.createElement('th');
      celdaHoraTipoTitulo.textContent = 'Hora Tipo';
      filaCabecera.appendChild(celdaHoraTipoTitulo);

      let celdaIdTipoTitulo = document.createElement('th');
      celdaIdTipoTitulo.textContent = 'ID Tipo';
      filaCabecera.appendChild(celdaIdTipoTitulo);

      let celdaTipoTitulo = document.createElement('th');
      celdaTipoTitulo.textContent = 'Tipo';
      filaCabecera.appendChild(celdaTipoTitulo);

      let celdaDetalleTitulo = document.createElement('th');
      celdaDetalleTitulo.textContent = 'Detalle';
      filaCabecera.appendChild(celdaDetalleTitulo);

      let celdaEditarTitulo = document.createElement('th');
      celdaEditarTitulo.textContent = 'Editar';
      filaCabecera.appendChild(celdaEditarTitulo);

      let celdaEliminarTitulo = document.createElement('th');
      celdaEliminarTitulo.textContent = 'Eliminar';
      filaCabecera.appendChild(celdaEliminarTitulo);
      tablatipos.appendChild(filaCabecera);
      // Crear las filas y las celdas de datos
      tipos.forEach(function(t) {
        let fila = document.createElement('tr');
        let celdaIdUsu = document.createElement('td');
        celdaIdUsu.textContent = t.idUsu;
        fila.appendChild(celdaIdUsu);
        let celdaFechaTipo = document.createElement('td');
        celdaFechaTipo.textContent = t.fechaTipo;
        fila.appendChild(celdaFechaTipo);
        celdaFechaTipo.setAttribute('class','columnaFecha')
        let celdaHoraTipo = document.createElement('td');
        celdaHoraTipo.textContent = t.horaTipo;
        fila.appendChild(celdaHoraTipo);
        celdaHoraTipo.setAttribute('class','columnaHora')
        let celdaIdTipo = document.createElement('td');
        celdaIdTipo.textContent = t.idTipo;
        fila.appendChild(celdaIdTipo);
        let celdaTipo = document.createElement('td');
        celdaTipo.textContent = t.tipo;
        fila.appendChild(celdaTipo);

        let celdaDetalle = document.createElement('td');
        celdaDetalle.textContent = t.detalle;
        fila.appendChild(celdaDetalle);

        let celdaEditar = document.createElement('td');
        let botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.setAttribute("class","btnEdita")
        botonEditar.addEventListener('click', function() {
          editarRegistroTipo(t);
        });
        celdaEditar.appendChild(botonEditar);
        fila.appendChild(celdaEditar);
        let celdaEliminar = document.createElement('td');
        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.setAttribute("class","btnElimina")
        botonEliminar.addEventListener('click', function() {
          eliminarRegistroTipo(t);
        });
        celdaEliminar.appendChild(botonEliminar);
        fila.appendChild(celdaEliminar);

        tablatipos.appendChild(fila);
      });
      // Mostrar la tabla en el documento
      let contenedorTabla = document.getElementById('tablaRegistrosTipos');
      contenedorTabla.innerHTML = '';
      contenedorTabla.appendChild(tablatipos);
    }
}
function eliminarRegistroTipo(registro) {
    // Obtener los registros del local storage
    let tipos = localStorage.getItem('tipos');
    if (tipos) {
      tipos = JSON.parse(tipos);

      // Eliminar el registro del array
      tipos = tipos.filter(function(t) {
        return t.tipo !== registro.tipo;
      });
      // Guardar el array actualizado en el local storage
      localStorage.setItem('tipos', JSON.stringify(tipos));
      // Actualizar la tablatipos
      mostrarRegistrosTipos();
    }
}
function presentaTiemposTipo(){
   // Obtener la fecha y hora actual
   let fechaHoraActual = new Date();
   let fechaActual = fechaHoraActual.toISOString().split('T')[0];
   // let horaActual = fechaHoraActual.toTimeString().split(' ')[0];
   // Establecer la fecha y hora actual por defecto en los campos de entrada
   document.getElementById('fechaTipo').value = fechaActual;
   // document.getElementById('horaTipo').value = horaActual;
}
function mostrarHoraActualTipo() {
    let fechaHoraActual = new Date();
    let opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    let horaActual = fechaHoraActual.toLocaleTimeString('es-ES', opciones);
    document.getElementById('horaTipo').value = horaActual;
}
function cargaTipos(){
    presentaTiemposTipo()
    mostrarRegistrosTipos();
    document.getElementById('tipo').select()
    usuarioActivoTipos()
}
function usuarioActivoTipos(){
    let idUsuTipos=retornaUsuarioActivo()
    if(!idUsuTipos){
        mensajeAyuda('el usuario no esta activo','alerta')
        return
    }
    document.getElementById('idUsuTip').value=idUsuTipos
    // nombreUsuarioActivoNotas(idUsuTip)
}
function guardarArchivoTipos() {
    // Obtener los datos de tipos desde el localStorage
    let tipos = localStorage.getItem('tipos');
    // Crear un objeto Blob con los datos JSON
    let blob = new Blob([tipos], { type: 'application/json' });
    // Crear un enlace de descarga para el archivo
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    let extension=indiceAhora()
    let nombreArchivo='tipos'+extension+'.json'
    a.download = nombreArchivo;
    // Agregar el enlace al documento y hacer clic en él para descargar el archivo
    document.body.appendChild(a);
    a.click();
    // Eliminar el enlace después de la descarga
    document.body.removeChild(a);
}
// ----------------- ARTICULOS ------------------------
function grabaNuevoArticulo() {
    let idUsu = document.getElementById('idUsuArt').value;
    let idTipo = document.getElementById('idTipoArt').value;
    let idArticulo = indiceAhora();
    let articulo = document.getElementById('articulo').value;
    let detalle = document.getElementById('detalleart').value;
    let nuevoArticulo = {
        idUsu: idUsu,
        fecha: document.getElementById('fechaArticulo').value,
        hora: document.getElementById('horaArticulo').value,
        idTipo: idTipo,
        idArticulo: idArticulo,
        articulo: articulo,
        detalle: detalle
    };
    let articulos = JSON.parse(localStorage.getItem('articulos')) || [];
    articulos.push(nuevoArticulo);
    localStorage.setItem('articulos', JSON.stringify(articulos));
    mostrarRegistrosArticulos();
    limpiaFormArticulo();
}
function grabaEdicionArticulo() {
    let idUsu = document.getElementById('idUsuArt').value;
    let idTipo = document.getElementById('idTipoArt').value;
    let idArticulo = document.getElementById('idArticulo').value;
    let articulo = document.getElementById('articulo').value;
    let detalle = document.getElementById('detalleart').value;
    let articulos = JSON.parse(localStorage.getItem('articulos')) || [];
    let articuloIndex = articulos.findIndex(function (art) {
        return art.idArticulo === idArticulo;
    });
    if (articuloIndex !== -1) {
        articulos[articuloIndex].idUsu = idUsu;
        articulos[articuloIndex].idTipo = idTipo;
        articulos[articuloIndex].articulo = articulo;
        articulos[articuloIndex].detalle = detalle;
        localStorage.setItem('articulos', JSON.stringify(articulos));
        mostrarRegistrosArticulos();
        limpiaFormArticulo();
    }
}
function grabaRegistroArticulo() {
    let idArticulo = document.getElementById('idArticulo').value;
    if (idArticulo !== '') {
        grabaEdicionArticulo();
    } else {
        grabaNuevoArticulo();
    }
    usuarioActivoArticulos()
}
function limpiaFormArticulo() {
    document.getElementById('idArticulo').value = '';
    document.getElementById('articulo').value = '';
    document.getElementById('detalleart').value = '';
    mostrarIdTipo()
    document.getElementById('articulo').select()
}
function editaRegistroArticulo(registro) {
    document.getElementById('idUsuArt').value = registro.idUsu;
    let idTipo=registro.idTipo
    document.getElementById('idTipoArt').value = idTipo;
    presentaIdTipo(idTipo)
    document.getElementById('idArticulo').value = registro.idArticulo;
    document.getElementById('articulo').value = registro.articulo;
    document.getElementById('detalleart').value = registro.detalle;
}
function mostrarRegistrosArticulos() {
    let tblArticulos = document.getElementById('tblArticulos');
    let tbody = tblArticulos.querySelector('tbody');
    tbody.innerHTML = '';
    let articulos = JSON.parse(localStorage.getItem('articulos')) || [];
    articulos.forEach(function (articulo) {
        let row = document.createElement('tr');
        let idUsuCell = document.createElement('td');
        idUsuCell.textContent = articulo.idUsu;
        row.appendChild(idUsuCell);
        let idTipoCell = document.createElement('td');
        idTipoCell.textContent = articulo.idTipo;
        row.appendChild(idTipoCell);
        let idArticuloCell = document.createElement('td');
        idArticuloCell.textContent = articulo.idArticulo;
        row.appendChild(idArticuloCell);
        let articuloCell = document.createElement('td');
        articuloCell.textContent = articulo.articulo;
        row.appendChild(articuloCell);
        let detalleCell = document.createElement('td');
        detalleCell.textContent = articulo.detalle;
        row.appendChild(detalleCell);
        let fechaCell = document.createElement('td');
        fechaCell.textContent = articulo.fecha;
        fechaCell.setAttribute('class','columnaFecha')
        row.appendChild(fechaCell);
        let horaCell = document.createElement('td');
        horaCell.textContent = articulo.hora;
        horaCell.setAttribute('class','columnaHora')
        row.appendChild(horaCell);

        let edicionesCell = document.createElement('td');
        let editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.setAttribute("class","btnEdita")
        editarBtn.addEventListener('click', function () {
            editaRegistroArticulo(articulo);
        });
        edicionesCell.appendChild(editarBtn);
        row.appendChild(edicionesCell);
        
        let eliminanCell = document.createElement('td');
        let eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.setAttribute("class","btnElimina")
        eliminarBtn.addEventListener('click', function () {
            eliminarRegistroArticulo(articulo);
        });
        eliminanCell.appendChild(eliminarBtn);
        row.appendChild(eliminanCell);

        tbody.appendChild(row);
    });
}
function eliminarRegistroArticulo(registro) {
    let articulos = JSON.parse(localStorage.getItem('articulos')) || [];
    let articuloIndex = articulos.findIndex(function (art) {
    return art.idArticulo === registro.idArticulo;
    });
    if (articuloIndex !== -1) {
    articulos.splice(articuloIndex, 1);
    localStorage.setItem('articulos', JSON.stringify(articulos));
    mostrarRegistrosArticulos();
    }
}
function presentaTiemposArticulo() {
    let fechaHoraActual = new Date();
    let fechaActual = fechaHoraActual.toISOString().split('T')[0];
    document.getElementById('fechaArticulo').value = fechaActual;
}
function mostrarHoraActualArt() {
    let horaInput = document.getElementById('horaArticulo');
    function actualizarHora() {
    let fechaHoraActual = new Date();
    let opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    let horaActual = fechaHoraActual.toLocaleTimeString('es-ES', opciones);
    horaInput.value = horaActual;
    }
    setInterval(actualizarHora, 1000);
}
function crearComboBoxTipos() {
    // Obtener la referencia al elemento ComboBox
    let comboBox = document.getElementById('listaTipos');
    comboBox.value=''
    // Obtener los datos de tipos desde el localStorage
    let tipos = JSON.parse(localStorage.getItem('tipos'));
    if(!tipos){
        mensajeAyuda("No hay Tipos en Local","alerta")
        return
    }
    // Recorrer la lista de tipos y agregar opciones al ComboBox
    for (let i = 0; i < tipos.length; i++) {
    let option = document.createElement('option');
    option.value = tipos[i].idTipo;
    option.text = tipos[i].tipo;
    comboBox.appendChild(option);
    }
    // Simular un evento de cambio en el ComboBox
    let event = new Event('change');
    comboBox.dispatchEvent(event);
}
function mostrarIdTipo() {
    // Obtener la referencia al elemento ComboBox y al cuadro de texto
    let comboBox = document.getElementById('listaTipos');
    let idTipoInput = document.getElementById('idTipoArt');
    // Obtener el idTipo seleccionado
    let idTipoSeleccionado = comboBox.value;
    // Mostrar el idTipo en el cuadro de texto
    idTipoInput.value = idTipoSeleccionado;
}
function presentaIdTipo(idTipo) {
    // Obtener la referencia al elemento ComboBox
    let comboBox = document.getElementById('listaTipos');
    // Buscar el tipo correspondiente al idTipo en el ComboBox
    let option = Array.from(comboBox.options).find(function(option) {
    return option.value === idTipo;
    });
    // Seleccionar el tipo correspondiente en el ComboBox
    if (option) {
    option.selected = true;
    }
}
function cargaArticulos(){
    crearComboBoxTipos();
    mostrarHoraActualArt();
    presentaTiemposArticulo();
    mostrarRegistrosArticulos()
    usuarioActivoArticulos()
}
function usuarioActivoArticulos(){
    let idUsu=retornaUsuarioActivo()
    if(!idUsu){
        mensajeAyuda('el usuario no esta activo','alerta')
        return
    }
    document.getElementById('idUsuArt').value=idUsu
}
// ------------ INVENTARIOS --------------
// Función para grabar un nuevo inventario
function grabaNuevoInventario() {
    let idInventario = document.getElementById('idInventario').value;
    let inventarios = JSON.parse(localStorage.getItem('inventarios')) || [];
  
    // Verificar si ya existe un inventario con el mismo ID
    let inventarioExistente = inventarios.find(function(inventario) {
      return inventario.idInventario === idInventario;
    });
  
    if (inventarioExistente) {
      // Mostrar mensaje de error o realizar alguna acción
    //   alert('Ya existe un inventario con el mismo ID');
      mensajeAyuda('Ya existe un inventario con el mismo ID','alerta');
      return;
    }
  
    let idUsuInv = document.getElementById('idUsuInv').value;
    let fechaInv = document.getElementById('fechaInv').value;
    let horaInv = document.getElementById('horaInv').value;
    let inventario = document.getElementById('inventario').value;
    let detalleInv = document.getElementById('detalleInv').value;
  
    // Verificar si ya existe un inventario con el mismo nombre
    let inventarioNombreExistente = inventarios.find(function(inventarioExistente) {
      return inventarioExistente.inventario === inventario;
    });
  
    if (inventarioNombreExistente) {
        // Mostrar mensaje de error o realizar alguna acción
        //alert('Ya existe un inventario con el mismo nombre');
        mensajeayuda('Ya existe un inventario con el mismo nombre','alerta');
        return;
    }
  
    idInventario = indiceAhora();
  
    inventarios.push({
      idUsu: idUsuInv,
      fecha: fechaInv,
      hora: horaInv,
      idInventario: idInventario,
      inventario: inventario,
      detalle: detalleInv
    });
  
    localStorage.setItem('inventarios', JSON.stringify(inventarios));
  
    // Actualizar la tabla en pantalla
    mostrarRegistrosInventarios();
    limpiaFormInventario();
}
// Función para grabar una edición de inventario
function grabaEdicionInventario() {
      let idInventario = document.getElementById('idInventario').value;
      let nuevoInventario = document.getElementById('inventario').value;
      let inventario = document.getElementById('inventario').value
      let inventarios = JSON.parse(localStorage.getItem('inventarios')) || [];
  
      // Verificar si ya existe otro inventario con el mismo nombre
      let inventarioExistente = inventarios.find(function(inventario) {
          return inventario.inventario === nuevoInventario && inventario.idInventario !== idInventario;
      });
  
      if (inventarioExistente) {
            // Mostrar mensaje de error o realizar alguna acción
            //   alert('Ya existe otro inventario con el mismo nombre');
            mensajeAyuda('Ya existe otro inventario con el mismo nombre','alerta');
            return;
      }
  
    // Buscar el inventario a editar y realizar los cambios necesarios
    for (let i = 0; i < inventarios.length; i++) {
      if (inventarios[i].idInventario === idInventario) {
        inventarios[i].idUsu = document.getElementById('idUsuInv').value;
        inventarios[i].fecha = document.getElementById('fechaInv').value;
        inventarios[i].hora = document.getElementById('horaInv').value;
        inventarios[i].inventario = inventario;
        inventarios[i].detalle = document.getElementById('detalleInv').value;
        break;
      }
    }
  
    // Actualizar el inventario en el local storage
    localStorage.setItem('inventarios', JSON.stringify(inventarios));
  
    // Actualizar la tabla en pantalla
    mostrarRegistrosInventarios();
    limpiaFormInventario();
}
// Función para grabar un registro de inventario
function grabaRegistroInventario() {
    let idInventario = document.getElementById('idInventario').value;
    if (idInventario !== '') {
      grabaEdicionInventario();
    } else {
      grabaNuevoInventario();
    }
}
// Función para limpiar el formulario de inventario
function limpiaFormInventario() {
    usuarioActivoInventarios()
    document.getElementById('idInventario').value = '';
    document.getElementById('inventario').value = '';
    document.getElementById('detalleInv').value = '';
    document.getElementById('inventario').select()
}
// Función para presentar la fecha actual en el formulario
function presentaTiemposInv() {
    let fechaHoraActual = new Date();
    let fechaActual = fechaHoraActual.toISOString().split('T')[0];
    document.getElementById('fechaInv').value = fechaActual;
}
// Función para mostrar la hora actual en el formulario
function mostrarHoraActualInv() {
      setInterval(function() {
          let fechaHoraActual = new Date();
          let opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
          let horaActual = fechaHoraActual.toLocaleTimeString('es-ES', opciones);
          document.getElementById('horaInv').value = horaActual;
      }, 1000); // Actualiza la hora cada segundo
}
// Función para cargar los inventarios al inicio
function cargaInventarios() {
        presentaTiemposInv();
        mostrarRegistrosInventarios();
        document.getElementById('inventario').select();
}
// Función para editar un registro de inventario
function editaRegistroInventario(registro) {
        document.getElementById('idUsuInv').value = registro.idUsu;
        document.getElementById('fechaInv').value = registro.fecha;
        document.getElementById('horaInv').value = registro.hora;
        document.getElementById('idInventario').value = registro.idInventario;
        document.getElementById('inventario').value = registro.inventario;
        document.getElementById('detalleInv').value = registro.detalle;
}
function actualizaTransaccionInventario(idTransInv) {
    // Obtener el registro completo del localstorage
    let transaccionesInv = JSON.parse(localStorage.getItem('transaccionesInv'));
    // Encontrar el índice del registro con el idTransInv especificado
    const index = transaccionesInv.findIndex(transaccion => transaccion.idTransInv === idTransInv);
    // Verificar si se encontró el registro
    if (index !== -1) {
      // Actualizar los datos del registro con la nueva información
      transaccionesInv[index] = {

        ...transaccionesInv[index],
        ...data
      };
  
      // Guardar los cambios en el localstorage
      localStorage.setItem('transaccionesInv', JSON.stringify(transaccionesInv));
      console.log('Registro actualizado exitosamente.');
    } else {
      console.log('No se encontró el registro con el ID de transacción especificado.');
    }
}
// Función para mostrar todos los registros de inventario en la tabla
function mostrarRegistrosInventarios() {
    let inventarios = JSON.parse(localStorage.getItem('inventarios')) || [];
    let tableBody = document.querySelector('#tblInventarios tbody');
    tableBody.innerHTML = '';
    for (let i = 0; i < inventarios.length; i++) {
        let row = tableBody.insertRow();
        let idUsuCell = row.insertCell();
        idUsuCell.textContent = inventarios[i].idUsu;
        let fechaCell = row.insertCell();
        fechaCell.textContent = inventarios[i].fecha;
        fechaCell.setAttribute('class','columnaFecha')
        let horaCell = row.insertCell();
        horaCell.textContent = inventarios[i].hora;
        horaCell.setAttribute('class','columnaHora')
        let idInventarioCell = row.insertCell();
        idInventarioCell.textContent = inventarios[i].idInventario;
        let inventarioCell = row.insertCell();
        inventarioCell.textContent = inventarios[i].inventario;
        let detalleCell = row.insertCell();
        detalleCell.textContent = inventarios[i].detalle;
        let edicionesCell = row.insertCell();
        let editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.setAttribute("class","btnEdita")
        editarBtn.addEventListener('click', function() {
                editaRegistroInventario(inventarios[i]);
        });
        edicionesCell.appendChild(editarBtn);
        row.appendChild(edicionesCell);
        let eliminanCell = document.createElement('td');
        let eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.setAttribute("class","btnElimina")
        eliminarBtn.addEventListener('click', function() {
                eliminarRegistroInventario(inventarios[i]);
        });
        eliminanCell.appendChild(eliminarBtn);
        row.appendChild(eliminanCell);
        // tbody.appendChild(row);
    }
}
// Función para eliminar un registro de inventario
function eliminarRegistroInventario(registro) {
    let inventarios = JSON.parse(localStorage.getItem('inventarios')) || [];
    // Filtrar los inventarios y eliminar el registro correspondiente
    inventarios = inventarios.filter(function(inventario) {
      return inventario.idInventario !== registro.idInventario;
    });
    // Actualizar el inventario en el local storage
    localStorage.setItem('inventarios', JSON.stringify(inventarios));
    // Actualizar la tabla en pantalla
    mostrarRegistrosInventarios();
}
// Función que se ejecuta al cargar la página
function cargaInventario() {
    mostrarHoraActualInv();
    presentaTiemposInv();
    mostrarRegistrosInventarios();
    usuarioActivoInventarios();
}
function usuarioActivoInventarios(){
    let idUsu=retornaUsuarioActivo()
    if(!idUsu){
        mensajeAyuda('el usuario no esta activo','alerta')
        return
    }
    document.getElementById('idUsuInv').value=idUsu
}
// ----------------- TRANSACCION INVENTARIOS -------
// ----------CARGA INICIAL ---------
function ejecutaIdInventario(id){
    // alert(id)
    console.log('Id'+id);
} 
function darHoraTransInv() {
    let horaInput = document.getElementById('horaTransInv');
    let fecha = new Date();
    let hora = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    horaInput.value = hora;
}
function darTiempoTransInv() {
    let fecha = new Date();
    let opciones = { month: '2-digit', day: '2-digit', year: 'numeric' };
    let fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
    let fechaInput = document.getElementById('fechaTransInv');
    let horaInput = document.getElementById('horaTransInv');
    fechaInput.value = fechaFormateada;
    horaInput.value = fecha.toLocaleTimeString();
}
function calcularTotalTrans() {
    let cantidad = document.getElementById('cantidadTransInv').value;
    let valor = document.getElementById('valorTransInv').value;
    let total = cantidad * valor;
    totalPeso=formatoMoneda(total)
    document.getElementById('totalTransInv').value = totalPeso;
}
function usuarioActivoTransInv() {
    // Obtener el usuario activo del local storage
    let idUsu=retornaUsuarioActivo()
      if(!idUsu){
          mensajeAyuda('el usuario no esta activo','alerta')
          return null
      }
      // document.getElementById('idUsuInv').value=idUsu
      return idUsu 
}
function actualizarTablaTransacciones() {
    // Obtener los datos de local storage
    let transacciones = JSON.parse(localStorage.getItem('transaccionesInv'));
    if (!transacciones) {
      return;
    }
    // Obtener el cuerpo de la tabla
    let tabla = document.getElementById('tablaTransacciones');
    let tbody = tabla.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    // Llenar la tabla con las transacciones
    transacciones.forEach(transaccion => {
      let fila = document.createElement('tr');
      fila.id = transaccion.idTransInv; // Asignar el ID de la transacción a la fila
      let idTransInv = document.createElement('td');
      idTransInv.textContent = transaccion.idTransInv;
      fila.appendChild(idTransInv);
      let idUsu = document.createElement('td');
      idUsu.textContent = transaccion.idUsu;
      fila.appendChild(idUsu);
      let idInventario = document.createElement('td');
      idInventario.textContent = transaccion.idInventario;
      fila.appendChild(idInventario);
      let fecha = document.createElement('td');
      fecha.textContent = transaccion.fecha;
      // fecha.setAttribute('class','columnaFecha')
      // fecha.style.width = '50px !important'; // Ancho de la columna
      // fecha.setAttribute('style', 'width: 100px !important'); // Ancho de la columna
      fila.appendChild(fecha);
      let hora = document.createElement('td');
      hora.textContent = transaccion.hora;
      // hora.setAttribute('class','columnaHora')
      fila.appendChild(hora);
      let idTipo = document.createElement('td');
      idTipo.textContent = transaccion.idTipo;
      fila.appendChild(idTipo);
      let tipo = document.createElement('td');
      tipo.textContent = transaccion.tipo;
      fila.appendChild(tipo);
      let idArticulo = document.createElement('td');
      idArticulo.textContent = transaccion.idArticulo;
      fila.appendChild(idArticulo);
      let articulo = document.createElement('td');
      articulo.textContent = transaccion.articulo;
      fila.appendChild(articulo);
      let cantidad = document.createElement('td');
      cantidad.textContent = transaccion.cantidad;
      fila.appendChild(cantidad);
      let valor = document.createElement('td');
      valor.textContent = transaccion.valor;
      fila.appendChild(valor);
      let total = document.createElement('td');
      total.textContent = transaccion.total;
      fila.appendChild(total);
      let detalle = document.createElement('td');
      detalle.textContent = transaccion.detalle;
      fila.appendChild(detalle);
      let editar = document.createElement('td');
      let botonEditar = document.createElement('button');
      botonEditar.textContent = 'Editar';
      botonEditar.setAttribute("class","btnEdita")
      botonEditar.onclick = function() {
        // editarTransInv(transaccion.idTransInv);
        // debugger
        editandoRegTransInv(transaccion.idTransInv)
      };
      editar.appendChild(botonEditar);
      fila.appendChild(editar);
      let eliminar = document.createElement('td');
      let botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.setAttribute("class","btnElimina")

      botonEliminar.onclick = function() {
        eliminarTransInv(transaccion.idTransInv);
      };
      eliminar.appendChild(botonEliminar);
      fila.appendChild(eliminar);
      tbody.appendChild(fila);
    });
}
function resumenTransInv(){
      // hace visible la tabla
      let elemento = document.getElementById('tablaTransResumen'); 
      elemento.style.display = "block";
      // elemento.style.width = 'background-color: #191b19;';
      elemento.setAttribute('style', 'width: 100vw !important;background-color:  coral'); // Ancho de la columna

      let idInv=document.getElementById('idInventarioTrans').value
      let tabla = document.getElementById('tablaTransResumen');
      let tbody = tabla.getElementsByTagName('tbody')[0];
      tbody.innerHTML = '';

      let fila = document.createElement('tr');
      let idUsu = document.createElement('td');
      idUsu.textContent = document.getElementById('idUsuInvTrans').value;
      fila.appendChild(idUsu);

      let idInventario = document.createElement('td');
      idInventario.textContent = document.getElementById('idInventarioTrans').value;
      fila.appendChild(idInventario);

      let cantidad = document.createElement('td');
      // let cantidadTotal=10
      cantidad.textContent = totalTotalInventario(idInv)[1]
      fila.appendChild(cantidad);

      let valor = document.createElement('td');
      // let valorTotal=1000
      valor.textContent = totalTotalInventario(idInv)[2]
      fila.appendChild(valor);

      let total = document.createElement('td');
      let totalTotal=totalTotalInventario(idInv)[0]
      total.textContent = totalTotal;
      fila.appendChild(total);
      tbody.appendChild(fila);
}
function totalTotalInventario(idInventario){
    let transacciones = JSON.parse(localStorage.getItem('transaccionesInv'));
    if(!transacciones){
        mensajeAyuda('Aun no hay transacciones en Local','alerta')
        return [0,0,0]
    }
    let largo=transacciones.length
    let tot=0
    let totPeso=0
    let cant=0
    let val=0
    for(i=0;i<largo;i++){
      if(transacciones[i].idInventario===idInventario){
        tot=tot+(parseInt(transacciones[i].cantidad)*parseInt(transacciones[i].valor))
        cant=cant+parseInt(transacciones[i].cantidad)
        val=val+(parseInt(transacciones[i].valor)*parseInt(transacciones[i].cantidad))
      }
    }
    // val=formatNumber(val)
    tot=formatoMoneda(tot)
    return [tot,cant,val]
}
function eliminarTransInv(idTransaccion) {
    let idInventario=retornaIdInventario(idTransaccion)
    let fila = document.getElementById(idTransaccion);
    if (fila) {
      // Eliminar la fila de la tabla
      fila.remove();
    }
    // Obtener las transacciones del almacenamiento local
    let transacciones = JSON.parse(localStorage.getItem('transaccionesInv'));
    if (!transacciones) {
      return;
    }
    // Filtrar las transacciones para excluir la transacción con el ID especificado
    let transaccionesFiltradas = transacciones.filter(transaccion => transaccion.idTransInv !== idTransaccion);
    // Guardar las transacciones actualizadas en el almacenamiento local
    localStorage.setItem('transaccionesInv', JSON.stringify(transaccionesFiltradas));
    console.log("Transacción eliminada con ID: " + idTransaccion);
    // ELIMINA DE LA TABLA DINAMICA
    eliminaTransGenInventario(idInventario, idTransaccion)
}
function eliminaTransGenInventario(idInventario, idTransInv) {
    // Obtener los datos de local storage
    let gentransinventario = JSON.parse(localStorage.getItem('inventarios'+idInventario)) || [];
    // Filtrar el inventario para excluir el registro con el idInventario y idTransInv especificado
    gentransinventario = gentransinventario.filter(inventario => !(inventario.idInventario === idInventario && inventario.idTransInv === idTransInv));
    // Guardar los cambios en local storage
    localStorage.setItem('inventarios'+idInventario, JSON.stringify(gentransinventario));
}
function retornaIdInventario(idTransInv) {
    // Obtener los datos de local storage
    let transacciones = JSON.parse(localStorage.getItem('transaccionesInv')) || [];
    // Buscar el idInventario correspondiente al idTransInv especificado
    let transaccion = transacciones.find(transaccion => transaccion.idTransInv === idTransInv);
    // Retornar el idInventario si se encuentra la transacción, de lo contrario retornar null
    return transaccion ? transaccion.idInventario : null;
}
function filtroUsuarioInventario(idUsu, idInventario) {
    // Obtener el inventario del local storage
    const inventarios = JSON.parse(localStorage.getItem('inventarios'));
    // Verificar si existe algún registro en el inventario que coincida con los parámetros idUsu y idInventario
    const inventarioCorrespondiente = inventarios.find(inventario => inventario.idUsu === idUsu && inventario.idInventario === idInventario);
    // Devolver true si se encontró el registro correspondiente, de lo contrario, false
    return Boolean(inventarioCorrespondiente);
}
function editandoRegTransInv(idTransInvInput) {
    // Obtener los elementos por sus IDs
    const idTransInv = document.getElementById('idTransInv');
    const fechaTransInv = document.getElementById('fechaTransInv');
    const horaTransInv = document.getElementById('horaTransInv');
    const idUsuInvTrans = document.getElementById('idUsuInvTrans');
    const idInventarioTrans = document.getElementById('idInventarioTrans');
    const ListaTiposTrans = document.getElementById('ListaTiposTrans');
    const idTipoSelTrans = document.getElementById('idTipoSelTrans');
    const ListaArticulosTrans = document.getElementById('ListaArticulosTrans');
    const idArticuloSel = document.getElementById('idArticuloSel');
    const cantidadTransInv = document.getElementById('cantidadTransInv');
    const valorTransInv = document.getElementById('valorTransInv');
    const totalTransInv = document.getElementById('totalTransInv');
    const DetalleTransInv = document.getElementById('DetalleTransInv');
    // Obtener los datos del Local Storage
    const data = JSON.parse(localStorage.getItem('transaccionesInv'));
    // Buscar los datos para el ID especificado utilizando un ciclo for
    let selectedData;
    for (let i = 0; i < data.length; i++) {
      if (data[i].idTransInv === idTransInvInput) {
        selectedData = data[i];
        break;
      }
    }
    // Rellenar los campos con los datos obtenidos
    idTransInv.value = idTransInvInput;
    fechaTransInv.value = selectedData.fecha;
    horaTransInv.value = selectedData.hora;
    idUsuInvTrans.value = selectedData.idUsu;
    idInventarioTrans.value = selectedData.idInventario;
    idTipoSelTrans.value = selectedData.idTipo;
    presentaComboTipoTrans(idTipoSelTrans.value)
    llenarComboboxArticulos()
    // ListaTiposTrans.value = selectedData.tipo;//NO FUNCIONA ?
    idArticuloSel.value = selectedData.idArticulo;
    presentaComboArticuloTrans(idArticuloSel.value)
    // ListaArticulosTrans.value = selectedData.articulo; //no funciona
    cantidadTransInv.value = selectedData.cantidad;
    valorTransInv.value = selectedData.valor;
    totalTransInv.value = selectedData.total;
    DetalleTransInv.value = selectedData.detalle;
}
function cargaFormTransInv(){
      darTiempoTransInv();
      actualizarTablaTransacciones();
      darHoraTransInv();
      setInterval(darHoraTransInv, 1000);
      llenaComboInventarios()
      presentaIdUsuarioAct()
      cargarTiposYarticulos()
      simulaSeleccionListInvTrans()
}
function simulaSeleccionListInvTrans(){
        // Obtener el elemento del combobox
        let listaInventarios = document.getElementById("ListaInventariosTrans");
        // Crear un nuevo evento de tipo "change"
        let eventoChange = new Event("change");
        // Simular la activación del evento "onchange" en el combobox
        listaInventarios.dispatchEvent(eventoChange);
}
function llenaComboInventarios() {
    // Obtener los datos de local storage
    let inventarios = JSON.parse(localStorage.getItem('inventarios'));
    // Obtener los elementos del DOM
    let listaInventarios = document.getElementById('ListaInventariosTrans');
    let idInv = document.getElementById('idInventarioTrans');
    // Limpiar el combobox de inventarios
    listaInventarios.innerHTML = '';
    // Llenar el combobox con los inventarios
    inventarios.forEach(inventario => {
      let option = document.createElement('option');
      option.text = inventario.inventario;
      option.value = inventario.idInventario;
      listaInventarios.add(option);
    });
    // Mostrar el idInventario del primer elemento en el input
    idInv.value = inventarios[0].idInventario;
    // Actualizar el idInventario en el input al seleccionar un elemento del combobox
    listaInventarios.addEventListener('change', function() {
      idInv.value = this.value;
      elijiendoInventario(this.value);
    });
}
// graba y deriva a otras fx
function grabaTransaccionInventario() {
    // si esta vacio se esta ingresando nueva  
      let idTransInv = document.getElementById('idTransInv').value;
      if (idTransInv !== '') {
        actualizaStock()
        actualizaTransInventario()
        actualizarTablaTransacciones()
        cargarTiposYarticulos()
      } else {
        actualizaStock()
        grabaNuevaTransInv();
      }
}
function actualizaTransInventario() {
    // Obtener el ID de la transacción a actualizar
    const idTransInv = document.getElementById('idTransInv').value;
    // Obtener los datos del Local Storage
    let data = JSON.parse(localStorage.getItem('transaccionesInv'));
    // Encontrar el índice del registro a actualizar
    const index = data.findIndex(item => item.idTransInv === idTransInv);
    // Verificar si se encontró el registro
    if (index !== -1) {
      // Actualizar los valores del registro
      data[index].fecha = document.getElementById('fechaTransInv').value;
      data[index].hora = document.getElementById('horaTransInv').value;
      data[index].idUsu = document.getElementById('idUsuInvTrans').value;
      data[index].idInventario = document.getElementById('idInventarioTrans').value;
      data[index].idTipo = document.getElementById('idTipoSelTrans').value;
      data[index].idArticulo = document.getElementById('idArticuloSel').value;
      
      let listaTiposTrans = document.getElementById('ListaTiposTrans');
      let idTipo = document.getElementById('idTipoSelTrans').value;
      let tipo = listaTiposTrans.options[listaTiposTrans.selectedIndex]?.text;
      data[index].tipo = tipo;
      listaTiposTrans.value = idTipo
      
      let listaArticulosTrans = document.getElementById('ListaArticulosTrans');
      let idArticulo = document.getElementById('idArticuloSel').value;
      let articulo = listaArticulosTrans.options[listaArticulosTrans.selectedIndex]?.text;
      data[index].articulo = articulo;
      listaArticulosTrans.value=idArticulo

      data[index].cantidad = document.getElementById('cantidadTransInv').value;
      data[index].valor = document.getElementById('valorTransInv').value;
      data[index].total = document.getElementById('totalTransInv').value;
      data[index].detalle = document.getElementById('DetalleTransInv').value;
      // Guardar los datos actualizados en el Local Storage
      localStorage.setItem('transaccionesInv', JSON.stringify(data));
    } else {
      console.log('No se encontró el registro en el almacenamiento local.');
    }
}
function grabaNuevaTransInv() {
    // Obtener los datos del formulario
    let idUsu = document.getElementById('idUsuInvTrans').value
    let idInventario = document.getElementById('idInventarioTrans').value;
    // valida usuario inventario
    let validado=filtroUsuarioInventario(idUsu, idInventario)
    if(!validado){
      // mensajeAyuda('el usuario no ha creado este inventario','alerta')
      mensajeAyuda('el usuario no ha creado este inventario','alerta')
    //   alert('el usuario no ha creado este inventario')
      // alert("idUsu: "+idUsu,"idInventario: "+idInventario)
      return
      //id1308202393923 en manos de  
      //1308202393923 yonarev 
      //12082023150148 janvera
    } else {
        mensajeAyuda("idUsu: "+idUsu + " idInventario: "+idInventario,'alerta')
        // alert("idUsu: "+idUsu,"idInventario: "+idInventario)
    }
    let idTransInv = indiceAhora();
    let fecha = document.getElementById('fechaTransInv').value;
    let hora = document.getElementById('horaTransInv').value;
    let listaTiposTrans = document.getElementById('ListaTiposTrans');
    let tipo = listaTiposTrans.options[listaTiposTrans.selectedIndex].text;
    let idTipo = document.getElementById('idTipoSelTrans').value;
    let listaArticulos = document.getElementById('ListaArticulosTrans');
    let articulo = listaArticulos.options[listaArticulos.selectedIndex].text;
    let idArticulo = document.getElementById('idArticuloSel').value;
    // valida si ya existe articulo de el inventario
    let siExiste = siExisteArtInv(idInventario, idArticulo) 
    if(siExiste){
        mensajeAyuda('Ya esta este articulo en el inventario','alerta')
    //   alert('Ya esta este articulo en el inventario')
        document.getElementById('ListaArticulosTrans').focus()
        return
    }
    let cantidad = parseInt(document.getElementById('cantidadTransInv').value);
    let valor= parseInt(document.getElementById('valorTransInv').value);
    let total = cantidad * valor;
    let totalPeso=formatoPeso(total)
    let detalleNuevo="Con fecha "+fecha+" y hora: "+hora+" se ingreso"
    let detalle = document.getElementById('DetalleTransInv').value;
    // Crear la nueva transacción
    let nuevaTransaccion = {
      idUsu: idUsu,
      idTransInv: idTransInv,
      idInventario: idInventario,
      fecha: fecha,
      hora: hora,
      tipo: tipo,
      idTipo: idTipo,
      articulo: articulo,
      idArticulo: idArticulo,
      cantidad: cantidad,
      valor: valor,
      total: totalPeso,
      detalle: detalle
    };
    // Obtener las transacciones del local storage
    let transacciones = JSON.parse(localStorage.getItem('transaccionesInv')) || [];
    // Agregar la nueva transacción a la lista
    transacciones.push(nuevaTransaccion);
    // Guardar las transacciones actualizadas en el local storage
    localStorage.setItem('transaccionesInv', JSON.stringify(transacciones));
    //graba en inventario generado
    grabaGenInventario(idInventario, nuevaTransaccion)
    // Actualizar la tabla de transacciones
    actualizarTablaTransacciones();
    // Limpiar el formulario
    document.getElementById('idTransInv').value = '';
    document.getElementById('cantidadTransInv').value = '';
    document.getElementById('valorTransInv').value = '';
}
function elijiendoInventario(idInventario){
    let idUsu=document.getElementById('idUsuInvTrans').value
    let validado=validaUsuarioTransInv(idUsu, idInventario)
    if(!validado){
        mensajeAyuda('usted no tiene acceso a este inventario','alerta')
        //   alert('usted no tiene acceso a este inventario')
        let listaInventarios = document.getElementById("ListaInventariosTrans");
        // Establecer el índice del elemento seleccionado
        listaInventarios.selectedIndex = 0; // Cambiar el número 0 po
        //luego validar que el indice si le corresponda al usuario
        return
    }
    presentaTablaInvUsu(idInventario, idUsu)
    resumenTransInv()
}
function validaUsuarioTransInv(idUsu, idInventario) {
    // Obtener los registros de inventarios desde el local storage
    const inventarios = JSON.parse(localStorage.getItem('inventarios')) || [];
    // Buscar el registro de inventario que coincide con idInventario
    const inventarioEncontrado = inventarios.find(
      (inventario) => inventario.idInventario === idInventario
    );
    // Verificar si el inventario fue encontrado y si el idUsu coincide
    if (inventarioEncontrado && inventarioEncontrado.idUsu === idUsu) {
      console.log("El usuario tiene acceso al inventario")
      return true;
    } else {
      console.log("El usuario no tiene acceso al inventario")
      return false; 
    }
}
function siExisteArtInv(idInventario, idArticulo) {
    // Obtener los datos del local storage
    const transaccionesInv = JSON.parse(localStorage.getItem('transaccionesInv'));
    if(!transaccionesInv){
      return false
    }
    // Verificar si existe el artículo en el inventario
    const existeArticulo = transaccionesInv.some(transaccion => {
      return transaccion.idInventario === idInventario && transaccion.idArticulo === idArticulo;
    });
    return existeArticulo;
}
function cargarTiposYarticulos(){
    llenarComboboxTipos();
    llenarComboboxArticulos();
    // Actualizar los artículos al cambiar el tipo seleccionado
    document.getElementById('ListaTiposTrans').addEventListener('change', llenarComboboxArticulos);
    // Mostrar el idArticulo al seleccionar un artículo
    document.getElementById('ListaArticulosTrans').addEventListener('change', function() {
        document.getElementById('idArticuloSel').value = this.value;
    });
}
function grabaGenInventario(idInventario, data) {
    // Obtener los datos actuales del inventario (si existen)
    const inventarioActual = JSON.parse(localStorage.getItem('inventario' + idInventario)) || [];

    // Agregar la nueva transacción al inventario
    inventarioActual.push({
      idTransInv: data.idTransInv,
      idUsu: data.idUsu,
      idInventario: data.idInventario,
      fecha: data.fecha,
      hora: data.hora,
      idTipo: data.idTipo,
      tipo: data.tipo,
      idArticulo: data.idArticulo,
      articulo: data.articulo,
      cantidad: data.cantidad,
      valor: data.valor,
      total: data.total
    });

    // Guardar el inventario actualizado en el local storage
    localStorage.setItem('inventario' + idInventario, JSON.stringify(inventarioActual));
}
function llenarComboboxTipos() {
    // Obtener los datos de local storage
    let tipos = JSON.parse(localStorage.getItem('tipos'));
    // Obtener el combobox de tipos
    let listaTipos = document.getElementById('ListaTiposTrans');
    // Vaciar el combobox de tipos
    listaTipos.innerHTML = '';
    // Llenar el combobox de tipos
    tipos.forEach(tipo => {
      let option = document.createElement('option');
      option.text = tipo.tipo;
      option.value = tipo.idTipo;
      listaTipos.add(option);
    });
}
function presentaComboTipoTrans(idTipo) {
    let tipos = JSON.parse(localStorage.getItem('tipos'));
    let listaTipos = document.getElementById('ListaTiposTrans');

    for (let i = 0; i < tipos.length; i++) {
      if (tipos[i].idTipo === idTipo) {
        listaTipos.value = tipos[i].idTipo;
        break;
      }
    }
}
function presentaComboArticuloTrans(idArticulo) {
    let articulos = JSON.parse(localStorage.getItem('articulos'));
    let listaArticulos = document.getElementById('ListaArticulosTrans');

    for (let i = 0; i < articulos.length; i++) {
      if (articulos[i].idArticulo === idArticulo) {
        listaArticulos.value = articulos[i].idArticulo;
        break;
      }
    }
}
function llenarComboboxArticulos() {
    // Obtener los datos de local storage
    let articulos = JSON.parse(localStorage.getItem('articulos'));
    // Obtener los elementos del DOM
    let listaTipos = document.getElementById('ListaTiposTrans');
    let idTipoSel = document.getElementById('idTipoSelTrans');
    let listaArticulos = document.getElementById('ListaArticulosTrans');
    let idArticuloSel = document.getElementById('idArticuloSel');
    // Limpiar el combobox de artículos
    listaArticulos.innerHTML = '';
    // Obtener el idTipo seleccionado
    let idTipo = listaTipos.value;
    // Filtrar los artículos por el idTipo seleccionado
    let articulosFiltrados = articulos.filter(articulo => articulo.idTipo === idTipo);
    // Llenar el combobox de artículos con los artículos filtrados
    articulosFiltrados.forEach(articulo => {
      let option = document.createElement('option');
      option.text = articulo.articulo;
      option.value = articulo.idArticulo;
      listaArticulos.add(option);
    });
    // Mostrar el idTipo en el input correspondiente
    idTipoSel.value = idTipo;
    // Mostrar el idArticulo del primer artículo en el input correspondiente
    idArticuloSel.value = articulosFiltrados.length > 0 ? articulosFiltrados[0].idArticulo : '';
}
function presentaTablaInvUsu(idInventario, idUsu) {
    // Obtener los datos del Local Storage
    const data = JSON.parse(localStorage.getItem('transaccionesInv'));
    if(!data){
        return
    }
    // Filtrar las transacciones que coinciden con el idInventario y el idUsu
    const transacciones = data.filter(item => item.idInventario === idInventario && item.idUsu === idUsu);
    // Llamar a la función tablaInvUsu con los resultados
    if(transacciones.length===0){
    //   alert('no hay transacciones aun de este inventario')
      mensajeAyuda('no hay transacciones aun de este inventario','alerta')
    }
    //------------ aki
    if (!transacciones) {
      return;
    }
    // Obtener el cuerpo de la tabla
    let tabla = document.getElementById('tablaTransacciones');
    let tbody = tabla.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    // Llenar la tabla con las transacciones
    transacciones.forEach(transaccion => {
      let fila = document.createElement('tr');
      fila.id = transaccion.idTransInv; // Asignar el ID de la transacción a la fila
      let idTransInv = document.createElement('td');
      idTransInv.textContent = transaccion.idTransInv;
      fila.appendChild(idTransInv);
      let idUsu = document.createElement('td');
      idUsu.textContent = transaccion.idUsu;
      fila.appendChild(idUsu);
      let idInventario = document.createElement('td');
      idInventario.textContent = transaccion.idInventario;
      fila.appendChild(idInventario);
      let fecha = document.createElement('td');
      fecha.textContent = transaccion.fecha;
      // fecha.setAttribute('class','columnaFecha')
      fecha.style.width = '70px !important';
      fila.appendChild(fecha);
      let hora = document.createElement('td');
      hora.textContent = transaccion.hora;
      // hora.setAttribute('class','columnaHora')
      fila.appendChild(hora);
      let idTipo = document.createElement('td');
      idTipo.textContent = transaccion.idTipo;
      fila.appendChild(idTipo);
      let tipo = document.createElement('td');
      tipo.textContent = transaccion.tipo;
      fila.appendChild(tipo);
      let idArticulo = document.createElement('td');
      idArticulo.textContent = transaccion.idArticulo;
      fila.appendChild(idArticulo);
      let articulo = document.createElement('td');
      articulo.textContent = transaccion.articulo;
      fila.appendChild(articulo);
      let cantidad = document.createElement('td');
      cantidad.textContent = transaccion.cantidad;
      fila.appendChild(cantidad);
      let valor = document.createElement('td');
      valor.textContent = transaccion.valor;
      fila.appendChild(valor);
      let total = document.createElement('td');
      total.textContent = transaccion.total;
      fila.appendChild(total);
      let detalle = document.createElement('td');
      detalle.textContent = transaccion.detalle;
      fila.appendChild(detalle);
      let editar = document.createElement('td');
      let botonEditar = document.createElement('button');
      botonEditar.textContent = 'Editar';
      botonEditar.setAttribute("class","btnEdita")
      botonEditar.onclick = function() {
        // editarTransInv(transaccion.idTransInv);
        // debugger
        editandoRegTransInv(transaccion.idTransInv)
      };
      editar.appendChild(botonEditar);
      fila.appendChild(editar);
      let eliminar = document.createElement('td');
      let botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.setAttribute("class","btnElimina")
      botonEliminar.onclick = function() {
        eliminarTransInv(transaccion.idTransInv);
      };
      eliminar.appendChild(botonEliminar);
      fila.appendChild(eliminar);
      tbody.appendChild(fila);
    });
}
//PREPARA INPUTS PARA NUEVA TRANSACCION
function nuevaTransaccionInv() {
    // cargaFormTransInv()
    document.getElementById('idTransInv').value = '';
    document.getElementById('cantidadTransInv').value = '';
    document.getElementById('valorTransInv').value = '';
    document.getElementById('totalTransInv').value = '';
    document.getElementById('DetalleTransInv').value = '';
    document.getElementById('cantidadTransInv').select()
}
//PRESENTA EN PANTALLA ID DEL USUARIO ACTIVO
function presentaIdUsuarioAct(){
  // Mostrar el usuario activo en el input correspondiente
  let idUsu=retornaUsuarioActivo()
  // Mostrar el idInventario en el input correspondiente
  document.getElementById('idUsuInvTrans').value = idUsu;
  let nombreUsuario=nombreUsuarioActivo(idUsu)
  document.getElementById('usuarioTransInv').value=nombreUsuario
  // idInventarioTransInput.value = localStorage.getItem('idInventario');
}
//RETORNA EL NOMBRE DEL USUARIO ACTIVO
function nombreUsuarioActivo(idUsu){ 
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; 
    for (let i = 0; i < usuarios.length; i++) { 
      if (usuarios[i].idUsu === idUsu) { 
        return usuarios[i].usuario; 
      } 
    } 
  return null; 
} 
// ---------------------- STOCK ------------------
function actualizaStock(){
    // funcion pr☻incipal de actualizacion
        // obtiene data del form
        data=dataFormTransInv()
        // define si es ingreso o egreso
        let ingOegr=ingresoEgreso(dataFormTransInv.idInv, dataFormTransInv.idArt,dataFormTransInv.cantidadFinal)
        //cantidad a actualizar
        let cantidad = document.getElementById('cantidadTransInv').value;
        //luego se graba en el stock
        nuevoStock={
            idUsu:data.idUsu,
            idInv:data.idInv,
            fecha:data.fecha,
            hora:data.hora,
            idTipo:data.idTipo,
            idArticulo:data.idArt,
            cantidad:cantidad,
            detalle:data.detalle
        }
        // debugger
        if(ingOegr==='ingreso'){
            // valida si ya el articulo en stock
            // debugger
            let enStock=existeStockArtInv(data.idInv, data.idArt)
            if(enStock){
                // si ya existe
                actualizaStockInv(nuevoStock)
            } else {
                // CUANDO ES NUEVO
                // alert("grabando ingreso en stock")
                mensajeAyuda("grabando ingreso en stock","alerta")
                //graba en ingresos
                let nombreKey='ingresoStockInventario'+data.idInv
                const stockIngreso = JSON.parse(localStorage.getItem(nombreKey)) || [];
                // Agregar la nueva transacción a la lista
                stockIngreso.push(nuevoStock);
                // Guardar las transacciones actualizadas en el local storage
                localStorage.setItem(nombreKey, JSON.stringify(stockIngreso));
                //graba en stock 
                const stock= JSON.parse(localStorage.getItem('stock')) || [];
                stock.push(nuevoStock);
                localStorage.setItem('stock', JSON.stringify(stock));
            }
        
        }
        if(ingOegr==='egreso'){
            // debugger
            alert("grabando egreso en stock")
            // const stockEgreso = JSON.parse(localStorage.getItem('stockIngreso'+idInv)) || [];
            //const stock=JSON.parse(localStorage.getItem('stock'+idInv)) || [];
        }
        //validar si hay excepcion para no grabatr stock 
}
//A PARTIR DE FORM OBTIENE OBJETO TRANSACCION INVENTARIO 
function dataFormTransInv(){
    const idUsu = document.getElementById('idUsuInvTrans').value;
    const idInv = document.getElementById('idInventarioTrans').value;
    // const idTrans= document.getElementById('idTransInv').value;
    const idArt= document.getElementById('idArticuloSel').value;
    let idTipo = document.getElementById('idTipoSelTrans').value;

    const fecha = document.getElementById('fechaTransInv').value;
    const hora = document.getElementById('horaTransInv').value;
    const cantidadFinal = document.getElementById('cantidadTransInv').value;
    const detalle = document.getElementById('DetalleTransInv').value;
    let data={
        idUsu,idInv,idTipo,idArt,fecha,hora,cantidadFinal,detalle
    }
    return data
}  

function ingresoEgreso(idInv,idArt,cantidadFinal) {
    // valida si se esta ingresando o egresando producto
    let ingreso=false
    let egreso=false    
    let cantidadInicial=cantidadArticuloInventario(idInv, idArt,cantidadFinal)
    // debugger
    
    if (!cantidadInicial){
        mensajeAyuda('el articulo no tiene aun stock','alerta')
        return 'ingreso'
    } 
    
    let cantI=parseInt(cantidadInicial) // 5   5   5 cantidad inicial en local al momento de la transa
    let cantF=parseInt(cantidadFinal)   // 6   4   0 cantidad final en formulario a actualizar
    let dif=cantF-cantI
    // es 0 esta saliendo todo el producto del stock
    if(cantF===0) {
        mensajeAyuda('el producto se acabo en la bodega','alerta')
        alert('el producto se acabo en la bodega')
        return 'egreso'
    }
    if(cantF<0) {
        mensajeAyuda('no puede sacar mas producto del que hay en la bodega','alerta')
        alert('no puede sacar mas producto del que hay en la bodega')
        // return 'egreso'
        return null
    }
    // si cantidad final es mayor que la inicial  hay ingreso
    if(dif>0){
        mensajeAyuda('se ingreso mas producto a la bodega','alerta')
        return 'ingreso'
    }
    if(dif<0){
        mensajeAyuda('se egreso producto a la bodega','alerta')
        return 'egreso'
    }
} 

function cantidadArticuloInventario(idInventario, idArticulo) {
    // Obtener el valor de 'transaccionesInv' desde localStorage
    const transaccionesInv = JSON.parse(localStorage.getItem('transaccionesInv')) || [];
    if(transaccionesInv.length>0){
        // Buscar la transacción correspondiente al idInventario y idArticulo
        // debugger
        //cambiar a ciclo for

        const transaccion = transaccionesInv.find(
          (t) => t.idInventario === idInventario && t.idArticulo === idArticulo
        );
        // Si se encontró la transacción, retornar el valor de 'cantidad'
        if (transaccion) {
          return transaccion.cantidad;
        }
    } else {
        return 0;

    }
}
//ACTUALIZA STOCK DE INVENTARIO
function actualizaStockInv(data) {
    let stock = JSON.parse(localStorage.getItem('stock'));
    let indice = stock.findIndex(function(item) {
      return item.idInv === data.idInv && item.idArticulo === data.idArticulo;
    });
  
    if (indice !== -1) {
      stock[indice].idUsu = data.idUsu;
      stock[indice].idInv = data.idInv;
      stock[indice].idTipo = data.idTipo;
      stock[indice].idArticulo = data.idArticulo;
      stock[indice].fecha = data.fecha;
      stock[indice].hora = data.hora;
      stock[indice].cantidad = data.cantidad;
      stock[indice].detalle = data.detalle;
      localStorage.setItem('stock', JSON.stringify(stock));
      mensajeAyuda('Se actualizó el stock del artículo', 'alerta');
    }
  
}
//VALIDA SI EXISTE STOCK DE ARTICULO EN INVENTARIO
function existeStockArtInv(idInventario,idArticulo) {
    let stock = JSON.parse(localStorage.getItem('stock'));
    if(!stock){
        return false
    }
    for (let i = 0; i < stock.length; i++) {
      if (stock[i].idInv === idInventario && stock[i].idArticulo === idArticulo) {
        return true;
      }
    }
    
    return false;
}
// ----------------------------------------
//CREA CLASE Y OBJETO PUBLICACION
function creaPublicacion(titulo, autor,  parrafo, firma, pie, linkCorreo, linkWeb, linkWssp){
    let id=genId()
    let fecha=fechaAhora()
    let hora= horaAhora()
    class Publicacion {
        constructor(id,fecha, hora, titulo, autor,  parrafo, firma, pie, linkCorreo, linkWeb, linkWssp) {
            this.id = id;
            this.fecha = fecha;
            this.hora = hora;
            this.titulo = titulo;
            this.autor = autor;
            this.parrafo = parrafo;
            this.firma = firma;
            this.pie = pie;
            this.linkCorreo = linkCorreo;
            this.linkWeb = linkWeb;
            this.linkWssp = linkWssp;
        }
        
        getId() {
            return this.id;
        }

        setId(id) {
            this.id = id;
        }
        getFecha() {
            return this.fecha;
        }
        setFecha(fecha) {
            this.fecha = fecha;
        }
        
        getHora() {
            return this.hora;
        }
        setHora(hora) {
            this.hora = hora;
        }

        getTitulo() {
          return this.titulo;
        }
        setTitulo(titulo) {
          this.titulo = titulo;
        }
      
        getAutor() {
          return this.autor;
        }
        setAutor(autor) {
          this.autor = autor;
        }

        getParrafo() {
            return this.parrafo;
        }
        setParrafo(parrafo) {
            this.parrafo = parrafo;
        }
      
        getFirma() {
          return this.firma;
        }
        setFirma(firma) {
          this.firma = firma;
        }
      
        getPie() {
          return this.pie;
        }
        setPie(pie) {
          this.pie = pie;
        }
      
        getLinkCorreo() {
          return this.linkCorreo;
        }
        setLinkCorreo(linkCorreo) {
          this.linkCorreo = linkCorreo;
        }
      
        getLinkWeb() {
          return this.linkWeb;
        }
        setLinkWeb(linkWeb) {
          this.linkWeb = linkWeb;
        }

        getLinkWssp() {
          return this.linkWssp;
        }
        setLinkWssp(linkWssp) {
          this.linkWssp = linkWssp;
        }
      
      }
    const pub = new Publicacion(id,fecha, hora, titulo, autor,  parrafo, firma, pie, linkCorreo, linkWeb, linkWssp);
    return pub
}
//CREA OBJETO CON CLASE
function creaAcercaDe(event){
    event.preventDefault();
    titulo=""
    autor=""
    parrafo=""
    firma=""
    pie=""
    linkCorreo=""
    linkWeb="",
    linkWssp=""
    const publicacion=creaPublicacion(titulo, autor, parrafo, firma, pie,linkCorreo, linkWeb, linkWssp )
    mostrarPublicacion(publicacion)
    leeArchivo(event)
    
}
// PRESENTA EN PANTALLA CON FORM
function presentaPubBasica(publicacion) {
    const formPub = document.createElement('div');
    formPub.classList.add('formPub');

    const pId = document.createElement('p');
    pId.textContent = `ID: ${publicacion.id}`;
    formPub.appendChild(pId);

    const pFecha = document.createElement('p');
    pFecha.textContent = `Fecha: ${publicacion.fecha}`;
    formPub.appendChild(pFecha);

    const pHora = document.createElement('p');
    pHora.textContent = `Hora: ${publicacion.hora}`;
    formPub.appendChild(pHora);

    const pTitulo = document.createElement('p');
    pTitulo.textContent = `Título: ${publicacion.titulo}`;
    formPub.appendChild(pTitulo);

    const pAutor = document.createElement('p');
    pAutor.textContent = `Autor: ${publicacion.autor}`;
    formPub.appendChild(pAutor);

    const pParrafo = document.createElement('p');
    pParrafo.textContent = `Párrafo: ${publicacion.parrafo}`;
    formPub.appendChild(pParrafo);

    const pFirma = document.createElement('p');
    pFirma.textContent = `Firma: ${publicacion.firma}`;
    formPub.appendChild(pFirma);

    const pPie = document.createElement('p');
    pPie.textContent = `Pie de Página: ${publicacion.pie}`;
    formPub.appendChild(pPie);

    const pLinkCorreo = document.createElement('p');
    pLinkCorreo.textContent = `Link Correo: ${publicacion.linkCorreo}`;
    formPub.appendChild(pLinkCorreo);

    const pLinkWeb = document.createElement('p');
    pLinkWeb.textContent = `Link Web: ${publicacion.linkWeb}`;
    formPub.appendChild(pLinkWeb);

    const pLinkWssp = document.createElement('p');
    pLinkWssp.textContent = `Link WhatsApp: ${publicacion.linkWssp}`;
    formPub.appendChild(pLinkWssp);

    document.body.appendChild(formPub);
}
//PRESENTA INPUTS
function mostrarPublicacion(publicacion) {
    const formPub = document.createElement('div');
    formPub.classList.add('formPub');
    formPub.setAttribute('id', 'formPublica');
    //CREA FORM
    const form = document.createElement('form');
    // Crear div de cierre
    const divCierre = document.createElement('div');
    divCierre.classList.add('cerrar-formulario');
    // Crear enlace o botón de cierre
    const enlaceCierre = document.createElement('a');
    // enlaceCierre.textContent = 'Cerrar Formulario';
    enlaceCierre.innerHTML = '&#x25fc'
    enlaceCierre.href = '#';
    enlaceCierre.style.textDecoration = 'none'; // Quital el subrayado
    enlaceCierre.addEventListener('click', function (event) {
        event.preventDefault();
        cerrarFormularioPub();
    });

    // Agregar enlace o botón de cierre al div de cierre
    divCierre.appendChild(enlaceCierre);

    // Agregar div de cierre al formulario al principio
    form.appendChild(divCierre);

    //CREA INPUTS
    const inputId = document.createElement('input');
    inputId.setAttribute('type', 'text');
    inputId.setAttribute('name', 'id');
    inputId.setAttribute('value', publicacion.id);
    inputId.setAttribute('id', 'idPub');
    form.appendChild(inputId);
    form.appendChild(document.createElement('br'));
    //INPUT FECHA
    const inputFecha = document.createElement('input');
    inputFecha.setAttribute('type', 'text');
    inputFecha.setAttribute('name', 'fecha');
    inputFecha.setAttribute('value', publicacion.fecha);
    inputFecha.setAttribute('id', 'fechaPub');
    form.appendChild(inputFecha);
    form.appendChild(document.createElement('br'));
    //INPUT HORA
    const inputHora = document.createElement('input');
    inputHora.setAttribute('type', 'text');
    inputHora.setAttribute('name', 'hora');
    inputHora.setAttribute('value', publicacion.hora);
    inputHora.setAttribute('id', 'horaPub');

    form.appendChild(inputHora);
    form.appendChild(document.createElement('br'));
    //INPUT TITULO
    const inputTitulo = document.createElement('input');
    inputTitulo.setAttribute('type', 'text');
    inputTitulo.setAttribute('name', 'titulo');
    inputTitulo.setAttribute('value', publicacion.titulo);
    inputTitulo.setAttribute('id', 'tituloPub');

    form.appendChild(inputTitulo);
    form.appendChild(document.createElement('br'));
    //INPUT AUTOR
    const inputAutor = document.createElement('input');
    inputAutor.setAttribute('type', 'text');
    inputAutor.setAttribute('name', 'autor');
    inputAutor.setAttribute('value', publicacion.autor);
    inputAutor.setAttribute('id', 'autorPub');

    form.appendChild(inputAutor);
    form.appendChild(document.createElement('br'));
    //TEXTAREA PARRAFO
    // const inputParrafo = document.createElement('input');
    // inputParrafo.setAttribute('type', 'text');
    // inputParrafo.setAttribute('name', 'parrafo');
    // inputParrafo.setAttribute('value', publicacion.parrafo);
    // inputParrafo.setAttribute('class', 'inputParrafo');
    const inputParrafo = document.createElement('textarea');
    inputParrafo.setAttribute('name', 'parrafo');
    inputParrafo.setAttribute('id', 'parrafoPub');
    inputParrafo.textContent = publicacion.parrafo;
    inputParrafo.classList.add('inputParrafo');
    form.appendChild(inputParrafo);
    form.appendChild(document.createElement('br'));
    //INPUT FIRMA
    const inputFirma = document.createElement('input');
    inputFirma.setAttribute('type', 'text');
    inputFirma.setAttribute('name', 'firma');
    inputFirma.setAttribute('id', 'firmaPub');
    inputFirma.setAttribute('value', publicacion.firma);
    form.appendChild(inputFirma);
    form.appendChild(document.createElement('br'));
    //INPUT PIE
    const inputPie = document.createElement('input');
    inputPie.setAttribute('type', 'text');
    inputPie.setAttribute('name', 'pie');
    inputPie.setAttribute('id', 'piePub');
    inputPie.setAttribute('value', publicacion.pie);
    form.appendChild(inputPie);
    form.appendChild(document.createElement('br'));
    //INPUT CORREO
    const inputLinkCorreo = document.createElement('input');
    inputLinkCorreo.setAttribute('type', 'text');
    inputLinkCorreo.setAttribute('name', 'linkCorreo');
    inputLinkCorreo.setAttribute('id', 'linkCorreoPub');
    inputLinkCorreo.setAttribute('value', publicacion.linkCorreo);
    form.appendChild(inputLinkCorreo);
    form.appendChild(document.createElement('br'));
    //INPUT WEB
    const inputLinkWeb = document.createElement('input');
    inputLinkWeb.setAttribute('type', 'text');
    inputLinkWeb.setAttribute('name', 'linkWeb');
    inputLinkWeb.setAttribute('id', 'linkWebPub');
    inputLinkWeb.setAttribute('value', publicacion.linkWeb);
    form.appendChild(inputLinkWeb);
    form.appendChild(document.createElement('br'));
    //INPUT WSAP
    const inputLinkWssp = document.createElement('input');
    inputLinkWssp.setAttribute('type', 'text');
    inputLinkWssp.setAttribute('name', 'linkWssp');
    inputLinkWssp.setAttribute('id', 'linkWsspPub');
    inputLinkWssp.setAttribute('value', publicacion.linkWssp);
    form.appendChild(inputLinkWssp);
    form.appendChild(document.createElement('br'));
    //CONFIGURA BOTONES
    // NO BORRAR
    // const button1 = document.createElement('button');
    // button1.textContent = 'Guardar Local';
    // button1.addEventListener('click', function(event) {
    //     guardaPubLocal(event); 
    // });
    // const button2 = document.createElement('button');
    // button2.textContent = 'Guardar Json';
    // button2.addEventListener('click', function(event) {
    //     grabaJsonPub(event); // 
    // });
    // const button3 = document.createElement('button');
    // button3.textContent = 'Lee Json';
    // button3.addEventListener('click', function(event) {
    //     leeJsonPub(event); // 
    // });
    // const button4 = document.createElement('button');
    // button4.textContent = 'presenta Local';
    // button4.addEventListener('click', function(event) {
    //     localAform(event) // 
    // });
    const button5 = document.createElement('button');
    button5.textContent = 'Rec Form a archivo';
    button5.setAttribute('class', 'btnPub')
    button5.addEventListener('click', function(event) {
        grabaFormAarchivo(event) // 
    });
    const button6= document.createElement('button');
    button6.textContent = 'Json a Local&form';
    button6.setAttribute('class', 'btnPub')
    button6.addEventListener('click', function(event) {
        archivoAlocalYform(event) // FUNCIONA LEE CARGA
    });
    const button7= document.createElement('button');
    button7.textContent = 'Rec archivo Json';
    button7.setAttribute('class', 'btnPub')
    button7.addEventListener('click', function(event) {
        grabaJsonPhp(event) // SI QUE FUNCIONA graba
    });
    const button9= document.createElement('button');
    button9.textContent = 'Graba registro en tabla sql';
    button9.setAttribute('class', 'btnPub')
    button9.addEventListener('click', function(event) {
        grabaPubSql(event)  // SI QUE FUNCIONA graba
    });
    
    //CONSTITUYE BOTONES
    // form.appendChild(button1); //guarda en local guardaPubLocal(event)
    // form.appendChild(button2);//guardar json grabaJsonPub(event)
    // form.appendChild(button3); //lee json leeJsonPub(event)
    // form.appendChild(button4);//presenta local localAform(event) 
    form.appendChild(button5);
    form.appendChild(button6);
    form.appendChild(button7);
    form.appendChild(button9);

    // form.appendChild(button8); //no funciona aun
    //CIERRA FORMULARIO
    formPub.appendChild(form);
    document.body.appendChild(formPub);
}
//GRABA LA PUB EN LOCAL S
function guardaPubLocal(event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('.formPub input');
    const formData = {};
    
    inputs.forEach(input => {
      formData[input.name] = input.value;
    });
    
    const publicacionJSON = JSON.stringify(formData);
    localStorage.setItem('publicacion', publicacionJSON);
}
//GRABA ARCHIVO JSON DESDE LOCAL
function grabaJsonPub(event) {
    event.preventDefault()
    const publicacionJSON = localStorage.getItem('publicacion');
    if (publicacionJSON) {
      const blob = new Blob([publicacionJSON], { type: 'application/json' });
  
      // Crear un enlace de descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'publicacion.json'; // Nombre del archivo
  
      // Simular clic en el enlace para descargar el archivo
      link.click();
  
      // Liberar recursos
      URL.revokeObjectURL(link.href);
    }
}
//graba el formulario a archivo json en hd
function grabaFormAarchivo(event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('.formPub input, .formPub textarea');
    const formData = {};
    inputs.forEach(input => {
      formData[input.name] = input.value;
    });
    const publicacionJSON = JSON.stringify(formData);
    localStorage.setItem('publicacion', publicacionJSON);
    const blob = new Blob([publicacionJSON], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'publicacion.json';
    link.click();
    URL.revokeObjectURL(link.href);
}
//LEE ARCHIVO JSON A LOCAL key 'publicacion'
function leeJsonPub(event){
    event.preventDefault()
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
      fileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function(event) {
        const json = event.target.result;
        localStorage.setItem('publicacion', json);
      };
      reader.readAsText(file);
    });
    fileInput.click();
}
//DESDE LOCAL key 'publicacion' DESPLIEGA EN FORM
function localAform(event) {
    event.preventDefault();
    const publicacionJSON = localStorage.getItem('publicacion');
    const publicacion = JSON.parse(publicacionJSON);
  
    const inputId = document.querySelector('input[name="id"]');
    inputId.value = publicacion.id;
  
    const inputFecha = document.querySelector('input[name="fecha"]');
    inputFecha.value = publicacion.fecha;
  
    const inputHora = document.querySelector('input[name="hora"]');
    inputHora.value = publicacion.hora;
  
    const inputTitulo = document.querySelector('input[name="titulo"]');
    inputTitulo.value = publicacion.titulo;
  
    const inputAutor = document.querySelector('input[name="autor"]');
    inputAutor.value = publicacion.autor;
  
    // const inputParrafo = document.querySelector('input[name="parrafo"]');
    // inputParrafo.value = publicacion.parrafo;

    const inputParrafo = document.querySelector('textarea[name="parrafo"]');
    inputParrafo.value = publicacion.parrafo;
  
    const inputFirma = document.querySelector('input[name="firma"]');
    inputFirma.value = publicacion.firma;
  
    const inputPie = document.querySelector('input[name="pie"]');
    inputPie.value = publicacion.pie;
  
    const inputLinkCorreo = document.querySelector('input[name="linkCorreo"]');
    inputLinkCorreo.value = publicacion.linkCorreo;
  
    const inputLinkWeb = document.querySelector('input[name="linkWeb"]');
    inputLinkWeb.value = publicacion.linkWeb;
  
    const inputLinkWssp = document.querySelector('input[name="linkWssp"]');
    inputLinkWssp.value = publicacion.linkWssp;
}
//LEE DESDE ARCHIVO JSON CARGA EN LOCAL Y FORM   
function archivoAlocalYform(event) {
    event.preventDefault();
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function(event) {
        const json = event.target.result;
        localStorage.setItem('publicacion', json);
        localAform(event)
      };
      reader.readAsText(file);
    });
    fileInput.click();
}
//LEE CON PHP UN ARCHIVO JSON Y CARGA LOCALSTORAGE Y EN EL FORM
function leeArchivo(event) {
    event.preventDefault()
    // Realizar la petición AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './bd/publicacion.json', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Obtener los datos del archivo JSON
        const datosJson = xhr.responseText;
        // Guardar los datos en el almacenamiento local
        localStorage.setItem('publicacion', datosJson);
        //presenta en form el contenido json
        localAform(event)
        // let publica=JSON.parse(datosJson)
        // presentaPubBasica(publica)
      }
    };
    xhr.send();
    // localAform(event)
}
//GRABA CON PHP EN ARCHIVO JSON EN RUTA DEFINIDA
// function grabaJsonPhp(event) {
//     event.preventDefault();
//     const publicacion = {
//       id: document.getElementById('idPub').value,
//       fecha: document.getElementById('fechaPub').value,
//       hora: document.getElementById('horaPub').value,
//       titulo: document.getElementById('tituloPub').value,
//       autor: document.getElementById('autorPub').value,
//       parrafo: document.getElementById('parrafoPub').value,
//       linkCorreo: document.getElementById('linkCorreoPub').value,
//       linkWeb: document.getElementById('linkWebPub').value,
//       linkWssp: document.getElementById('linkWsspPub').value,
//       firma: document.getElementById('firmaPub').value,
//       pie: document.getElementById('piePub').value,
//     };
//     const publicacionJSON = JSON.stringify(publicacion);
  
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', './graba-json.php', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
    
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4 && xhr.status === 200) {
//         alert('Datos guardados exitosamente en el archivo JSON.');
//         borrarPubLocalS() //borra para evitar incosnsitencias
//         }
//     };
//     xhr.send(publicacionJSON);
// }
function grabaJsonPhp(event) {
    event.preventDefault();
    const publicacion = {
      id: document.getElementById('idPub').value,
      fecha: document.getElementById('fechaPub').value,
      hora: document.getElementById('horaPub').value,
      titulo: document.getElementById('tituloPub').value,
      autor: document.getElementById('autorPub').value,
      parrafo: document.getElementById('parrafoPub').value,
      linkCorreo: document.getElementById('linkCorreoPub').value,
      linkWeb: document.getElementById('linkWebPub').value,
      linkWssp: document.getElementById('linkWsspPub').value,
      firma: document.getElementById('firmaPub').value,
      pie: document.getElementById('piePub').value,
    };
    const publicacionJSON = JSON.stringify(publicacion);
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', './graba-json.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert('Datos guardados exitosamente en el archivo JSON.');
          borrarPubLocalS(); // borra para evitar inconsistencias
        } else {
          console.error('Error en la solicitud AJAX. Estado:', xhr.status);
        }
      }
    };
    
    // Agregar mensajes de consola para detectar posibles problemas
    xhr.onerror = function() {
      console.error('Error en la solicitud AJAX. No se pudo completar la solicitud.');
    };
    
    xhr.ontimeout = function() {
      console.error('Error en la solicitud AJAX. Tiempo de espera agotado.');
    };
  
    xhr.send(publicacionJSON);
}
//CIERRA COMPLETO EL FORM DE LA PUBLICACION
function cerrarFormularioPub() {
    const formPub = document.getElementById('formPublica');
    if (formPub) {
        formPub.remove();
    }
}
//CIERRA PRESENTACION
function cerrarPresentaAcerca(){
    const formPub = document.getElementById('resultado');
    if (formPub) {
        formPub.remove();
    }
}
//CIERRA TABLA SQL
function cerrarPresentaTabla(){
    const formPub = document.getElementById('tablaContainer');
    if (formPub) {
        formPub.remove();
    }
}
//BORRA DE LOCAL STORAGE KEY 'publicacion'
function borrarPubLocalS() {
    localStorage.removeItem('publicacion');
}
// ---------------------------------------------- CON PHP SQL
//CREA TABLA 'publicaciones' EN BASE DE DATOS 'q' CON PHP
function crearTablaSqlPub() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
        alert(this.responseText); // Aquí puedes hacer algo con la respuesta del PHP
      }
    };
    xhttp.open("GET", "crea-tabla-pub.php", true);
    xhttp.send();
}
//ELIMINA LA TABLA PUBLICACIONES  
function eliminarTablaPub() {
    // Utilizar AJAX para llamar al script PHP
    let confirma=confirm("esta seguro de eliminar la tabla con sus datos")
    if(!confirma){return}
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "./elimina-tabla-pub.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText); // Mostrar la respuesta del servidor
        }
    };
    xhr.send();
}
//GRABA REGISTRO O ACTUALIZA EN TABLA sql
function grabaPubSql(event){
    event.preventDefault();
    const inputs = document.querySelectorAll('.formPubCrud input, .formPubCrud textarea');
    const formData = {};
    inputs.forEach(input => {
      formData[input.name] = input.value;
    });
    const hayDatos=Object.keys(formData).length > 0
    if (!hayDatos){
        alert('llene los campos')
        return
    }
    const publicacionJSON = JSON.stringify(formData);
    localStorage.setItem('publicacion', publicacionJSON);
    //aca debe enviar instruccion a archivo php "graba-pub-sql.php"
    // Crear una instancia de XMLHttpRequest
    let xhr = new XMLHttpRequest();
    // Especificar el método y la URL del archivo PHP
    xhr.open("POST", "./graba-pub-sql.php", true);
    // Configurar el encabezado para enviar datos JSON
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    // Definir la función de devolución de llamada cuando la solicitud se complete
    xhr.onload = function () {
        if (xhr.status == 200) {
            // La solicitud fue exitosa, puedes mostrar alguna respuesta si es necesario
            alert(xhr.responseText);
        } else {
            // Hubo un error en la solicitud
            alert("Error en la solicitud: " + xhr.statusText);
        }
    };
    // Enviar la solicitud con los datos JSON
    xhr.send(publicacionJSON);
}
// Función para cargar y mostrar las publicaciones desde la base de datos
async function cargarPublicaciones(event) {
    event.preventDefault()
    try {
        const response = await fetch('./presenta-pubs-sql.php');
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        const data = await response.json();
        creaCierreTabla(event)
        mostrarPublicaciones(data,event);
    } catch (error) {
        alert('no hay datos en la tabla publicaciones')
        console.error('Error en la función cargarPublicaciones: ' + error.message);
    }
}
//PRESENTA EN UNA TABLA DINAMICA *akizen*
function mostrarPublicaciones(data, event) {
    event.preventDefault();
    data = data.publicaciones;
    // Crear el contenedor de la tabla
    let tablaContainer = document.createElement("div");
    tablaContainer.id = "tablaContainer";
    // tablaContainer.class = "containerTabla";
    tablaContainer.setAttribute('class','containerTabla')
    // Crear la tabla
    let tabla = document.createElement("table");
    tabla.setAttribute("border", "1");
    tabla.setAttribute("id", "tablaPublicaciones");
    // Crear encabezado de la tabla
    let thead = document.createElement("thead");
    let encabezado = document.createElement("tr");
    for (let key in data[0]) {
        let th = document.createElement("th");
        th.textContent = key.toUpperCase();
        encabezado.appendChild(th);
    }
    // Agregar otro th para "Acciones"
    let thAcciones = document.createElement("th");
    thAcciones.textContent = "Acciones";
    encabezado.appendChild(thAcciones);
    //AGREGA ENCABEZADOS
    thead.appendChild(encabezado);
    tabla.appendChild(thead);
    // Crear cuerpo de la tabla
    let tbody = document.createElement("tbody");
    tbody.setAttribute("id", "tbodyPub");
    data.forEach(function (publicacion) {
        let fila = document.createElement("tr");
        let filaRow='fila-'+publicacion.id //identifica cada fila
        fila.setAttribute("id", filaRow);
        for (let key in publicacion) {
            let celda = document.createElement("td");
            celda.textContent = publicacion[key];
            fila.appendChild(celda);
        }
        // Botones de editar y eliminar
        let celdaAcciones = document.createElement("td");
        let btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.setAttribute('class','btnCrudEdit')
        // BOTON EDITAR
        btnEditar.onclick = function () {
            presentaFormPub(publicacion.id)
        };
        //BOTON ELIMINAR
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.setAttribute('class','btnCrudElimina')
        btnEliminar.onclick = function () {
            const confirma=confirm("Esta seguro de eliminar el registro")
            if(!confirm){
                return
            } else {
                // Implementa lógica para eliminar la publicación
                // alert("Implementar lógica para eliminar la publicación con ID: " + publicacion.id);
                eliminarPublicacion(publicacion.id);
                eliminarFila(publicacion.id)
            }
        };
        //BOTON REC JSON btnRecJson
        // -----------------
        let btnRecJson = document.createElement("button");
        btnRecJson.textContent = "RecJson";
        btnRecJson.setAttribute('class','btnCrudJson')
        // BOTON EDITAR
        btnRecJson.onclick = function () {
            grabaJsonReg(event,publicacion)
        };
        // -------------------
        celdaAcciones.appendChild(btnRecJson);
        celdaAcciones.appendChild(btnEditar);
        celdaAcciones.appendChild(btnEliminar);
        fila.appendChild(celdaAcciones);

        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);

    // Limpiar el contenedor y agregar la tabla
    tablaContainer.innerHTML = "";
    tablaContainer.appendChild(tabla);

    // Asegurarse de que el elemento 'tablaContainer' esté en el DOM
    let existingTablaContainer = document.getElementById("tablaContainer");
    if (!existingTablaContainer) {
        // Agregar el contenedor al cuerpo del documento si no existe
        document.body.appendChild(tablaContainer);
    }
}
// para cerrar tabla publicaciones
function creaCierreTabla(event){
    event.preventDefault();
     //------------------------ PARA CERRAR LA TABLA --------------
    // Crear div de cierre en la esquina superior izquierda
    const divCierre = document.createElement('div');
    divCierre.classList.add('cerrar-formulario');

    // Crear enlace o botón de cierre
    const enlaceCierre = document.createElement('a');
    enlaceCierre.innerHTML = '&#x25fc'
    // enlaceCierre.textContent = 'X'; // Puedes cambiar el texto según desees
    enlaceCierre.href = '#';
    enlaceCierre.style.textDecoration = 'none'; // Quita el subrayado

    enlaceCierre.addEventListener('click', function (event) {
        event.preventDefault();
        cerrarPresentaTabla();
        // Eliminar el elemento divCierre del DOM después de cerrar la tabla
        document.body.removeChild(divCierre);
    });

    divCierre.appendChild(enlaceCierre);
    // Agregar div de cierre al cuerpo del documento
    document.body.appendChild(divCierre);
    //----------------------- FIN CIERRE TABLA
}
async function eliminarPublicacion(id) {
    if (id==='15112023165551'){
        alert("no puede eliminar esta publicacion")
        return
    }
    try {
        const response = await fetch('./elimina-reg-pub.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                eliminar: true,
            }),
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        const data = await response.json();

        // Verifica si la eliminación fue exitosa antes de continuar
        if (data.success) {
            // Elimina la fila de la tabla
            // Ajusta esta lógica según la estructura de tu tabla
            const filaAEliminar = document.getElementById('fila-' + id);
            if (filaAEliminar) {
                filaAEliminar.remove();
            } else {
                console.warn('La fila a eliminar no fue encontrada en la tabla.');
            }
        } else {
            console.error('Error al eliminar la publicación: ' + data.message);
        }
    } catch (error) {
        console.error('Error en la solicitud: ' + error.message);
    }
}
function eliminarFila(id) {
    // es el acerca de no lo puede eliminar
    if (id==='15112023165551'){
        return
    }
    let filaRow = 'fila-' + id;
    const tr = document.getElementById(filaRow);
    const tbody = document.getElementById('tbodyPub')

    if (tr) {
        // Asegúrate de que la fila exista antes de intentar eliminarla
        tbody.removeChild(tr);
        console.log('Fila eliminada con éxito.');
    } else {
        console.warn('No se encontró la fila con id:', filaRow);
    }
}
//encuentra publicacion y la presenta con
//mostrarPublicacionSql(publicacion)
function encuentraPublicacionSql(id) {
    fetch('./encuentra-pub-sql.php?id=' + id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la publicación. Estado: ' + response.status);
            }
            return response.json();
        })
        .then(resultado => mostrarPublicacionSql(resultado))
        .catch(error => {
            console.error(error);
            document.getElementById('resultado').innerHTML = 'Error al obtener la publicación.';
        });
}
//presenta en formato simple 
function mostrarPublicacionSql(publicacion) {
    activaMod("modAcerca");
    // let contenedor=document.getElementById('modAcerca')
    // Crear elemento <p> dinámicamente
    // let parrafo = document.createElement('p');
    let parrafo = document.getElementById('parrafoAcercaDe');
    // parrafo.setAttribute('class','parrafoAcerca')
    parrafo.innerText = 'ID: ' + publicacion.id + '\n' +
                        'Fecha: ' + publicacion.fecha + '\n' +
                        'Hora: ' + publicacion.hora + '\n' +
                        'Título: ' + publicacion.titulo + '\n' +
                        'Autor: ' + publicacion.autor + '\n' +
                        'Párrafo: ' + publicacion.parrafo + '\n' +
                        'Firma: ' + publicacion.firma + '\n' +
                        'Pie: ' + publicacion.pie + '\n' +
                        'Link Correo: ' + publicacion.linkCorreo + '\n' +
                        'Link Web: ' + publicacion.linkWeb + '\n' +
                        'Link WhatsApp: ' + publicacion.linkWssp;
    // Agregar el párrafo al contenedor
    // contenedor.appendChild(parrafo);
    // Obtener el cuerpo del documento y agregar el contenedor
    // let body = document.body;
    // body.appendChild(contenedor);
}
// -----------------------------------
function cargarAcercaDe() {
    encontrarPublicacionSql('15112023165551')
        .then(publicacion => {
            if (publicacion) {
               
                mostrarPublicacionSql(publicacion);
            } else {
                alert('No existe esta publicacion o no hay acceso');
            }
        })
        .catch(error => {
            console.error(error);
            // Puedes manejar errores aquí si es necesario
        });
}
function eliminaParrafoAcerca(){
    //ES NECESARIO PUES SINO DUPLICA AL RECARGAR
    let elementoPadre = document.getElementById("modAcerca");
    let elementosP = elementoPadre.querySelectorAll('p');

    // Recorre todos los elementos p y elimínalos
    for (let i = 0; i < elementosP.length; i++) {
        elementosP[i].remove();
    }
}
function encontrarPublicacionSql(id) {
    return fetch('./encuentra-pub-sql.php?id=' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener la publicación: ' + response.statusText);
        }
    })
    .then(respuesta => {
        if (respuesta.error) {
            console.error(respuesta.error);
            // Puedes lanzar un nuevo error para que se capture en el bloque catch siguiente
            throw new Error('Error al obtener la publicación: ' + respuesta.error);
        } else {
            return respuesta;
        }
    })
    .catch(error => {
        console.error('Error al obtener la publicación: ' + error.message);
        // Puedes decidir si quieres lanzar el error nuevamente para que se maneje en el nivel superior
        throw error;
    });
}
// ----------------------- CRUD -------------------------
function cerrarTablaCrudPub(){
    const formPub = document.getElementById('tablaContainer');
    if (formPub) {
        formPub.remove();
    }
    let elementoEliminar = document.querySelector('.cerrar-formulario');
    // Verificar si el elemento existe antes de intentar eliminarlo
    if (elementoEliminar) {
      elementoEliminar.remove();
    }
}
function presentaFormPub(id) {
    encontrarPublicacionSql(id)
        .then(publicacion => {
            if (publicacion) {
                llenarFormulario(publicacion);
            } else {
                alert('No existe esta publicacion o no hay acceso');
            }
        })
        .catch(error => {
            console.error(error);
            // Puedes manejar errores aquí si es necesario
        });
}
function llenarFormulario(publicacion) {
    document.getElementById('idPub').value = publicacion.id;
    document.getElementById('fechaPub').value = publicacion.fecha;
    document.getElementById('horaPub').value = publicacion.hora;
    document.getElementById('tituloPub').value = publicacion.titulo;
    document.getElementById('autorPub').value = publicacion.autor;
    document.getElementById('parrafoPub').value = publicacion.parrafo;
    document.getElementById('firmaPub').value = publicacion.firma;
    document.getElementById('piePub').value = publicacion.pie;
    document.getElementById('linkCorreoPub').value = publicacion.linkCorreo;
    document.getElementById('linkWebPub').value = publicacion.linkWeb;
    document.getElementById('linkWsspPub').value = publicacion.linkWssp;
}
function resetearFormulario(event) {
    event.preventDefault();
    document.getElementById('idPub').value = genId()
    document.getElementById('fechaPub').value = fechaAhora()
    document.getElementById('horaPub').value = horaActual()
    document.getElementById('tituloPub').value = ''
    document.getElementById('autorPub').value = ''
    document.getElementById('parrafoPub').value = ''
    document.getElementById('firmaPub').value = ''
    document.getElementById('piePub').value = ''
    document.getElementById('linkCorreoPub').value = ''
    document.getElementById('linkWebPub').value = ''
    document.getElementById('linkWsspPub').value = ''
}
function nuevoFormulario(event) {
    event.preventDefault();
    document.getElementById('idPub').value = genId()
    document.getElementById('fechaPub').value = fechaAhora()
    document.getElementById('horaPub').value = horaActual()
    document.getElementById('tituloPub').value = ''
    document.getElementById('autorPub').value = ''
    document.getElementById('parrafoPub').value = ''
    document.getElementById('firmaPub').value = ''
    document.getElementById('piePub').value = ''
    document.getElementById('linkCorreoPub').value = ''
    document.getElementById('linkWebPub').value = ''
    document.getElementById('linkWsspPub').value = ''
    document.getElementById('tituloPub').focus()
}
//GRABA EL REGISTRO EN TABLA SQL
function grabaFormPub(event){
    event.preventDefault();
    //VALIDA INPUTS
    let validaInputs=validaInputsFormPubs(event)
    if(!validaInputs){
        return
    }
    //OBTENIEONDO LOS DATOS PARA ACTUALIZAR TABLA
    const inputs = document.querySelectorAll('.formPubCrud input, .formPubCrud textarea');
    const formData = {};
    inputs.forEach(input => {
      formData[input.name] = input.value;
    });
    const nuevosDatos = {
        id: formData.id,
        fecha: formData.fecha,
        hora: formData.hora,
        titulo: formData.titulo,
        autor: formData.autor,
        parrafo: formData.parrafo,
        firma: formData.firma,
        pie: formData.pie,
        linkCorreo: formData.linkCorreo,
        linkWeb: formData.linkWeb,
        linkWssp: formData.linkWssp
    };
    const idFila='fila-' + formData.id 
    //GRABANDO SQL
    
    grabaPubSql(event) //la idea es que retorne verlo despues
    let actualizo=actualizarFilaEnTabla(idFila, nuevosDatos)
    //si no actualizo es porque es nuevo registro nueva fila
    if(!actualizo){
        agregarFilaATabla(nuevosDatos)
    }
    resetearFormulario(event)
}
// Función para actualizar los datos de una fila en la tabla
function actualizarFilaEnTabla(idFila, nuevosDatos) {
    // Obtener la fila actual mediante su ID
    const fila = document.getElementById(idFila);
    if (fila) {
        // Obtener las celdas de la fila
        const celdas = fila.getElementsByTagName('td');
        // Obtener las claves del objeto formData (nuevosDatos)
        const keys = Object.keys(nuevosDatos);
        // Actualizar el contenido de cada celda con los nuevos datos de formData
        for (let i = 0; i < keys.length; i++) {
            const nombreColumna = keys[i].toLowerCase(); // Suponemos que el nombre de la propiedad coincide con el nombre de la columna
            const valor = nuevosDatos[keys[i]];
            
            // Verificar que la columna existe en la fila antes de actualizarla
            if (celdas[i]) {
                celdas[i].textContent = valor || '';
            }
        }
        return true
    } else {
        console.error('No se encontró la fila con ID:', idFila);
        return false
    }
}
function agregarFilaATabla(nuevosDatos,event) {
    // Obtener el valor del ID de nuevosDatos
    const nuevoID = nuevosDatos.id; // Asegúrate de que tengas una propiedad 'id' en nuevosDatos

    // Verificar si el ID ya existe en la tabla
    if (verificarIDUnico(nuevoID)) {
        // Obtener la referencia del tbody por su ID
        const tbody = document.getElementById('tbodyPub'); // Reemplaza 'tbodyPub' con el ID real de tu tbody

        // Verificar si la referencia del tbody es válida
        if (tbody) {
            // Crear una nueva fila
            const nuevaFila = tbody.insertRow();
            const idCreado='fila-'+nuevoID
            nuevaFila.setAttribute('id',idCreado)
            // Obtener las claves del objeto formData (nuevosDatos)
            const keys = Object.keys(nuevosDatos);

            // Agregar celdas a la nueva fila con los valores de nuevosDatos
            for (let i = 0; i < keys.length; i++) {
                const valor = nuevosDatos[keys[i]];
                // Crear una nueva celda en la fila
                const nuevaCelda = nuevaFila.insertCell();
                // Establecer el contenido de la celda con el valor correspondiente
                nuevaCelda.textContent = valor || '';
            }

            // Agregar botones de acciones a la nueva fila
            let celdaAcciones = document.createElement("td");
            let btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.setAttribute('class', 'btnCrudEdit');
            btnEditar.onclick = function () {
                // Implementa lógica para editar la publicación
                // alert("Implementar lógica para editar la publicación con ID: " + nuevoID);
                presentaFormPub(nuevoID);
            };

            let btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.setAttribute('class', 'btnCrudElimina');
            btnEliminar.onclick = function () {
                const confirma = confirm("¿Está seguro de eliminar el registro?");
                if (!confirma) {
                    return;
                } else {
                    // Implementa lógica para eliminar la publicación
                    // alert("Implementar lógica para eliminar la publicación con ID: " + nuevoID);
                    eliminarPublicacion(nuevoID);
                    eliminarFila(nuevoID);
                }
            };
             //BOTON REC JSON btnRecJson
            // -----------------
            let btnRecJson = document.createElement("button");
            btnRecJson.textContent = "RecJson";
            btnRecJson.setAttribute('class','btnCrudJson')
            // BOTON EDITAR
            btnRecJson.onclick = function (event) {
                let publicacion=obtenerDatosFila(nuevoID)
                grabaJsonReg(event,publicacion)
            };
            // -------------------
            celdaAcciones.appendChild(btnRecJson);    
            celdaAcciones.appendChild(btnEditar);
            celdaAcciones.appendChild(btnEliminar);
            nuevaFila.appendChild(celdaAcciones);

            // Agregar la nueva fila al tbody
            tbody.appendChild(nuevaFila);
        } else {
            console.error('No se encontró un tbody válido con el ID proporcionado.');
        }
    } else {
        console.error('El ID ya existe en la tabla:', nuevoID);
    }
}
// VERIFICA QUE ID NO SE REPITA EN TABLA HTML
function verificarIDUnico(nuevoID) {
    const tabla = document.getElementById('tablaPublicaciones'); // Reemplaza 'idDeTuTabla' con el ID real de tu tabla
    // Obtener todas las filas de la tabla
    const filas = tabla.getElementsByTagName('tr');
    // Verificar si el ID ya existe en alguna fila
    for (let i = 0; i < filas.length; i++) {
        const idExistente = filas[i].getAttribute('id');
        if (idExistente === nuevoID) {
            return false; // El ID ya existe, no es único
        }
    }
    return true; // El ID es único
}
//graba fila registro en archivo json
function grabaJsonReg(event,publicacion) {
    event.preventDefault()
    const publicacionJson=JSON.stringify(publicacion)
    if (publicacion) {
      const blob = new Blob([publicacionJson], { type: 'application/json' });
      // Crear un enlace de descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
    //   debugger
      const archivo='publicacion-'+publicacion.id
      link.download = archivo; // Nombre del archivo
      // Simular clic en el enlace para descargar el archivo
      link.click();
      // Liberar recursos
      URL.revokeObjectURL(link.href);
    }
}
//graba la tabla en un archivo json
function grabaTablaAjson() {
    // Obtener la tabla
    let table = document.getElementById("tablaPublicaciones");
    let tbody = table.getElementsByTagName("tbody")[0];
    // Crear un array para almacenar los datos
    let data = [];
    // Recorrer las filas de la tabla
    for (let i = 0; i < tbody.rows.length; i++) {
        let row = tbody.rows[i];
        let rowData = {
            id: row.cells[0].innerText,
            fecha: row.cells[1].innerText,
            hora: row.cells[2].innerText,
            titulo: row.cells[3].innerText,
            autor: row.cells[4].innerText,
            parrafo: row.cells[5].innerText,
            firma: row.cells[6].innerText,
            pie: row.cells[7].innerText,
            linkCorreo: row.cells[8].innerText,
            linkWeb: row.cells[9].innerText,
            linkWssp: row.cells[10].innerText
        };

        // Agregar el objeto a la lista de datos
        data.push(rowData);
    }
    // Convertir el array a una cadena JSON
    let jsonData = JSON.stringify(data, null, 2);
    // Crear un objeto Blob con los datos JSON
    let blob = new Blob([jsonData], { type: "application/json" });
    // Crear un enlace para descargar el archivo
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "datos.json";
    // Agregar el enlace al documento y hacer clic en él
    document.body.appendChild(a);
    a.click();
    // Limpiar el enlace y liberar recursos
    document.body.removeChild(a);
}
//lee archivo y carga en local storage
function cargaTblJsonAlocal(event) {
    event.preventDefault();
    // Crear dinámicamente el input de tipo file
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";

    // Agregar el input al documento
    document.body.appendChild(fileInput);

    // Simular el evento change directamente
    fileInput.onchange = function() {
        let file = fileInput.files[0];

        if (file) {
            let reader = new FileReader();

            reader.onload = function(e) {
                let jsonData = e.target.result;

                // Convertir la cadena JSON a un objeto
                try {
                    jsonData = JSON.parse(jsonData);

                    // Guardar el objeto en el localStorage
                    localStorage.setItem("publicacionesRec", JSON.stringify(jsonData));

                    alert("Datos cargados en el localStorage con éxito.");
                } catch (error) {
                    alert("Error al procesar el archivo JSON.");
                }
            };

            reader.readAsText(file);
        } else {
            alert("Por favor, selecciona un archivo JSON.");
        }

        // Remover el input después de usarlo
        document.body.removeChild(fileInput);
    };
}    

// GRABA EN TABLA SQL A PARTIR DE LOCAL STORAGE
function grabaLocalAsql(event) {
        event.preventDefault();
        // Obtener datos del localStorage
        let jsonData = localStorage.getItem("publicacionesRec");
        console.log(jsonData);
        // Verificar si hay datos
        if (!jsonData) {
            console.error("No hay datos en el localStorage.");
            return;
        }
        // Configurar la URL del archivo PHP
        let url = "./graba-Json-publicaciones.php";
    
        // Configurar la solicitud fetch
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData  // Enviar directamente la cadena JSON
        })
        .then(response => {
            // Verificar el tipo de contenido de la respuesta
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                return response.json();
            } else {
                // Si la respuesta no es JSON, manejarla como texto
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
        })
        .then(data => {
            alert("Datos enviados y procesados correctamente:")
            console.log("Datos enviados y procesados correctamente:", data);
        })
        .catch(error => {
            console.error("Error al enviar o procesar datos:", error);
            console.error("Detalles completos del error:", error.message, error.stack);
        });
}
// GRABA DIRECTO A APARTIR DE ARCHIVO EN TABLA SQL
function deArchivoAsql(event) {
    event.preventDefault();
    // Crear dinámicamente el input de tipo file
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";
    // Agregar el input al documento
    document.body.appendChild(fileInput);
    // Simular el evento change directamente
    fileInput.onchange = function () {
        let file = fileInput.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let jsonData = e.target.result;
                try {
                    jsonData = JSON.parse(jsonData);
                    grabaEnSql(jsonData);
                } catch (error) {
                    alert("Error al procesar el archivo JSON: " + error.message);
                }
            };
            reader.readAsText(file);
        } else {
            alert("Por favor, selecciona un archivo JSON.");
        }
        // Remover el input después de usarlo
        document.body.removeChild(fileInput);
    };
}
// Función para enviar datos al servidor y grabar en SQL
function grabaEnSql(data) {
    let url = "./graba-Json-publicaciones.php";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)  // Enviar directamente la cadena JSON
    })
    .then(response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json();
        } else {
            return response.text().then(text => {
                throw new Error(text);
            });
        }
    })
    .then(data => {
        alert("Datos enviados y procesados correctamente.");
        console.log("Datos enviados y procesados correctamente:", data);
    })
    .catch(error => {
        alert("Error al enviar o procesar datos: " + error.message);
        console.error("Detalles completos del error:", error.message, error.stack);
    });
}
// ---------------------- LLAVE DE ACCESO -------------
// Función para encriptar una clave y guardarla en un archivo
function encriptaClave() {
    // Obtener la clave del usuario mediante un prompt
    const claveUsuario1 = prompt('Ingrese su clave1: ');
    const claveUsuario2 = prompt('Ingrese su clave2: ');
    // Encriptar la clave
    const claveEncriptada = CryptoJS.AES.encrypt(claveUsuario1, claveUsuario2).toString();
    // Crear un objeto Blob con la clave encriptada
    const blob = new Blob([claveEncriptada], { type: 'text/plain' });
    // Crear un enlace para descargar el archivo
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = URL.createObjectURL(blob);
    // Especificar el nombre del archivo donde se guardará la clave encriptada
    enlaceDescarga.download = 'claveEncriptada.enc';
    // Agregar el enlace al cuerpo del documento y simular un clic para iniciar la descarga
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();
    // Eliminar el enlace después de la descarga
    document.body.removeChild(enlaceDescarga);
}
function validacion(event) {
    event.preventDefault();
    // Llamar a la función para desencriptar la clave
    desencriptaClave()
      .then(validada => {
        if (validada) {
        //   alert('Clave desencriptada ok');
          console.log('Clave desencriptada')
        } else {
        //   alert('Clave no desencriptada');
          console.log('Clave no desencriptada')
        }
      })
      .catch(error => {
        console.error('Error en la validación:', error.message);
        alert('Error en la validación');
      });
}
// Función para desencriptar una clave a partir de un archivo
function desencriptaClave() {
    return new Promise((resolve, reject) => {
        // Crear dinámicamente un elemento de entrada de tipo file
        const input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        // Manejar el evento de cambio en el elemento de entrada de tipo file
        input.addEventListener('change', function() {
            // Obtener el archivo seleccionado
            const archivo = input.files[0];
            // Mostrar el tamaño del archivo en bytes
            console.log('Tamaño del archivo: ' + archivo.size + ' bytes');
            // Convertir el tamaño a kilobytes
            const fileSizeInKB = archivo.size / 1024;
            console.log('Tamaño del archivo en kilobytes: ' + fileSizeInKB + ' KB')
            // Solicitar al usuario que ingrese la clave para desencriptar
            const claveDesencriptar = prompt('Ingrese la clave para desencriptar: ');
            // Leer el contenido del archivo seleccionado como Blob
            const reader = new FileReader();
            reader.onload = function() {
                const claveEncriptada = reader.result;
                // Desencriptar la clave
                try {
                    const bytesDesencriptados = CryptoJS.AES.decrypt(claveEncriptada, claveDesencriptar);
                    const claveDesencriptada = bytesDesencriptados.toString(CryptoJS.enc.Utf8);
                    if (claveDesencriptada !== '') {
                        if(claveDesencriptada===claveDesencriptar){
                            resolve(true); // Resuelve la promesa con éxito
                        } else {
                            resolve(false)
                        }
                    } else {
                        resolve(false); // Resuelve la promesa indicando que no fue válida
                    }
                } catch (error) {
                    reject(error); // Rechaza la promesa en caso de error
                } finally {
                    // Eliminar el elemento de entrada de tipo file después de la ejecución
                    document.body.removeChild(input);
                }
            };
            reader.readAsText(archivo);
        });
        // Agregar el elemento de entrada de tipo file al cuerpo del documento
        document.body.appendChild(input);
        // Abrir el cuadro de diálogo para seleccionar archivos
        input.click();
    });
}
// ------------------------- PARA MODAL modalPswUnica -------
// retorna el resultado de la validacion
function abrirModalPswUnica() {
    return new Promise((resolve) => {
      // Función para resolver la promesa con el valor deseado
      window.resolveModal = (valor) => {
        resolve(valor);
      };
  
      // Mostrar el modal
      document.getElementById('modalPswUnica').style.display = 'flex';
      document.getElementById('passwordInput').focus();
    });
}
  //SE ASUME NO RETORNA NADA
function cerrarModalPswUnica() {
      document.getElementById('passwordInput').value = '';
      document.getElementById('modalPswUnica').style.display = 'none';
}
  //RECHAZA CON RETORNO
function rechazarModalPswUnica() {
      // Cierra el modal y resuelve la promesa con false
      cerrarModalPswUnica();
      window.resolveModal(false);
      console.log('false')
}

function verificarContraseña() {
    // Obtener el valor de la contraseña ingresada
    const pass = document.getElementById('passwordInput').value;
    //validar vacio
    if(!pass){
      rechazarModalPswUnica()
      return
    }  
    desencriptaClave(pass)
      .then(validada => {
        if (validada) {
        //   alert('Clave desencriptada ok');
        //   console.log('Clave desencriptada ok')  
          const data = 'clara';
          const dataOk = JSON.stringify(data);
          localStorage.setItem('luz', dataOk);
          cerrarModalPswUnica();
          window.resolveModal(true); // Resuelve la promesa con true
        } else {
          const data = 'off';
          const dataOk = JSON.stringify(data);
          localStorage.setItem('luz', dataOk);
        //   alert('Clave no desencriptada');
        //   console.log('Clave no desencriptada')
          document.getElementById('passwordInput').select();
          document.getElementById('passwordInput').focus();
          // window.resolveModal(false); // Resuelve la promesa con false
          rechazarModalPswUnica()
        }
      })
      .catch(error => {
          const data = 'off';
          const dataOk = JSON.stringify(data);
          localStorage.setItem('luz', dataOk);
          console.error('Error en la validación:', error.message);
        //   alert('Error en la validación');
          //   window.resolveModal(false); // Resuelve la promesa con false en caso de error
          rechazarModalPswUnica() //NO PREMITIRA REINGRESO DE PSW
          
      });
}
// Función para desencriptar una clave a partir de un archivo
function desencriptaClave(claveDesencriptar) {
    return new Promise((resolve, reject) => {
      // Crear dinámicamente un elemento de entrada de tipo file
      const input = document.createElement('input');
      input.type = 'file';
      input.style.display = 'none';
      // Manejar el evento de cambio en el elemento de entrada de tipo file
      input.addEventListener('change', function() {
        // Obtener el archivo seleccionado
        const archivo = input.files[0];
        // Mostrar el tamaño del archivo en bytes
        // console.log('Tamaño del archivo: ' + archivo.size + ' bytes');
        //VALIDA EL PESO --------------------------
        const archivoSize=archivo.size
        // // Convertir el tamaño a kilobytes
        // const fileSizeInKB = archivo.size / 1024;
        // console.log('Tamaño del archivo en kilobytes: ' + fileSizeInKB + ' KB');
        let pesoOk=false
        if(archivo.size===44){
            pesoOk=true
            // console.log("el peso es correcto")
            //deben seguir las validaciones
        } else {
            pesoOk=false
            // console.log("el peso no es correcto")
            resolve(false); // Resuelve la promesa indicando que no fue válida
        }
        //-----------------------------------------
        //VALIDA DESENCRIPTACION
        // Leer el contenido del archivo seleccionado como Blob
        const reader = new FileReader();
        reader.onload = function() {
          const claveEncriptada = reader.result;
          // Desencriptar la clave
          try {
            const bytesDesencriptados = CryptoJS.AES.decrypt(claveEncriptada, claveDesencriptar);
            const claveDesencriptada = bytesDesencriptados.toString(CryptoJS.enc.Utf8);
            if (claveDesencriptada !== '') {
              if (claveDesencriptada === claveDesencriptar) {
                resolve(true); // Resuelve la promesa con éxito
              } else {
                resolve(false);
              }
            } else {
              resolve(false); // Resuelve la promesa indicando que no fue válida
            }
          } catch (error) {
            reject(error); // Rechaza la promesa en caso de error
          } finally {
            // Eliminar el elemento de entrada de tipo file después de la ejecución
            document.body.removeChild(input);
          }
        };
        reader.readAsText(archivo);
      });
      // Agregar el elemento de entrada de tipo file al cuerpo del documento
      document.body.appendChild(input);
      // Abrir el cuadro de diálogo para seleccionar archivos
      input.click();
    });
}
//METODO 1 SIMPLE
//es posible llamar el modal desde cualquier funcion para validar
async function funcionX() {
    const resultado = await abrirModalPswUnica();
    console.log(resultado); // Aquí puedes hacer algo con el resultado
    alert("el resultado de la validacion es "+resultado)
}
//METODO 2 
//es posible llamar el modal desde cualquier funcion para validar
async function otraFuncion() {
    try {
      const resultado = await abrirModalPswUnica();
      console.log(resultado); // true si la validación es exitosa, false si no lo es
      alert("el resultado de la validacion es "+resultado)
    } catch (error) {
      alert("el resultado de la validacion es "+resultado)
      console.log(resultado); // true si la validación es exitosa, false si no lo es
      console.error('Ocurrió un error al abrir el modal:', error);
    }
}
// --------------- SETING PARA MODULOS CON ACCESO ----
// PARA ELIMINAR BASE DE DATOS 
async function eliminaBaseTotalLocal(){
    const resultado = await abrirModalPswUnica();
    if (resultado){
        eliminaBaseLocal(['conexiones', 'usuarios', 'bitacoras','notas'])
    } else {
        alert("cancelado")
    }    
}
async function grabaBaseDatJson(){
    const resultado = await abrirModalPswUnica();
    if (resultado){
        grabarBaseEnJSON(['conexiones', 'usuarios', 'bitacoras','notas','tipos','articulos','inventarios'])
    } else {
        alert("cancelado")
    }    
} 
async function grabaDaseDatEnk(){
    const resultado = await abrirModalPswUnica();
    if (resultado){
        grabaBaseEncriptada(['conexiones', 'usuarios', 'bitacoras','notas','tipos','articulos','inventarios'])
    } else {
        alert("cancelado")
    }    
}  
function validaInputsFormPubs(event) {
    event.preventDefault();
    // Restablecer mensajes de error
    let errores = document.querySelectorAll('.error');
    for (let i = 0; i < errores.length; i++) {
      errores[i].innerText = '';
    }
  
    // Validar cada campo
    let titulo = document.getElementById('tituloPub').value;
    if (titulo.trim() === '') {
      document.getElementById('errorTitulo').innerText = 'El título es obligatorio.';
      document.getElementById('tituloPub').focus()
      return false;
    } else {
       if(titulo.trim()>50) {
            document.getElementById('errorTitulo').innerText = 'maximo 50 caracteres';
            document.getElementById('tituloPub').focus()
            return false;
       }
    }
  
    let autor = document.getElementById('autorPub').value;
    if (autor.trim() === '') {
      document.getElementById('errorAutor').innerText = 'El autor es obligatorio.';
      document.getElementById('autorPub').focus()
      return false;
    }
  
    let parrafo = document.getElementById('parrafoPub').value;
    if (parrafo.trim() === '') {
      document.getElementById('errorParrafo').innerText = 'El contenido es obligatorio.';
      document.getElementById('parrafoPub').focus()
      return false;
    }
  
    let firma = document.getElementById('firmaPub').value;
    if (firma.trim() === '') {
      document.getElementById('errorFirma').innerText = 'La firma es obligatoria.';
      document.getElementById('firmaPub').focus()
      return false;
    }
  
    let pie = document.getElementById('piePub').value;
    if (pie.trim() === '') {
      document.getElementById('errorPie').innerText = 'El pie de contenido es obligatorio.';
      document.getElementById('piePub').focus()
      return false;
    }
  
    let correo = document.getElementById('linkCorreoPub').value;
    if (correo.trim() === '') {
      document.getElementById('errorCorreo').innerText = 'El correo es obligatorio.';
      document.getElementById('linkCorreoPub').focus()
      return false;
    }
  
    let web = document.getElementById('linkWebPub').value;
    if (web.trim() === '') {
      document.getElementById('errorWeb').innerText = 'El enlace web es obligatorio.';
      document.getElementById('linkWebPub').focus()
      return false;
    }
  
    let wssp = document.getElementById('linkWsspPub').value;
    if (wssp.trim() === '') {
      document.getElementById('errorWssp').innerText = 'El enlace de Whatsapp es obligatorio.';
      document.getElementById('linkWsspPub').focus()
      return false;
    }
  
    // Si todo está bien, puedes enviar el formulario
    return true;
}
// --------------------------------- para despliegue publicaciones -----------
function obtenerPublicaciones() {
    // Utiliza Fetch para obtener los datos desde el archivo PHP
    fetch('publicaciones.php')
        .then(response => response.json())
        .then(data => presentaPublicaciones(data))
        .catch(error => console.error('Error al obtener las publicaciones:', error));
}
function presentaPublicaciones(publicaciones) {
    const container = document.getElementById('publicaciones-container');

    // Itera sobre cada publicación y crea una tarjeta para cada una
    publicaciones.forEach(publicacion => {
        const card = document.createElement('div');
        card.classList.add('cardPublicacion');

        // Construye el contenido de la tarjeta con los datos de la publicación
        card.innerHTML = `
            <p>ID: ${publicacion.id}</p>
            <p>Fecha: ${publicacion.fecha}</p>
            <p>Hora: ${publicacion.hora}</p>
            <p>Título: ${publicacion.titulo}</p>
            <p>Autor: ${publicacion.autor}</p>
            <p>Párrafo: ${publicacion.parrafo}</p>
            <p>Firma: ${publicacion.firma}</p>
            <p>Pie: ${publicacion.pie}</p>
            <p>Link Correo: ${publicacion.linkCorreo}</p>
            <p>Link Web: ${publicacion.linkWeb}</p>
            <p>Link WhatsApp: ${publicacion.linkWssp}</p>
        `;
        card.addEventListener('dblclick', function() {
            // Oculta gradualmente la tarjeta al hacer doble clic
                card.style.opacity = 0;
                // Elimina la tarjeta del DOM después de la transición
                setTimeout(() => {
                    container.removeChild(card);
                }, 500); // El tiempo de la transición en milisegundos (0.5s)
            // Muestra un alert con el ID al hacer doble clic
            // alert('ID: ' + publicacion.id);
        });    
        // Agrega la tarjeta al contenedor
        container.appendChild(card);
    });
}
function obtenerDatosFila(idFila) {
    // Obtener la fila
    let idF="fila-"+idFila
    let fila = document.getElementById(idF);
    // Obtener todas las celdas de la fila
    let celdas = fila.getElementsByTagName('td');

    // Crear un objeto JSON para almacenar los datos
    let datosJson = {};

    // Iterar sobre las celdas y agregar los datos al objeto JSON
    for (let i = 0; i < celdas.length - 1; i++) { // -1 para excluir el último botón de acciones
      let nombreColumna = document.querySelector('th:nth-child(' + (i + 1) + ')').innerText;
      nombreColumna=nombreColumna.toLowerCase()
      let valorCelda = celdas[i].innerText;
      datosJson[nombreColumna] = valorCelda;
    }
    // debugger
    // Convertir el objeto JSON a una cadena para mostrar o enviar
    let datosJsonString = JSON.stringify(datosJson);

    // Mostrar los datos en la consola (puedes hacer lo que quieras con los datos aquí)
    console.log(datosJsonString);
    // alert(datosJsonString)
    // return datosJsonString
    return datosJson

  }
// ----------------- MAIN ----------------
window.onload = function() {
    let hayUsuarios=siKeyLocal('usuarios')
    setAcceso('sin acceso')
    desactivaUsuarios()
    activaMod('formularioLogin');
    document.getElementById('usuarioLogin').select()
    obtenerPublicaciones();
    setInterval(mostrarFechaHoraActual, 1000);
};
