<?php
include 'conexion.php';

try {
    $table_name = 'publicaciones';

    // Verificar si la tabla existe antes de intentar eliminarla
    $check_table_query = "SHOW TABLES LIKE '$table_name'";
    $table_exists = $conexion->query($check_table_query)->rowCount() > 0;

    if ($table_exists) {
        $sql = "DROP TABLE $table_name";
        $conexion->exec($sql);
        echo "La tabla '$table_name' ha sido eliminada correctamente";
    } else {
        echo "La tabla '$table_name' no existe";
    }
} catch (PDOException $e) {
    echo "Error al eliminar la tabla: " . $e->getMessage();
}

$conexion = null; // Cerrar la conexión
?>
