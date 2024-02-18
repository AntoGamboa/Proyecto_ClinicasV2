<?php 
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    require_once('/Applications/XAMPP/xamppfiles/htdocs/Proyecto_ClinicasV2-main/Conexion/conexion.php');

    class Alergia extends conexion
    {
        private $idAlergia;
        private $nombre;

        public function getidAlergia() {return $this->idAlergia;}
        public function setidAlergia($idAlergia) { $this->idAlergia = $idAlergia;}
        public function getNombre() {return $this->nombre;}
        public function setNombre($nombre) {$this->nombre = $nombre;}

        public function __construct()
        {
            parent::__construct();
        }

        public function create($idAlergia,$nombre)
        {
            $mensaje = '';
           
            try 
            {
                $query = 'INSERT INTO alergia(idAlergia,nombreAlergia) Values(?,?);';
                $this->getConexion()->prepare($query)->execute(array($idAlergia,$nombre));
                $mensaje = 'Registro Completado exitosamente';
            }
             catch (Exception $e) 
            {
                if($e->getCode() === '23000'){
                    $mensaje='Ya esta registrada esa alergia';
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
                $query = 'SELECT idAlergia as codigo, nombreAlergia as nombre FROM alergia;';
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

    $Alergia = new Alergia();
    $accion = $_POST['accion'];

    if($accion === 'create')
    {
        echo $Alergia->create($_POST['alergia'],$_POST['nombre']);
    }
    if ($accion === 'readAll')
     {
        echo $Alergia->readAll();
    }
?>