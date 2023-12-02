<?php
include './conexion.php';

try {
    // Realiza la conexión a la base de datos utilizando PDO desde conexiones.php
    // Realiza la consulta a la tabla 'publicaciones'
    $stmt = $conexion->query("SELECT * FROM publicaciones");
    $publicaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retorna los datos como JSON
    header('Content-Type: application/json');
    echo json_encode($publicaciones);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conexion = null;  // Cierra la conexión
?>
