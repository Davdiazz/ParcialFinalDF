<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$Password = "";
$dbname = "test";

$conn = new mysqli($servername, $username, $Password, $dbname);

// Verificar conexión
if (!isset($_POST['Email']) || !isset($_POST['Password'])) {
    die("Error: Datos del formulario no recibidos correctamente.");
}

// Obtener datos del formulario
$Email = $_POST['Email'];
$Password = $_POST['Password'];

// Consulta preparada para mayor seguridad
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE Email = ? AND Password = ?");
$stmt->bind_param("ss", $Email, $Password); // 'ss' indica dos cadenas (string)

// Ejecutar consulta
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Inicio de sesión exitoso
    $user = $result->fetch_assoc(); // Obtener los datos del usuario
    session_start();
    $_SESSION['email'] = $user['Email'];
    $_SESSION['name'] = $user['Nombre']; // Asumiendo que la columna del nombre se llama 'Nombre'

    // Redirigir al usuario a la página de inicio
    header("Location: inicio.php"); // Cambia 'inicio.php' por la página que desees
    exit(); // Asegúrate de detener la ejecución después de redirigir
} else {
    // Credenciales incorrectas
    header("Location: ../Index.html?error=1");
    exit();
}
if (isset($_GET['message']) && $_GET['message'] == 'registro_exitoso') {
    echo "<script>alert('Usuario registrado exitosamente!');</script>";
}
if (isset($_GET['message']) && $_GET['message'] == 'registro_exitoso') {
    echo "<div style='color: green; font-weight: bold;'>¡Registro exitoso! Bienvenido.</div>";
}
?>