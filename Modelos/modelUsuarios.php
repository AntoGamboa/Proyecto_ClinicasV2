<?php
    require_once("/XAMP/htdocs/Proyecto_Clinicasv2/Conexion/conexion.php");
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
                INSERT INTO Usuarios(nombre,apellido,correo,usuario,contraseña) values(?,?,?,?,?);
            eot;
            $this->getConexion()->prepare($query)->execute(array($nombre, $apellido, $correo, $usuario, $password));

        }
    }
    $usuario=new Usuarios();
    $accion=$_POST["accion"];
   
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $correo = $_POST["correo"];
    $usuario = $_POST["usuario"];
    $password = $_POST["contraseña"];
    
    if(isset($accion) )
    {
        $usuario->$accion($nombre , $apellido ,$correo, $usuario, $password); 
    }



?>