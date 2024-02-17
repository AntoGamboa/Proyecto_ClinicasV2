<?php
     header('Access-Control-Allow-Origin: *');
     header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
     require_once("../Conexion/conexion.php");
     class Paciente extends conexion
     {
        private $cedula;
        private $nombre;
        private $apellido;
        private $tlfnoPaciente;
        private $tlfnoEmergencia;
        public function getCedula() { return $this->cedula; } 
        public function setCedula($cedula) { $this->cedula = $cedula; } 
        public function getNombre() { return $this->nombre; } 
        public function setNombre($nombre) { $this->nombre = $nombre; } 
        public function getApellido() { return $this->apellido; } 
        public function setApellido($apellido) { $this->apellido = $apellido; } 
        public function getTlfnoPaciente() { return $this->tlfnoPaciente; } 
        public function setTlfnoPaciente($tlfnoPaciente) { $this->tlfnoPaciente = $tlfnoPaciente; }
        public function getTlfnoEmergencia() { return $this->tlfnoEmergencia; } 
        public function setTlfnoEmergencia($tlfnoEmergencia) { $this->tlfnoEmergencia = $tlfnoEmergencia; }
        public function __construct()
        {
            parent::__construct();
        }
        public function Create($cedula,$nombre,$apellido,$tlfnoPaciente,$tlfnoEmergencia)
        {
            $mensaje='';
            try{
                $query= 'INSERT INTO paciente(cedulaPaciente,nombrePaciente,apellidoPaciente,tlfonoPaciente,tlfonoEmergencia) VALUES(?,?,?,?,?);';
                $this->getConexion()->prepare($query)->execute(array($cedula,$nombre,$apellido,$tlfnoPaciente,$tlfnoEmergencia));
                $mensaje='Registro exitoso';
            }
            catch(Exception $e)
            {
                if($e->getCode() === '23000'){
                    $mensaje='Ya exite un paciente con esa cedula';
                }
            }finally{
                
                return json_encode(["mensaje"=>$mensaje]);            
            }
        }
        public function readAll()
        {
            
            try{
                $query= 'SELECT cedulaPaciente AS Cedula, nombrePaciente AS Nombre,apellidoPaciente AS Apellido,tlfonoPaciente AS TelefonoPrincipal, tlfonoEmergencia AS TelefonoEmergencia FROM paciente;';
                $stmt = $this->getConexion()->prepare($query);
                $stmt->execute();
                return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
            } catch(Exception $e){

                $mensaje='Ocurrio un error en la busqueda';

            }
            
        }
     }
     $Paciente = new paciente();
     @$accion=$_POST["accion"]; 
     
     if($accion === 'create')
     {
        echo $Paciente->Create($_POST['cedula'],$_POST['nombre'],$_POST['apellido'],$_POST['telefono'],$_POST['telefonoemergencia']);
     }
     if($accion === "readAll")
     {
        echo $Paciente->readAll();
     }
?>