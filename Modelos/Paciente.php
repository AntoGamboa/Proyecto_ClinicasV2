<?php
     header('Access-Control-Allow-Origin: *');
     header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
     require_once($_SERVER['DOCUMENT_ROOT']."/Proyecto_ClinicasV2/Conexion/conexion.php");
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
        public function Create($cedula,$nombre,$apellido,$tlfnoPaciente,$tlfnoEmergencia,$nacimiento,$alergias)
        {
            $mensaje='';
            try{
                $query= 'INSERT INTO paciente(cedulaPaciente,nombrePaciente,apellidoPaciente,fe_nacimiento,tlfonoPaciente,tlfonoEmergencia) VALUES(?,?,?,?,?,?);';
                $this->getConexion()->prepare($query)->execute(array($cedula,$nombre,$apellido,$nacimiento,$tlfnoPaciente,$tlfnoEmergencia));
                $querypivot = 'INSERT INTO alergiaxpaciente(cedulaPaciente,idAlergia) values(?,?)';
                foreach(json_decode($alergias) as $alergia)
                {
                    $this->getConexion()->prepare($querypivot)->execute(array($cedula,$alergia));
                }
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
        public function readAlerpaciente($cedulaSeleccionada){
            $query='SELECT idAlergia FROM alergiaxpaciente WHERE cedulaPaciente=?';
            $stmt = $this->getConexion()->prepare($query);
            $stmt->execute(array($cedulaSeleccionada));
            return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
        }
        public function readAll()
        {
            
            try{
                $query= '
                    SELECT p.cedulaPaciente AS cedula ,p.nombrePaciente AS nombre ,p.apellidoPaciente AS apellido ,p.fe_nacimiento AS nacimiento
                    ,p.tlfonoPaciente AS telefono,p.tlfonoEmergencia AS telefonoE,
                    IFNULL(GROUP_CONCAT(a.nombreAlergia SEPARATOR", "),"Sin alergias") AS alergias
                    FROM alergiaxpaciente axp 
                    RIGHT JOIN paciente p ON p.cedulaPaciente=axp.cedulaPaciente 
                    LEFT  JOIN alergia  a ON a.idAlergia = axp.idAlergia
                    GROUP BY p.cedulaPaciente;';
                $stmt = $this->getConexion()->prepare($query);
                $stmt->execute();
                return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
            } catch(Exception $e){

                $mensaje='Ocurrio un error en la busqueda';

            }
            
        }
        public function update($cedula,$nombre,$apellido,$tlfnoPaciente,$tlfnoEmergencia,$cedulaSeleccionada,$nacimiento,$alergias)
        {
            $query='UPDATE paciente SET cedulaPaciente=?,nombrePaciente=?,apellidoPaciente=?,fe_nacimiento=?,tlfonoPaciente=?,tlfonoEmergencia=? WHERE cedulaPaciente=?;';
            $this->getConexion()->prepare($query)->execute(array($cedula,$nombre,$apellido,$nacimiento,$tlfnoPaciente,$tlfnoEmergencia,$cedulaSeleccionada));
            $queryDel='DELETE FROM alergiaxpaciente WHERE cedulaPaciente = ?';
            $this->getConexion()->prepare($queryDel)->execute(array($cedulaSeleccionada));
            $querypivot = 'INSERT INTO alergiaxpaciente(cedulaPaciente,idAlergia) values(?,?)';
            foreach(json_decode($alergias) as $alergia)
            {
                $this->getConexion()->prepare($querypivot)->execute(array($cedula,$alergia));
            }
            echo json_encode(['mensaje'=>'actualizacion exitosa']);
        }
        public function delete($cedula)
        {
            $query='UPDATE paciente SET estado = 0 WHERE cedulaPaciente=?;';
            $this->getConexion()->prepare($query)->execute(array($cedula));
            echo json_encode(['mensaje'=>'Eliminacion exitosa']);
        }
     }
     $Paciente = new paciente();
     $accion=$_POST["accion"]; 
     
     if($accion === 'create')
     {
        
       
        echo $Paciente->Create($_POST['cedula'],$_POST['nombre'],$_POST['apellido'],$_POST['telefono'],$_POST['telefonoemergencia'],$_POST['nacimiento'],$_POST['alergias']);
        
     }
     if($accion === "readAll")
     {
        echo $Paciente->readAll();
     }
     if($accion === "eliminar")
     {
        $cedula = $_POST['cedula'];
        echo $Paciente->delete($cedula);      
     }
     if ($accion === "update") 
    {

        echo $Paciente->update($_POST['cedula'],$_POST['nombre'],$_POST['apellido'],$_POST['telefono'],$_POST['telefonoemergencia'],$_POST['cedulaSeleccionada'],$_POST['nacimiento'],$_POST['alergias']);
    }
    if($accion === "readAlerpaciente")
    {
        echo $Paciente->readAlerpaciente($_POST['cedulaSeleccionada']);
    }

?>