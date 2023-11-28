<?php
// Al principio de tu script PHP
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Importar el archivo de conexión
require_once './conexion.php';

// Obtener datos JSON del cuerpo de la solicitud
$jsonData = file_get_contents('php://input');

// Convertir JSON a array asociativo
$data = json_decode($jsonData, true);

// Verificar si se obtuvieron datos
if ($data) {
    try {
        // Iniciar una transacción
        $conexion->beginTransaction();

        // Truncar la tabla antes de insertar nuevos datos
        $conexion->exec("TRUNCATE TABLE publicaciones");

        // Preparar la consulta para insertar datos en la tabla 'publicaciones'
        $stmt = $conexion->prepare("INSERT INTO publicaciones (id, fecha, hora, titulo, autor, parrafo, firma, pie, linkCorreo, linkWeb, linkWssp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        // Recorrer los datos y ejecutar la consulta
        foreach ($data as $row) {
            $stmt->execute([
                $row['id'],
                $row['fecha'],
                $row['hora'],
                $row['titulo'],
                $row['autor'],
                $row['parrafo'],
                $row['firma'],
                $row['pie'],
                $row['linkCorreo'],
                $row['linkWeb'],
                $row['linkWssp']
            ]);
        }

        // Confirmar la transacción
        $conexion->commit();

        // Devolver una respuesta exitosa
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        // Revertir la transacción solo si está activa
        if ($conexion->inTransaction()) {
            $conexion->rollBack();
        }

        // Manejar errores de la base de datos
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
} else {
    // Devolver una respuesta de error si no se recibieron datos JSON
    header('Content-Type: application/json');
    echo json_encode(['error' => 'No se recibieron datos JSON']);
}
?>
