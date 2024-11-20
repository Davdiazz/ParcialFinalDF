<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test"; // Cambia esto por el nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Recibir los datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$email = $_POST['email'];
$password = $_POST['password'];

// Validar si los campos están vacíos
if (empty($nombre) || empty($apellido) || empty($email) || empty($password)) {
    header("Location: index.php?error=campos_vacios");
    exit;
}

// Verificar si el correo electrónico ya está registrado
$sql = "SELECT * FROM usuarios WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<div>
            <p>El correo ya está registrado.</p>
            <form action='../index.html' method='get'>
                <button type='submit'>Volver al Inicio</button>
            </form>
          </div>";
    exit;
}

// Insertar el nuevo usuario en la base de datos
$sql = "INSERT INTO usuarios (name, subname, email, password) VALUES ('$nombre', '$apellido', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    header("Location: ../index.html?message=registro_exitoso");
} else {
    header("Location: index.html?error=error_registro");
}

// Cerrar la conexión
$conn->close();
?>
