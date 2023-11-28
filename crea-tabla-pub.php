<?php
require_once "./conexion.php";
try {
    // $conexion = new PDO("mysql:host=localhost;dbname=nombre_base_de_datos", "usuario", "contraseña");
    // $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar si la tabla 'publicaciones' ya existe
    $sql = "SHOW TABLES LIKE 'publicaciones'";
    $result = $conexion->query($sql);

    if ($result->rowCount() > 0) {
        echo "La tabla 'publicaciones' ya existe.";
    } else {
        // Crear la tabla 'publicaciones'
        $sql = "CREATE TABLE publicaciones (
            id VARCHAR(30) PRIMARY KEY,
            fecha VARCHAR(30) NOT NULL,
            hora VARCHAR(30) NOT NULL,
            titulo VARCHAR(50) NOT NULL,
            autor VARCHAR(30) NOT NULL,
            parrafo TEXT NOT NULL,
            firma VARCHAR(20) NOT NULL,
            pie VARCHAR(50) NOT NULL,
            linkCorreo VARCHAR(30) NOT NULL,
            linkWeb VARCHAR(100) NOT NULL,
            linkWssp VARCHAR(50) NOT NULL
        )";

        $conexion->exec($sql);
        echo "La tabla 'publicaciones' ha sido creada exitosamente.";
    }

    // Cerrar la conexión
    $conexion = null;
} catch (PDOException $e) {
    echo "Error al crear la tabla: " . $e->getMessage();
}

?>