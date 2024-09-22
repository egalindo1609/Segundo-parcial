import React, { useState, useEffect } from "react";

function FormularioCurso() {
  const [nombre, setNombre] = useState("");
  const [creditos, setCreditos] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cursos, setCursos] = useState([]);

  // Limpiar formulario
  const limpiarFormulario = () => {
    setNombre("");
    setCreditos("");
    setDescripcion("");
  };

  // Obtener lista de cursos
  const obtenerCursos = async () => {
    try {
      const response = await fetch("https://test-deploy-12.onrender.com/cursos", {
        method: "GET",
      });
      const data = await response.json();
      setCursos(data);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const curso = {
      nombre,
      creditos: parseInt(creditos, 10),
      descripcion,
    };

    try {
      const response = await fetch("https://test-deploy-12.onrender.com/cursos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(curso),
      });

      if (response.ok) {
        alert("Curso guardado exitosamente");
        limpiarFormulario();
        obtenerCursos();  // Actualizar la lista de cursos después de guardar
      } else {
        alert("Error al guardar el curso");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  // Obtener los cursos al cargar el componente
  useEffect(() => {
    obtenerCursos();
  }, []);

  return (
    <div>
      <h2>Crear Curso</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre curso:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Créditos:</label>
          <input
            type="number"
            value={creditos}
            onChange={(e) => setCreditos(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Guardar</button>
          <button type="button" onClick={limpiarFormulario}>
            Limpiar
          </button>
        </div>
      </form>

      <ul>
        {cursos.map((curso, index) => (
          <li key={index}>
            <strong>{curso.nombre}</strong> - Créditos: {curso.creditos} - Descripción: {curso.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormularioCurso;
