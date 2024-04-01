-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-03-2024 a las 20:39:26
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `historiales_clinicos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alergia`
--

CREATE TABLE `alergia` (
  `idAlergia` int(11) NOT NULL,
  `nombreAlergia` varchar(80) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alergia`
--

INSERT INTO `alergia` (`idAlergia`, `nombreAlergia`, `estado`) VALUES
(0, 'Acetaminofen', 1),
(1, 'loratadina', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alergiaxpaciente`
--

CREATE TABLE `alergiaxpaciente` (
  `cedulaPaciente` varchar(12) NOT NULL,
  `idAlergia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `antecedente`
--

CREATE TABLE `antecedente` (
  `idConsulta` varchar(12) NOT NULL,
  `idFamiliar` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--

CREATE TABLE `consulta` (
  `idConsulta` varchar(15) NOT NULL,
  `fechaConsulta` date NOT NULL,
  `cedulaMedico` varchar(12) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `cedulaPaciente` varchar(12) NOT NULL,
  `idExamen` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `idEspecialidad` varchar(15) NOT NULL,
  `nombreEspecialidad` varchar(80) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`idEspecialidad`, `nombreEspecialidad`, `estado`) VALUES
('02', 'dermatologo', 1),
('03', 'internista', 1),
('04', 'neurologo', 1),
('car01', 'Cardiologo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examen`
--

CREATE TABLE `examen` (
  `idExamen` varchar(20) NOT NULL,
  `direccionImagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `familiar`
--

CREATE TABLE `familiar` (
  `idFamiliar` varchar(45) NOT NULL,
  `nombreFamiliar` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imc`
--

CREATE TABLE `imc` (
  `idImc` varchar(15) NOT NULL,
  `pesoPaciente` decimal(5,2) NOT NULL,
  `estaturaPaciente` decimal(3,2) NOT NULL,
  `cedulaPaciente` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medico`
--

CREATE TABLE `medico` (
  `cedulaMedico` varchar(12) NOT NULL,
  `nombreMedico` varchar(29) NOT NULL,
  `apellidoMedico` varchar(29) NOT NULL,
  `estado` tinyint(1) DEFAULT 1,
  `fe_nacimiento` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicoxespecialidad`
--

CREATE TABLE `medicoxespecialidad` (
  `idEspecialidad` varchar(15) NOT NULL,
  `cedulaMedico` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `cedulaPaciente` varchar(12) NOT NULL,
  `nombrePaciente` varchar(32) NOT NULL,
  `apellidoPaciente` varchar(32) NOT NULL,
  `tlfonoPaciente` varchar(12) NOT NULL,
  `tlfonoEmergencia` varchar(14) DEFAULT 'No ingresado',
  `fe_nacimiento` datetime NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patologia`
--

CREATE TABLE `patologia` (
  `idPatologia` varchar(45) NOT NULL,
  `nombrePatologia` varchar(50) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `patologia`
--

INSERT INTO `patologia` (`idPatologia`, `nombrePatologia`, `estado`) VALUES
('pat01', 'Gonorrea', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patologiaxconsulta`
--

CREATE TABLE `patologiaxconsulta` (
  `idConsulta` varchar(15) NOT NULL,
  `idPatologia` varchar(45) NOT NULL,
  `descripcion` varchar(255) DEFAULT 'Descripcion no agregada',
  `patologiaHereditaria` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL DEFAULT 1,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `correo` varchar(35) NOT NULL,
  `usuario` varchar(15) NOT NULL,
  `passuser` varchar(45) DEFAULT NULL,
  `Fecha_registro` date DEFAULT curdate(),
  `fe_nacimiento` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alergia`
--
ALTER TABLE `alergia`
  ADD PRIMARY KEY (`idAlergia`);

--
-- Indices de la tabla `alergiaxpaciente`
--
ALTER TABLE `alergiaxpaciente`
  ADD KEY `cedulaPaciente` (`cedulaPaciente`),
  ADD KEY `idAlergia` (`idAlergia`);

--
-- Indices de la tabla `antecedente`
--
ALTER TABLE `antecedente`
  ADD KEY `idConsulta` (`idConsulta`),
  ADD KEY `idFamiliar` (`idFamiliar`);

--
-- Indices de la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`idConsulta`),
  ADD KEY `idExamen` (`idExamen`),
  ADD KEY `cedulaPaciente` (`cedulaPaciente`),
  ADD KEY `cedulaMedico` (`cedulaMedico`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`idEspecialidad`);

--
-- Indices de la tabla `examen`
--
ALTER TABLE `examen`
  ADD PRIMARY KEY (`idExamen`);

--
-- Indices de la tabla `familiar`
--
ALTER TABLE `familiar`
  ADD PRIMARY KEY (`idFamiliar`);

--
-- Indices de la tabla `imc`
--
ALTER TABLE `imc`
  ADD PRIMARY KEY (`idImc`),
  ADD KEY `cedulaPaciente` (`cedulaPaciente`);

--
-- Indices de la tabla `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`cedulaMedico`);

--
-- Indices de la tabla `medicoxespecialidad`
--
ALTER TABLE `medicoxespecialidad`
  ADD KEY `cedulaMedico` (`cedulaMedico`),
  ADD KEY `idEspecialidad` (`idEspecialidad`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`cedulaPaciente`);

--
-- Indices de la tabla `patologia`
--
ALTER TABLE `patologia`
  ADD PRIMARY KEY (`idPatologia`);

--
-- Indices de la tabla `patologiaxconsulta`
--
ALTER TABLE `patologiaxconsulta`
  ADD KEY `idPatologia` (`idPatologia`),
  ADD KEY `idConsulta` (`idConsulta`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alergiaxpaciente`
--
ALTER TABLE `alergiaxpaciente`
  ADD CONSTRAINT `alergiaxpaciente_ibfk_1` FOREIGN KEY (`cedulaPaciente`) REFERENCES `paciente` (`cedulaPaciente`),
  ADD CONSTRAINT `alergiaxpaciente_ibfk_2` FOREIGN KEY (`idAlergia`) REFERENCES `alergia` (`idAlergia`);

--
-- Filtros para la tabla `antecedente`
--
ALTER TABLE `antecedente`
  ADD CONSTRAINT `antecedente_ibfk_1` FOREIGN KEY (`idConsulta`) REFERENCES `consulta` (`idConsulta`),
  ADD CONSTRAINT `antecedente_ibfk_2` FOREIGN KEY (`idFamiliar`) REFERENCES `familiar` (`idFamiliar`);

--
-- Filtros para la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `consulta_ibfk_1` FOREIGN KEY (`idExamen`) REFERENCES `examen` (`idExamen`),
  ADD CONSTRAINT `consulta_ibfk_2` FOREIGN KEY (`cedulaPaciente`) REFERENCES `paciente` (`cedulaPaciente`),
  ADD CONSTRAINT `consulta_ibfk_3` FOREIGN KEY (`idExamen`) REFERENCES `examen` (`idExamen`),
  ADD CONSTRAINT `consulta_ibfk_4` FOREIGN KEY (`cedulaPaciente`) REFERENCES `paciente` (`cedulaPaciente`),
  ADD CONSTRAINT `consulta_ibfk_5` FOREIGN KEY (`cedulaMedico`) REFERENCES `medico` (`cedulaMedico`);

--
-- Filtros para la tabla `imc`
--
ALTER TABLE `imc`
  ADD CONSTRAINT `imc_ibfk_1` FOREIGN KEY (`cedulaPaciente`) REFERENCES `paciente` (`cedulaPaciente`) ON DELETE CASCADE;

--
-- Filtros para la tabla `medicoxespecialidad`
--
ALTER TABLE `medicoxespecialidad`
  ADD CONSTRAINT `medicoxespecialidad_ibfk_1` FOREIGN KEY (`cedulaMedico`) REFERENCES `medico` (`cedulaMedico`),
  ADD CONSTRAINT `medicoxespecialidad_ibfk_2` FOREIGN KEY (`cedulaMedico`) REFERENCES `medico` (`cedulaMedico`),
  ADD CONSTRAINT `medicoxespecialidad_ibfk_3` FOREIGN KEY (`idEspecialidad`) REFERENCES `especialidad` (`idEspecialidad`);

--
-- Filtros para la tabla `patologiaxconsulta`
--
ALTER TABLE `patologiaxconsulta`
  ADD CONSTRAINT `patologiaxconsulta_ibfk_1` FOREIGN KEY (`idPatologia`) REFERENCES `patologia` (`idPatologia`),
  ADD CONSTRAINT `patologiaxconsulta_ibfk_2` FOREIGN KEY (`idConsulta`) REFERENCES `consulta` (`idConsulta`),
  ADD CONSTRAINT `patologiaxconsulta_ibfk_3` FOREIGN KEY (`idConsulta`) REFERENCES `consulta` (`idConsulta`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
