-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2024 a las 15:45:06
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

--
-- Volcado de datos para la tabla `alergiaxpaciente`
--

INSERT INTO `alergiaxpaciente` (`cedulaPaciente`, `idAlergia`) VALUES
('33289144', 1),
('33289144', 0),
('14175704', 1),
('28245845', 0),
('28245845', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--

CREATE TABLE `consulta` (
  `cedulaMedico` varchar(12) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `cedulaPaciente` varchar(12) NOT NULL,
  `id_consulta` int(11) NOT NULL,
  `fechaConsulta` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consulta`
--

INSERT INTO `consulta` (`cedulaMedico`, `descripcion`, `cedulaPaciente`, `id_consulta`, `fechaConsulta`) VALUES
('30405189', 'casi le da un ataque por gordo', '30405189', 7, '2024-03-30 23:11:47'),
('30405189', 'esta bien el panita', '14175704', 8, '2024-03-30 23:12:51'),
('30405189', 'no se que tiene ', '14175704', 9, '2024-03-31 15:48:36');

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
-- Estructura de tabla para la tabla `imc`
--

CREATE TABLE `imc` (
  `pesoPaciente` decimal(5,2) NOT NULL,
  `estaturaPaciente` decimal(3,2) NOT NULL,
  `cedulaPaciente` varchar(45) NOT NULL,
  `idimc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imc`
--

INSERT INTO `imc` (`pesoPaciente`, `estaturaPaciente`, `cedulaPaciente`, `idimc`) VALUES
(63.00, 1.72, '30405189', 3),
(53.00, 1.70, '14175704', 4),
(53.00, 1.70, '14175704', 5);

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

--
-- Volcado de datos para la tabla `medico`
--

INSERT INTO `medico` (`cedulaMedico`, `nombreMedico`, `apellidoMedico`, `estado`, `fe_nacimiento`) VALUES
('14175704', 'angelica', 'godoy', 1, '1980-02-13 00:00:00'),
('30405189', 'antonio', 'gamboa', 1, '2003-02-28 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicoxespecialidad`
--

CREATE TABLE `medicoxespecialidad` (
  `idEspecialidad` varchar(15) NOT NULL,
  `cedulaMedico` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicoxespecialidad`
--

INSERT INTO `medicoxespecialidad` (`idEspecialidad`, `cedulaMedico`) VALUES
('04', '14175704'),
('car01', '14175704');

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

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`cedulaPaciente`, `nombrePaciente`, `apellidoPaciente`, `tlfonoPaciente`, `tlfonoEmergencia`, `fe_nacimiento`, `estado`) VALUES
('14175704', 'jesus', 'gamboa', '04145652690', '04145652690', '2008-08-12 00:00:00', 1),
('28245845', 'Santiago', 'rodriguez', '04121587476', '04245640990', '2000-09-14 00:00:00', 0),
('30405189', 'antonio', 'gamboa', '04145227670', '04145640990', '2003-02-28 00:00:00', 1),
('33289144', 'angelica', 'godoy', '04145652690', '04145227670', '1980-02-13 00:00:00', 1);

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
('01', 'Hipertension', 1),
('02', 'Diabetes', 1),
('03', 'Neumonia', 1),
('pat01', 'Gonorrea', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patologiaxconsulta`
--

CREATE TABLE `patologiaxconsulta` (
  `idPatologia` varchar(45) NOT NULL,
  `id_consulta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `patologiaxconsulta`
--

INSERT INTO `patologiaxconsulta` (`idPatologia`, `id_consulta`) VALUES
('02', 7),
('02', 9);

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
  `fe_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `id_rol`, `nombre`, `apellido`, `correo`, `usuario`, `passuser`, `Fecha_registro`, `fe_nacimiento`) VALUES
(20, 1, 'antonio', 'gamboa', 'antonio@hotmail.com', 'freelight', '123456', '2024-03-28', '2003-02-28');

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
-- Indices de la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`id_consulta`),
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
-- Indices de la tabla `imc`
--
ALTER TABLE `imc`
  ADD PRIMARY KEY (`idimc`),
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
  ADD KEY `id_consulta` (`id_consulta`);

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
-- AUTO_INCREMENT de la tabla `consulta`
--
ALTER TABLE `consulta`
  MODIFY `id_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `imc`
--
ALTER TABLE `imc`
  MODIFY `idimc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
-- Filtros para la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `consulta_ibfk_2` FOREIGN KEY (`cedulaPaciente`) REFERENCES `paciente` (`cedulaPaciente`),
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
  ADD CONSTRAINT `medicoxespecialidad_ibfk_3` FOREIGN KEY (`idEspecialidad`) REFERENCES `especialidad` (`idEspecialidad`);

--
-- Filtros para la tabla `patologiaxconsulta`
--
ALTER TABLE `patologiaxconsulta`
  ADD CONSTRAINT `patologiaxconsulta_ibfk_1` FOREIGN KEY (`idPatologia`) REFERENCES `patologia` (`idPatologia`),
  ADD CONSTRAINT `patologiaxconsulta_ibfk_2` FOREIGN KEY (`id_consulta`) REFERENCES `consulta` (`id_consulta`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
