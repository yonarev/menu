<?php

require_once "./conexion.php";
$response = array();

try {
    // Verifica si se proporciona un ID válido
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        // Consulta para eliminar la publicación con el ID proporcionado
        $sql = "DELETE FROM publicaciones WHERE id = :id";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        // Verifica si se eliminó alguna fila
        if ($stmt->rowCount() > 0) {
            $response["success"] = true;
        } else {
            $response["success"] = false;
            $response["message"] = "No se encontró la publicación con el ID proporcionado.";
        }
    } else {
        $response["success"] = false;
        $response["message"] = "No se proporcionó un ID válido.";
    }
} catch (PDOException $e) {
    $response["success"] = false;
    $response["error"] = $e->getMessage();
}

// Devolver la respuesta como JSON
header("Content-type: application/json");
echo json_encode($response);

// Cerrar la conexión a la base de datos
$conexion = null;

?>
