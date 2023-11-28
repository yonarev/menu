<?php
// Ruta al archivo JSON
$rutaArchivo = 'ruta/al/archivo.json';

// Leer el contenido del archivo JSON
$contenidoJson = file_get_contents($rutaArchivo);

// Enviar los datos como respuesta
header('Content-Type: application/json');
echo $contenidoJson;
?>