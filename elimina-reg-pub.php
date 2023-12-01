<?php
include './conexion.php';

// Recuperar datos JSON del cuerpo de la solicitud
$json_data = file_get_contents("php://input");

// Decodificar los datos JSON
$data = json_decode($json_data, true);

// Verificar si se proporciona un ID para eliminar
if (isset($data['eliminar']) && $data['eliminar'] === true) {
    try {
        $stmt = $conexion->prepare("DELETE FROM publicaciones WHERE id = :id");
        $stmt->bindParam(':id', $data['id']);
        $stmt->execute();

        $response["success"] = true;
        echo json_encode($response);
    } catch (PDOException $e) {
        $response["success"] = false;
        $response["message"] = "Error al eliminar el registro: " . $e->getMessage();
        echo json_encode($response);
    }
}

$conexion = null; // Cerrar la conexión
?>
