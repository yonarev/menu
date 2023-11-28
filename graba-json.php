<!-- <?php
// Obtener los datos enviados desde JavaScript
$data = file_get_contents('php://input');
// Validar los datos (ejemplo)
if (empty($data)) {
  http_response_code(400);
  echo "Error: No se han proporcionado datos válidos.";
  exit;
}
// Ruta al archivo JSON en el disco duro
$rutaArchivo = './bd/publicacion.json';
try {
  // Guardar los datos en el archivo JSON
  $resultado = file_put_contents($rutaArchivo, $data);
  if ($resultado === false) {
    throw new Exception("Error al guardar los datos en el archivo JSON.");
  }
  echo "Datos guardados exitosamente en el archivo JSON.";
} catch (Exception $e) {
  http_response_code(500);
  echo "Error: " . $e->getMessage();
}
?> 