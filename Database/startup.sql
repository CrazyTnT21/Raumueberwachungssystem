-- create database RoomSurveillanceSystem;

create table Room
(
    Id   int primary key generated always as identity,
    Name varchar(20) not null
);
create table Temperature
(
    Id           int primary key generated always as identity,
    ValueCelsius real      not null,
    Measured     timestamp not null,
    FKRoom       int       not null references Room (Id)
);

create table Humidity
(
    Id       int primary key generated always as identity,
    Value    real      not null,
    Measured timestamp not null,
    FKRoom   int       not null references Room (Id)
);

create table Light
(
    Id       int primary key generated always as identity,
    Value    real      not null,
    Measured timestamp not null,
    FKRoom   int       not null references Room (Id)
);

create table Air
(
    Id       int primary key generated always as identity,
    Value    real      not null,
    Measured timestamp not null,
    FKRoom   int       not null references Room (Id)
);