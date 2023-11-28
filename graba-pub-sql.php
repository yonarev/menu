<?php
include './conexion.php';
// Recuperar datos JSON del cuerpo de la solicitud
$json_data = file_get_contents("php://input");
// Decodificar los datos JSON
$data = json_decode($json_data, true);
// Actualizar o insertar en la tabla 'publicaciones'
try {
    $stmt = $conexion->prepare("INSERT INTO publicaciones (id, fecha, hora, titulo, autor, parrafo, firma, pie, linkCorreo, linkWeb, linkWssp) 
                            VALUES (:id, :fecha, :hora, :titulo, :autor, :parrafo, :firma, :pie, :linkCorreo, :linkWeb, :linkWssp)
                            ON DUPLICATE KEY UPDATE
                            fecha = VALUES(fecha),
                            hora = VALUES(hora),
                            titulo = VALUES(titulo),
                            autor = VALUES(autor),
                            parrafo = VALUES(parrafo),
                            firma = VALUES(firma),
                            pie = VALUES(pie),
                            linkCorreo = VALUES(linkCorreo),
                            linkWeb = VALUES(linkWeb),
                            linkWssp = VALUES(linkWssp)");
    $stmt->bindParam(':id', $data['id']);
    $stmt->bindParam(':fecha', $data['fecha']);
    $stmt->bindParam(':hora', $data['hora']);
    $stmt->bindParam(':titulo', $data['titulo']);
    $stmt->bindParam(':autor', $data['autor']);
    $stmt->bindParam(':parrafo', $data['parrafo']);
    $stmt->bindParam(':firma', $data['firma']);
    $stmt->bindParam(':pie', $data['pie']);
    $stmt->bindParam(':linkCorreo', $data['linkCorreo']);
    $stmt->bindParam(':linkWeb', $data['linkWeb']);
    $stmt->bindParam(':linkWssp', $data['linkWssp']);
    $stmt->execute();
    echo "Registro insertado o actualizado correctamente";
} catch (PDOException $e) {
    echo "Error al insertar o actualizar el registro: " . $e->getMessage();
}
$conexion = null; // Cerrar la conexión
?>
