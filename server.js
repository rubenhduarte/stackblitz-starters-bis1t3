const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

// Mock de datos de empleados
const employees = [
  {
    dni: '12345678',
    nombreCompleto: 'Juan Pérez',
    fechaNacimiento: '01/01/1980',
    numeroLegajo: '001',
  },
  {
    dni: '98765432',
    nombreCompleto: 'María Gómez',
    fechaNacimiento: '15/05/1990',
    numeroLegajo: '002',
  },
];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Ruta para consultar legajo de empleado por DNI
app.post('/consulta', (req, res) => {
  const dni = req.body.dni;
  const employee = employees.find((emp) => emp.dni === dni);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: 'Empleado no encontrado.' });
  }
});

if (__filename === require.main.filename) {
  // Solo inicia el servidor si este archivo se está ejecutando directamente
  app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
  });
}

module.exports = app;
// if (__filename === require.main.filename) {

//   app.listen(PORT, () => {
//     console.log(`Servidor iniciado`);
//   });
// }
