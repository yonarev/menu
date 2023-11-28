<?php
// Incluir el archivo de conexión
require_once './conexion.php';

// Obtener el ID de la publicación desde la solicitud GET
$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id !== null) {
    try {
        // Consulta SQL para obtener la publicación por ID
        $consulta = $conexion->prepare('SELECT * FROM publicaciones WHERE id = :id');
        $consulta->bindParam(':id', $id, PDO::PARAM_INT);
        $consulta->execute();

        // Obtener la fila de la base de datos como un arreglo asociativo
        $publicacion = $consulta->fetch(PDO::FETCH_ASSOC);

        // Devolver los datos como JSON
        header('Content-Type: application/json');
        echo json_encode($publicacion);
    } catch (PDOException $e) {
        // Manejar errores de la base de datos
        echo json_encode(array('error' => 'Error en la conexión a la base de datos: ' . $e->getMessage()));
    }
} else {
    // ID no proporcionado en la solicitud
    echo json_encode(array('error' => 'ID de publicación no proporcionado.'));
}
?>
