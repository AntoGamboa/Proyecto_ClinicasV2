<?php
    require_once('../Conexion/conexion.php');
    header('Content-type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    class graficas extends conexion
    {
        public function __construct()
        {
            parent::__construct();
        }
        public function PacientesMedicos($fechaInicio,$fechaFinal)//barras
        {
             $query = 'SELECT CONCAT(m.nombreMedico," ",m.apellidoMedico) AS nombre , IFNULL(e.nombreEspecialidad, "Medico General") as espemedico,
                        COUNT(m.cedulaMedico) AS cantidadPA
                        FROM medico m
                        LEFT JOIN medicoxespecialidad mxe ON m.cedulaMedico = mxe.cedulaMedico
                        LEFT JOIN especialidad e ON mxe.idEspecialidad = e.idEspecialidad
                        INNER JOIN consulta c ON c.cedulaMedico = m.cedulaMedico 
                        GROUP BY m.cedulaMedico ORDER BY m.cedulaMedico
                        WHERE c.fechaConsulta BETWEEN ? AND ?;';
            
            $stmt=$this->getConexion()->prepare($query);
            $stmt->execute(array($fechaInicio,$fechaFinal));
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);
        }
        public function CantidadMedicosEspecialidad()//pastel
        {
            $query = 'SELECT IFNULL(e.nombreEspecialidad , "Medico General") AS especialidad ,COUNT(*) as cantidad FROM medico m
            LEFT JOIN medicoxespecialidad mxe ON mxe.cedulaMedico = m.cedulaMedico
            LEFT JOIN especialidad  e ON e.idEspecialidad = mxe.idEspecialidad
            GROUP BY e.idEspecialidad ORDER BY e.idEspecialidad;';
            $stmt=$this->getConexion()->prepare($query);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);
        }
        public function CantidadPacientesMedicoSolicitado($fechaInicio,$fechaFinal,$cedulaMedico)//curvas 
        {
            $query='SELECT CONCAT(m.nombreMedico," ",m.apellidoMedico) AS medico,DATE(c.fechaConsulta) AS fecha , COUNT(c.fechaConsulta) AS cantidadP
            FROM medico m
            INNER JOIN consulta c ON m.cedulaMedico = c.cedulaMedico  WHERE (c.fechaConsulta BETWEEN ? AND ?) 
            AND c.cedulaMedico = ?
            GROUP BY c.fechaConsulta ORDER BY c.fechaConsulta;';
            $stmt=$this->getConexion()->prepare($query);
            $stmt->execute(array($fechaInicio,$fechaFinal,$cedulaMedico));
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);

        }
        public function CantdPaciAler()
        {
            $query = 'SELECT  IFNULL(a.nombreAlergia, "Sin Alergias") AS alergia , COUNT(*) as cantidad 
            FROM paciente p
            LEFT JOIN alergiaxpaciente axp ON axp.cedulaPaciente = p.cedulaPaciente
            LEFT JOIN alergia a ON a.idAlergia = axp.idAlergia
            GROUP BY a.idAlergia ORDER BY a.idAlergia;';
            $stmt=$this->getConexion()->prepare($query);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);
            
        }

    }
    $graficas= new graficas();
    $accion = $_POST['accion'];
    if($accion == 'pacienteMedicos'){
        echo $graficas->PacientesMedicos($_POST['FechaInicio'],$_POST['FechaFinal']);
    }
    if($accion == 'CantMedicoEsp')
    {
        echo $$graficas->CantidadMedicosEspecialidad();
    }
    if($$accion == 'CantPacMedicoSelect')
    {
        
        $graficas->CantidadPacientesMedicoSolicitado($_POST['FechaInicion'],$_POST['FechaFinal'],$_POST['CedulaMedico']);
    }
    if($accion = 'CantdPaciAler'){
        echo $graficas->CantdPaciAler();
    }
    

?>