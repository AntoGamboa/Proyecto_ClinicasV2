<?php
    require_once('/XAMP/htdocs/Proyecto_ClinicasV2/Conexion/conexion.php');
    class Medico extends conexion
    {
        private $nombre;
        private $apellido;
        private $cedula;
        public function getNombre() { return $this->nombre; } 
        public function setNombre($nombre) { $this->nombre = $nombre; } 
        public function getApellido() { return $this->apellido; } 
        public function setApellido($apellido) { $this->apellido = $apellido; }
        public function getCedula() { return $this->cedula; } 
        public function setCedula($cedula) { $this->cedula = $cedula; }
        
        public function __construct()
        {
            parent::__construct();
        }
        public function create($nombre,$apellido,$cedula)
        {
            $mensaje='';
            try{
                $query='INSERT INTO medico(cedulaMedico,nombreMedico,apellidoMedico) VALUES(?,?,?);';
                $this->getConexion()->prepare($query)->execute(array($cedula,$nombre,$apellido));
            }catch(Exception $e){
                if($e->getCode() === '23000'){
                    $mensaje='Ya exite un medico con esa cedula';
                }
            }finally
            {
                return json_encode(['mensaje'=>$mensaje]);
            }
        }
        public function readAll()
        {
            $mensaje='';
            try{
                $query='SELECT * FROM medico';
                $stmt=$this->getConexion()->prepare($query);
                $stmt->execute();
                return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
            }catch(Exception $e)
            {
                $mensaje='ocurrio un error inesperado';
                return json_encode(['mensaje'=>$mensaje]);
            }
        }
    }
    $Medico= new Medico();
    $accion=$_POST['accion'];
    if($accion === 'create')
    {
        echo $Medico->create($_POST['nombre'],$_POST['apellido'],$_POST['cedula']);
    }
    if($accion === 'readAll')
    {
        echo $Medico->readAll();
    }

?>