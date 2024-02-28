<?php
    header('Access-Control-Allow-Origin: *');
    require_once($_SERVER['DOCUMENT_ROOT'].'/Proyecto_ClinicasV2/Conexion/conexion.php');
    
    class Especialidad extends conexion
    {
        private $idEspecialidad;
        private $nombreEspecialidad;
        public function getIdEspecialidad() { return $this->idEspecialidad; } 
        public function setIdEspecialidad($idEspecialidad) { $this->idEspecialidad = $idEspecialidad; }
        public function getNombreEspecialidad() { return $this->nombreEspecialidad; } 
        public function setNombreEspecialidad($nombreEspecialidad) { $this->nombreEspecialidad = $nombreEspecialidad; }

        public function __construct()
        {
            parent::__construct();
        }
        public function create($idEspecialidad,$nombreEspecialidad)
        {
            $mensaje='';
            try{
                $query='INSERT INTO especialidad(idEspecialidad,nombreEspecialidad) values (?,?)';
                $this->getConexion()->prepare($query)->execute(array($idEspecialidad,$nombreEspecialidad));
            }catch(Exception $e){
                if($e->getCode() === '23000'){
                    $mensaje='Ya exite una Especialidad con ese Codigo';
                }
            }finally
            {
                return json_encode(['mensaje'=>$mensaje]);
            }

        }
        public function readAll()
        {
            $query='SELECT idEspecialidad AS codigo,nombreEspecialidad AS nombre FROM especialidad ';
            $stmt=$this->getConexion()->prepare($query);
            $stmt->execute();
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }
        public function update($idEspecialidad,$nombreEspecialidad)
        {
            $query='UPDATE especialidad set idEspecialidad=?, nombreEspecialidad=? WHERE idEspecialidad=?';
            $this->getConexion()->prepare($query)->execute(array($idEspecialidad,$nombreEspecialidad));
            return json_encode(['mensaje'=> 'Actualizacion exitosa']);

        }
        public function delete($idEspecialidad){
            $query = 'UPDATE especialidad SET estado=? WHERE idEspecialidad=?;';
            $this->getConexion()->prepare($query)->execute(array($idEspecialidad,0));
            return json_encode(['mensaje'=>'Eliminacion exitosa']); 
        }
    }
    

    $especialidad= new Especialidad();
    $accion=$_POST['accion'];
    
    
    if($accion === 'create')
    {
        echo $especialidad->create($_POST['codigo'],$_POST['nombre']);
    }
    if($accion === 'readAll')
    {
        echo $especialidad->readAll();
    }
    if($accion === 'eliminar')
    {
        echo $especialidad->delete($_POST['codigo']);
    }

?>