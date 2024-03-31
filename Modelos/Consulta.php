<?php
    header('Access-Control-Allow-Origin: *');
    require_once($_SERVER['DOCUMENT_ROOT'].'/Proyecto_ClinicasV2/Conexion/conexion.php');
    class Consulta extends conexion
    {
        public function __construct()
        {
            parent::__construct();
        }
        public function create($cedulaMedico,$cedulaPaciente,$descripcion,$patologias,$peso,$estatura)
        {
            $mensaje= '';
            try
            {
                $query='INSERT INTO consulta(cedulaMedico,cedulaPaciente,descripcion) VALUES(?,?,?);';
                $this->getConexion()->prepare($query)->execute(array($cedulaMedico,$cedulaPaciente,$descripcion));
                $queryLastIndex = 'SELECT LAST_INSERT_ID() as ultimoid FROM consulta;';
                $stmt=$this->getConexion()->prepare($queryLastIndex);
                $stmt->execute();
                $result  = $stmt->fetch(PDO::FETCH_ASSOC);
                $LastIndex = $result['ultimoid'];
                $queryPivot ='INSERT INTO patologiaxconsulta(id_consulta,idPatologia) VALUES(?,?)';
                foreach(json_decode($patologias) as $patologia)
                {
                    $this->getConexion()->prepare($queryPivot)->execute(array($LastIndex,$patologia));
                }
                $queryImc = 'INSERT INTO imc(cedulaPaciente,pesoPaciente,estaturaPaciente) VALUES(?,?,?)';
                $this->getConexion()->prepare($queryImc)->execute(array($cedulaPaciente,$peso,$estatura));
                $mensaje='Registro exitoso';
            }catch(Exception $e)
            {
                $mensaje = $e->getMessage();

            }finally{
                return json_encode(['mensaje'=>$mensaje]);
            }   
        }
        public function read() //Para el reporte
        {
            $mensaje = '';
            try {
                $query ='SELECT p.cedulaPaciente AS cedulapaci,p.nombrePaciente AS nombrepaci,p.apellidoPaciente AS apellidopaci,p.fe_nacimiento 
                AS nacimientopaci,
                m.cedulaMedico AS cedulamedi,m.nombreMedico AS nombremedi,m.apellidoMedico AS apellidomedi,
                IFNULL(GROUP_CONCAT(e.nombreEspecialidad SEPARATOR ", "),"Medico General" ) AS especialidad
                ,c.descripcion,IFNULL(GROUP_CONCAT(pa.nombrePatologia SEPARATOR ", "),"Sin Patologias" ) AS patologia
                FROM consulta c 
                RIGHT JOIN paciente p ON p.cedulaPaciente = c.cedulaPaciente 
                LEFT JOIN patologiaxconsulta pxc ON pxc.id_consulta = c.id_consulta
                LEFT JOIN patologia pa ON pa.idPatologia = pxc.idPatologia
                INNER JOIN medico m ON m.cedulaMedico = c.cedulaMedico
                LEFT JOIN medicoxespecialidad mxe ON m.cedulaMedico = mxe.cedulaMedico
                LEFT JOIN especialidad e ON  e.idEspecialidad = mxe.idEspecialidad
                GROUP BY p.cedulaPaciente;'; 

                $stmt = $this->getConexion()->prepare($query);
                $stmt->execute();
                $mensaje = 'Carga exitosa';
                return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
                
            } catch (Exception $e) {
                $mensaje = 'Ocurrio un error en la carga';
            }
        }

        public function readTabla()  
        {
            $mensaje = '';

            try{
                $query = 'SELECT c.id_consulta as id, p.nombrePaciente as nombre, p.apellidoPaciente as apellido,
                p.cedulaPaciente as cedula, c.fechaConsulta as fecha 
                from consulta c INNER JOIN paciente p on c.cedulaPaciente = p.cedulaPaciente;';

                $stmt = $this->getConexion()->prepare($query);
                $stmt->execute();
                $mensaje = 'Carga exitosa';
                return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));


            } catch (Exception $e) {
                $mensaje = 'Ocurrio un error en la carga';
            }
            
        }

        public function buscar($cedulaBuscada)
        {
            $mensaje = '';

            try{
                $query = 'SELECT c.id_consulta as id, p.nombrePaciente as nombre, p.apellidoPaciente as apellido,
                p.cedulaPaciente as cedula, c.fechaConsulta as fecha 
                from consulta c INNER JOIN paciente p on c.cedulaPaciente = p.cedulaPaciente 
                WHERE c.cedulaPaciente = ? ;';

                $stmt = $this->getConexion()->prepare($query);
                $stmt->execute(array($cedulaBuscada));
                $mensaje = 'Carga exitosa';
                return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));


            } catch (Exception $e) {
                $mensaje = 'Ocurrio un error en la carga';
            }
        }
    }

    $Consulta = new Consulta();
    $accion = $_POST['accion'];
    if($accion === 'create'){
        echo $Consulta->create($_POST['cedulaMedico'],$_POST['cedulaPaciente'],$_POST['descripcion'],$_POST['patologias'],$_POST['peso'],$_POST['estatura']);
    }
    if ($accion === 'read') {
        echo $Consulta->read();
    }
    if ($accion === 'readTabla') {
        echo $Consulta->readTabla();
    }
    if ($accion === 'buscar') {
        $cedulaBuscada = $_POST['cedula'];
        echo $Consulta->buscar($cedulaBuscada);
    }

?>