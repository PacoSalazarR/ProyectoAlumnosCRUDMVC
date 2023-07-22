using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoAlumnosCRUDMVC.Models;

namespace ProyectoAlumnosCRUDMVC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlumnoController : ControllerBase
    {
        private readonly CrudalumnosContext _dbcontext;

        public AlumnoController(CrudalumnosContext context)
        {
            _dbcontext = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Alumno> lista = await _dbcontext.Alumnos.OrderByDescending(c => c.IdAlumno).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpGet]
        [Route("Buscar/{id:int}")]
        public async Task<IActionResult> Buscar(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID Inválido. El ID debe ser un entero positivo");
            }

            //Alumno alumno = await _dbcontext.Alumnos.FindAsync(id);
            List<Alumno> alumnos = await _dbcontext.Alumnos.Where(a => a.IdAlumno == id).ToListAsync();

            if (alumnos.Count < 0)
            {
                return NotFound("Alumno no encontrado");
            }

            return StatusCode(StatusCodes.Status200OK, alumnos);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Alumno request)
        {
            await _dbcontext.Alumnos.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Alumno request)
        {
            _dbcontext.Alumnos.Update(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Alumno alumno = _dbcontext.Alumnos.Find(id);

            _dbcontext.Alumnos.Remove(alumno);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
