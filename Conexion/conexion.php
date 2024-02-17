<?php
    class conexion
    {
        private PDO $conexion;
        public function getConexion() { return $this->conexion; }
        public function setConexion($conexion) { $this->conexion = $conexion; }

        public function __construct()
        {
            try{
                $this->conexion=new PDO("mysql:host=localhost;dbname=historiales_clinicos","root","");
                $this->conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            }
            catch(Exception $e)
            {
                echo $e->getMessage();
            }
           
            
        }
    }

?>