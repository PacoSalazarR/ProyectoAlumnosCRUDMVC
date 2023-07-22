using System;
using System.Collections.Generic;

namespace ProyectoAlumnosCRUDMVC.Models;

public partial class Alumno
{
    public int IdAlumno { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public int? Calificacion { get; set; }
}
