<?php
    header('Access-Control-Allow-Origin: *');
    require_once($_SERVER['DOCUMENT_ROOT'].'/Proyecto_ClinicasV2/Conexion/conexion.php');

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
        public function create($nombre,$apellido,$cedula,$especialidades)
        {
            $mensaje='';
            
            try{
                
      
                $query='INSERT INTO medico(cedulaMedico,nombreMedico,apellidoMedico) VALUES(?,?,?);';
                $this->getConexion()->prepare($query)->execute(array($cedula,$nombre,$apellido));

                $queryPivot='INSERT INTO medicoxespecialidad(idEspecialidad,cedulaMedico) Values(?,?)'; 
                foreach(json_decode($especialidades) as $especialidad){
                    $this->getConexion()->prepare($queryPivot)->execute(array($especialidad,$cedula));
                }
                $mensaje='Registro Exitoso';
            }catch(Exception $e){
                $mensaje=$e->getMessage();
            }finally
            {
                return json_encode(['mensaje'=>$mensaje]);
            }
        }
        public function readAll()
        {
            $mensaje='';
            
            try{

                return json_encode($this->espMedico());

            }catch(Exception $e)
            {

                $mensaje='ocurrio un error inesperado';
                return json_encode(['mensaje'=>$mensaje]);

            }
        }
        public function update($nombre,$apellido,$cedula,$cedulaSeleccionada)
        {
            $query = 'UPDATE medico SET cedulaMedico=?,nombreMedico=?,apellidoMedico=? WHERE cedulaMedico=?;';
            $this->getConexion()->prepare($query)->execute(array($cedula,$nombre,$apellido,$cedulaSeleccionada));
            return json_encode(['mensaje'=>'registro exitoso']); 
        }
        public function delete($cedula){
            $query = 'UPDATE medico SET estado=? WHERE cedulaMedico=?;';
            $this->getConexion()->prepare($query)->execute(array(0,$cedula));
            return json_encode(['mensaje'=>'Eliminacion exitosa']); 
        }
        private function espMedico()
        {
            $stringEspeciliadades = '';
            $query='SELECT m.cedulaMedico AS cedula, m.nombreMedico AS nombre,m.apellidoMedico AS apellido, GROUP_CONCAT(e.nombreEspecialidad SEPARATOR ",") AS especialidad FROM medicoxespecialidad mxe INNER JOIN medico m ON m.cedulaMedico=mxe.cedulaMedico INNER JOIN especialidad e ON e.idEspecialidad = mxe.idEspecialidad  WHERE m.estado=1 GROUP BY m.cedulaMedico ORDER BY m.cedulaMedico;';
            $stmt=$this->getConexion()->prepare($query);
            $stmt->execute();
            $arrayEspe = $stmt->fetchAll(pdo::FETCH_OBJ);
            return $arrayEspe;
        }
    }



    $Medico= new Medico();
    $accion=$_POST['accion'];
    
    if($accion === 'create')
    {   
        echo $Medico->create($_POST['nombre'],$_POST['apellido'],$_POST['cedula'], $_POST['especialidades']);
    }
    if($accion === 'readAll')
    {
        echo $Medico->readAll();
    }
    if($accion === 'eliminar')
    {
         $cedula=$_POST['cedula'];
        echo $Medico->delete($cedula);
    }
    if($accion === 'update')
    {
        echo $Medico->update($_POST['nombre'],$_POST['apellido'],$_POST['cedula'],$_POST['cedulaSeleccionada']);
    }

?>