const axios = require('axios');
const app = require('./server');

const PORT = process.env.PORT || 3000;

beforeAll(() => {
  server = app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });
});

afterAll((done) => {
  server.close(done);
});

describe('Consulta de Legajo', () => {
  it('Debería devolver los datos del empleado si existe', async () => {
    debugger;
    const res = await axios.post(`http://localhost:${PORT}/consulta`, {
      dni: '12345678',
    });
    expect(res.status).toEqual(200);
    expect(res.data).toHaveProperty('nombreCompleto');
    expect(res.data).toHaveProperty('fechaNacimiento');
    expect(res.data).toHaveProperty('numeroLegajo');
  });

  it('Debería devolver un error si el empleado no existe', async () => {
    await expect(
      axios.post(`http://localhost:${PORT}/consulta`, { dni: '00000000' })
    ).rejects.toThrow('Empleado no encontrado.');
  });
});
