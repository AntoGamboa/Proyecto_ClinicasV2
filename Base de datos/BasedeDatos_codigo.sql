USE historiales_clinicos;

create table Paciente (
cedulaPaciente varchar(12) not null primary key,
idUsuario int not null,
nombrePaciente varchar(32) not null, 
apellidoPaciente varchar(32) not null,
tlfonoPaciente varchar(12) not null,
tlfonoEmergencia varchar(14) default("No ingresado")
);

alter table paciente add idImc varchar(15) not null;
alter table paciente add 
foreign key(idImc) references imc(idImc);

create table imc (
 idImc varchar(15) not null primary key,
 pesoPaciente decimal(5,2) not null,
 estaturaPaciente decimal(3,2) not null
 );

create table Antecedente(
idConsulta varchar(12) not null,
idFamiliar varchar(45) not null
);

alter table Antecedente add
foreign key (idConsulta) references consulta(idConsulta);
alter table Antecedente add
foreign key (idFamiliar) references Familiar(idFamiliar);

create table familiar(
idFamiliar varchar(45) not null primary key,
nombreFamiliar varchar(32) not null
);

create table alergiaxPaciente(
cedulaPaciente varchar(12) not null,
idAlergia int not null
);

alter table alergiaxPaciente add 
foreign key(cedulaPaciente) references Paciente(cedulaPaciente);

alter table alergiaxpaciente add 
foreign key(idAlergia) references alergia(idAlergia);

create table alergia(
idAlergia int not null primary key,
nombreAlergia varchar(80)
);

create table consulta(
idConsulta varchar(15) not null primary key,
fechaConsulta date not null,
cedulaMedico varchar(12) not null, 
descripcion varchar(255) not null,
cedulaPaciente varchar(12) not null,
idExamen varchar(20) not null 
);

alter table consulta add 
foreign key(idExamen) references examen(idExamen);
alter table consulta add
foreign key (cedulaPaciente) references paciente(cedulaPaciente);
alter table consulta add 
foreign key(cedulaMedico) references medico(cedulaMedico);

create table examen(
idExamen varchar(20) not null primary key,
direccionImagen varchar(100) not null
);

create table patologiaxConsulta(
idConsulta varchar(15) not null,
idPatologia varchar(45) not null,
descripcion varchar(255) default("Descripcion no agregada")
);

alter table patologiaxconsulta add 
foreign key(idPatologia) references patologia(idPatologia);
alter table patologiaxconsulta add
foreign key(idConsulta) references consulta(idConsulta);
alter table patologiaxconsulta add 
patologiaHereditaria bool not null;

create table patologia(
idPatologia varchar(45) not null primary key,
nombrePatologia varchar(50) not null
);

create table medico(
cedulaMedico varchar(12) not null primary key,
nombreMedico varchar(32) not null,
apellidoMedico varchar(32) not null
);

create table medicoxEspecialidad(
idEspecialidad varchar(15) not null,
cedulaMedico varchar(15) not null
);

alter table medicoxespecialidad add 
foreign key(cedulaMedico) references medico(cedulaMedico);
alter table medicoxespecialidad add 
foreign key(idEspecialidad) references especialidad(idEspecialidad);

create table especialidad(
idEspecialidad varchar(15) not null primary key, 
nombreEspecialidad varchar(80) not null
);








