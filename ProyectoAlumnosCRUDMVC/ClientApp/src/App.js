import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Row } from "reactstrap"
import ModalAlumno from "./components/ModalAlumno"
import TablaAlumno from "./components/TablaAlumno"

const App = () => {

    const [alumnos, setAlumnos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)

    const mostrarAlumnos = async () => {

        const response = await fetch("api/alumno/Lista");

        if (response.ok) {
            const data = await response.json();
            setAlumnos(data)
        } else {
            console.log("Error en los datos de la lista")
        }
    }

    const buscarAlumno = async (e) => {
        const matricula = e.target.value;

        const response = await fetch("api/alumno/Buscar/" + matricula);
        if (response.ok) {
            const data = await response.json();
            setAlumnos(data)
        } else {
            mostrarAlumnos();
        }
    }

    useEffect(() => {
        mostrarAlumnos()
    }, [])

    const guardarAlumno = async (alumno) => {

        const response = await fetch("api/alumno/Guardar", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(alumno)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarAlumnos();
        }

    }

    const editarAlumno = async (alumno) => {

        const response = await fetch("api/alumno/Editar", {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(alumno)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarAlumnos();
        }

    }

    const eliminarAlumno = async (id) => {

        var respuesta = window.confirm("Desea eliminar este alumno?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/alumno/Eliminar/" + id, {
            method: 'DELETE'
        })

        if (response.ok) {
            mostrarAlumnos();
        }

    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                        <h5>Alumnos Inscritos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>Nuevo Alumno</Button>
                            <Input type="number" name="matricula" onChange={(e) => buscarAlumno(e)} placeholder="buscar por matricula" />
                            <hr></hr>
                            <TablaAlumno data={alumnos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarAlumno={eliminarAlumno}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalAlumno
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarAlumno={guardarAlumno}
                editar={editar}
                setEditar={setEditar}
                editarAlumno={editarAlumno}
                />
        </Container>
    )
}

export default App;