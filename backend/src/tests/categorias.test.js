const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Categoria = require('../models/Categoria');

// Configuración para usar la base de datos de prueba
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Limpiar la base de datos después de cada prueba
afterEach(async () => {
  await Categoria.deleteMany({});
});

// Cerrar la conexión a la base de datos al finalizar todas las pruebas
afterAll(async () => {
  await mongoose.connection.close();
});

describe('API Categorías', () => {
  test('Debe crear una nueva categoría', async () => {
    const nuevaCategoria = {
      nombre: 'Tecnología',
      descripcion: 'Categoría de productos de tecnología',
      subcategorias: [
        { nombre: 'Smartphones', descripcion: 'Teléfonos inteligentes' },
        { nombre: 'Computadoras', descripcion: 'PCs y Laptops' }
      ]
    };

    const response = await request(app)
      .post('/api/categorias')
      .send(nuevaCategoria);

    expect(response.status).toBe(201);
    expect(response.body.nombre).toBe('Tecnología');
    expect(response.body.subcategorias.length).toBe(2);
  });

  test('Debe obtener todas las categorías', async () => {
    await Categoria.create({ nombre: 'Deportes', descripcion: 'Artículos deportivos' });

    const response = await request(app).get('/api/categorias');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].nombre).toBe('Deportes');
  });

  test('Debe obtener una categoría por ID', async () => {
    const categoria = await Categoria.create({ nombre: 'Libros', descripcion: 'Categoría de libros' });

    const response = await request(app).get(`/api/categorias/${categoria._id}`);

    expect(response.status).toBe(200);
    expect(response.body.nombre).toBe('Libros');
  });

  test('Debe actualizar una categoría por ID', async () => {
    const categoria = await Categoria.create({ nombre: 'Música', descripcion: 'Categoría de música' });
    const actualizacion = { nombre: 'Música y Arte' };

    const response = await request(app)
      .put(`/api/categorias/${categoria._id}`)
      .send(actualizacion);

    expect(response.status).toBe(200);
    expect(response.body.nombre).toBe('Música y Arte');
  });

  test('Debe eliminar una categoría por ID', async () => {
    const categoria = await Categoria.create({ nombre: 'Electrónica', descripcion: 'Categoría de electrónicos' });

    const response = await request(app).delete(`/api/categorias/${categoria._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Categoría eliminada');

    const categoriasRestantes = await Categoria.find();
    expect(categoriasRestantes.length).toBe(0);
  });
});
