<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    require_once($_SERVER['DOCUMENT_ROOT'].'/Proyecto_ClinicasV2/Conexion/conexion.php');

    class Patologia extends conexion
    {   
        private $idPatologia;
        private $nombrePatologia;

        
        public function getIdPatologia(){return $this->idPatologia;}
        public function setIdPatologia($idPatologia){$this->idPatologia=$idPatologia;return $this;}

        public function getNombrePatologia(){return $this->nombrePatologia;}
        public function setNombrePatologia($nombrePatologia){$this->nombrePatologia = $nombrePatologia;return $this;}

        public function __construct()
        {
            parent::__construct();
        }

        public function create($idPatologia,$nombrePatologia)
        {
            $mensaje = '';
           
            try 
            {
                $query = 'INSERT INTO patologia(idPatologia,nombrePatologia) Values(?,?);';
                $this->getConexion()->prepare($query)->execute(array($idPatologia,$nombrePatologia));
                $mensaje = 'Registro Completado exitosamente';
            }
             catch (Exception $e) 
            {
                if($e->getCode() === '23000'){
                    $mensaje='Ya esta registrada esa Patologia';
                }
            }
            finally
            {
                return json_encode(['mensaje'=>$mensaje]);
            }
        }

        public function readAll()
        {   
            $mensaje = '';
            try {
                $query = 'SELECT idPatologia as codigo, nombrePatologia as nombre FROM patologia;';
                $stmt = $this->getConexion()->prepare($query);
                $stmt->execute();
                return json_encode($stmt->fetchAll(PDO::FETCH_OBJ));
            } catch (Exception $e) 
            {
                $mensaje = 'Ha ocurrido un error durante la carga de los datos';
                json_encode(['mensaje'=>$mensaje]);
            }
        }
    }

    $Patologia = new Patologia();
    $accion = $_POST['accion'];

    if($accion === 'create')
    {
        echo $Patologia->create($_POST['patologia'],$_POST['nombre']);
    }
    if ($accion ==='readAll')
    {
        echo $Patologia->readAll();
    }
    
?>