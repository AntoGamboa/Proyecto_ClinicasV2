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
        public function create($nombre,$apellido,$cedula,$especialidades,$nacimiento)
        {
            $mensaje='';
            
            try{
                $query='INSERT INTO medico(cedulaMedico,nombreMedico,fe_nacimiento,apellidoMedico) VALUES(?,?,?,?);';
                $this->getConexion()->prepare($query)->execute(array($cedula,$nombre,$nacimiento,$apellido));
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
        public function readEspMedSelect($cedulaSeleccionada)
        {
            $query = 'SELECT e.idEspecialidad as codigo FROM medicoxespecialidad mxe INNER JOIN medico m ON m.cedulaMedico=mxe.cedulaMedico INNER JOIN especialidad e ON e.idEspecialidad = mxe.idEspecialidad 
            WHERE m.estado=1 AND m.cedulaMedico = ?;';
            $stmt=$this->getConexion()->prepare($query);
            $stmt->execute(array($cedulaSeleccionada));
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }
        public function readAll()
        {
            $mensaje='';
            try{
    
                return json_encode($this->Datosmedico());
            }catch(Exception $e)
            {
                $mensaje='ocurrio un error inesperado';
                return json_encode(['mensaje'=>$mensaje]);
            }
        }
        public function find($cedulaBucada)
        {
            $query='SELECT m.cedulaMedico AS cedula, m.nombreMedico AS nombre,m.apellidoMedico AS apellido, 
            IFNULL(GROUP_CONCAT(e.nombreEspecialidad SEPARATOR ", "), "Médico General") AS especialidad,m.fe_nacimiento AS nacimiento
            FROM medicoxespecialidad mxe
            RIGHT JOIN medico m ON m.cedulaMedico=mxe.cedulaMedico 
            LEFT JOIN especialidad e ON e.idEspecialidad = mxe.idEspecialidad 
            WHERE m.estado=1 AND m.cedulaMedico=? GROUP BY m.cedulaMedico;';
            $stmt=$this->getConexion()->prepare($query);
            $stmt->execute(array($cedulaBucada));
            return json_encode($stmt->fetch(pdo::FETCH_OBJ));
            
        }
        public function update($nombre,$apellido,$cedula,$nacimiento,$cedulaSeleccionada,$especialidades)
        {
            $query = 'UPDATE medico SET cedulaMedico=?,nombreMedico=?,apellidoMedico=?,fe_nacimiento=? WHERE cedulaMedico=?;';
            $this->getConexion()->prepare($query)->execute(array($cedula,$nombre,$apellido,$nacimiento,$cedulaSeleccionada));
            /*Esta solucion no me convence pero fue lo que se me ocurrio para solventar Tengo pensado volver todo esto una transaccion 
                lo que no se es como hacer para agregar mas elemento a la tabla del pivote(la de n:n) que esta relacionada con un elemento
                si se figan actualizo los datos del medico borro sus especialidades y las vuelvo a insertar
            */
            $queryDelete='DELETE FROM medicoxespecialidad WHERE cedulaMedico= ?;';
            $this->getConexion()->prepare($queryDelete)->execute(array($cedula));

            /*aqui como el array viene con los datos antiguos junto con los nuevos se vulven a insertar todos los datos */
            $queryPivot='INSERT INTO medicoxespecialidad(idEspecialidad,cedulaMedico) Values(?,?);'; 
                foreach(json_decode($especialidades) as $especialidad){
                    $this->getConexion()->prepare($queryPivot)->execute(array($especialidad,$cedula));
                }
            return json_encode(['mensaje'=>'Actualizacion exitosa']); 
        }
        public function delete($cedula){
            $query = 'UPDATE medico SET estado=? WHERE cedulaMedico=?;';
            $this->getConexion()->prepare($query)->execute(array(0,$cedula));
            return json_encode(['mensaje'=>'Eliminacion exitosa']); 
        }
        private function Datosmedico()
        {
            $query='SELECT m.cedulaMedico AS cedula, m.nombreMedico AS nombre,m.apellidoMedico AS apellido, 
            IFNULL(GROUP_CONCAT(e.nombreEspecialidad SEPARATOR ", "), "Médico General") AS especialidad,m.fe_nacimiento AS nacimiento
            FROM medicoxespecialidad mxe
            RIGHT JOIN medico m ON m.cedulaMedico=mxe.cedulaMedico 
            LEFT JOIN especialidad e ON e.idEspecialidad = mxe.idEspecialidad 
            WHERE m.estado=1 GROUP BY m.cedulaMedico;';
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
        echo $Medico->create($_POST['nombre'],$_POST['apellido'],$_POST['cedula'], $_POST['especialidades'],$_POST['nacimiento']);
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
        echo $Medico->update($_POST['nombre'],$_POST['apellido'],$_POST['cedula'],$_POST['nacimiento'],$_POST['cedulaSeleccionada'],$_POST['especialidades']);
    }
    if($accion === 'readEspMedSelect')
    {
        echo $Medico->readEspMedSelect($_POST['cedulaSeleccionada']);
    }
    if($accion === 'find')
    {
        echo $Medico->find($_POST['cedulaBuscada']);
    }

?>