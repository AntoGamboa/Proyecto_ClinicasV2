<?php
    header('Access-Control-Allow-Origin: *');
    require_once("../Conexion/conexion.php");
    class Usuarios extends conexion
    {
        private $nombre;
        private $apellido;
        private $correo;
        private $usuario;
        private $password;
        
        public function getNombre() { return $this->nombre; } 
        public function setNombre($nombre) { $this->nombre = $nombre; } 
       
        public function getApellido() { return $this->apellido; } 
        public function setApellido($apellido) { $this->apellido = $apellido; }
        
        public function getCorreo() { return $this->correo; } 
        public function setCorreo($correo) { $this->correo = $correo; }
        
        public function getUsuario() { return $this->usuario; } 
        public function setUsuario($usuario) { $this->usuario = $usuario; } 
       
        public function getPassword() { return $this->password; } 
        public function setPassword($password) { $this->password = $password; }
        
        public function __construct()
        {   
            parent::__construct();
        }
        
        public function CrearRegistro($nombre, $apellido, $correo, $usuario, $password)
        {
            $query= <<<eot
                INSERT INTO usuarios(nombre,apellido,correo,usuario,contraseña) values (?,?,?,?,?);
            eot;
            $this->getConexion()->prepare($query)->execute(array($nombre, $apellido, $correo, $usuario, $password));

        }
        public function logearse($correo,$password)
        {
            $query = <<<eot
                Select * from usuarios where correo = ? and contraseña = ?
            eot;
            $stmt=$this->getConexion()->prepare($query);
            $stmt->execute(array($correo,$password));
            return json_encode($stmt->fetch(PDO::FETCH_OBJ));
        
        }
    }
    $objUsuario=new Usuarios();
    $accion=$_POST["accion"];
    if(isset($accion) )
    {
        try
        {
            if($accion === 'crearregistro'){
                
                $nombre = $_POST["nombre"];
                $apellido = $_POST["apellido"];
                $correo = $_POST["correo"];
                $usuario = $_POST["usuario"];
                $password = $_POST["Contraseña"];
                if(empty($nombre)||empty($apellido)||empty($correo)||empty($usuario)||empty($correo))
                {
                    echo json_encode(["mensaje" => "Existen campos vacios"]);
                } else{
                    $objUsuario->$accion($nombre , $apellido ,$correo, $usuario, $password); 
                    echo json_encode(["mensaje" => "Registro exitoso"]);
                }     
            }
            if($accion === 'logearse'){
                $correo = $_POST["correo"];
                $password = $_POST["Contraseña"];
                echo $objUsuario->logearse($correo,$password);
            }
        }
        catch(Exception $e)
        {
            echo json_encode(["mensaje" => $e->getMessage()]);
        }
    }
?>