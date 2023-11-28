<?php
// Incluir el archivo de conexión
require_once './conexion.php';

// Obtener el ID de la publicación desde la solicitud GET
$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id !== null) {
    try {
        // Consulta SQL para obtener la publicación por ID
        $consulta = $conexion->prepare('SELECT * FROM publicaciones WHERE id = :id');
        $consulta->bindParam(':id', $id, PDO::PARAM_STR); // Cambiado a PDO::PARAM_STR
        $consulta->execute();

        // Obtener la fila de la base de datos como un arreglo asociativo
        $publicacion = $consulta->fetch(PDO::FETCH_ASSOC);

        // Devolver los datos como JSON
        header('Content-Type: application/json');
        echo json_encode($publicacion);
        exit; // Añade esta línea para finalizar la ejecución después de enviar la respuesta
    } catch (PDOException $e) {
        // Manejar errores de la base de datos
        http_response_code(500); // Establecer el código de respuesta HTTP
        echo json_encode(array('error' => 'Error en la conexión a la base de datos: ' . $e->getMessage()));
        exit; // Añade esta línea para finalizar la ejecución después de enviar la respuesta de error
    }
} else {
    // ID no proporcionado en la solicitud
    echo json_encode(array('error' => 'ID de publicación no proporcionado.'));
    exit; // Añade esta línea para finalizar la ejecución después de enviar la respuesta de error
}
?>
