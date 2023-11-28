<?php
require_once "./conexion.php";
$response = array();
try {
    // Consulta para obtener los publicacions de la base de datos (reemplaza con tu propia consulta)
    $sql = "SELECT * FROM publicaciones";
    $result = $conexion->query($sql);

    if ($result->rowCount() > 0) {
        $response["success"] = true;
        $response["publicaciones"] = array();

        // Obtener los datos de cada fila y agregarlos al array de publicaciones
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $publicacion = array(
                "id" => $row["id"],
                "fecha" => $row["fecha"],
                "hora" => $row["hora"],
                "titulo" => $row["titulo"],
                "autor" => $row["autor"],
                "parrafo" => $row["parrafo"],
                "firma" => $row["firma"],
                "pie" => $row["pie"],
                "linkCorreo" => $row["linkCorreo"],
                "linkWeb" => $row["linkWeb"],
                "linkWssp" => $row["linkWssp"],
            );
            array_push($response["publicaciones"], $publicacion);
        }
    } else {
        $response["success"] = false;
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
