const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Data sementara (Array)
let animals = [
    { id: 1, name: 'Harimau', species: 'Karnivora' },
    { id: 2, name: 'Gajah', species: 'Herbivora' }
];

// Halaman utama (Read)
app.get('/', (req, res) => {
    res.render('index', { animals });
});

// Halaman tambah data
app.get('/tambah', (req, res) => {
    res.render('tambah');
});

// Tambah data (Create)
app.post('/tambah', (req, res) => {
    const { name, species } = req.body;
    const id = animals.length ? animals[animals.length - 1].id + 1 : 1;
    animals.push({ id, name, species });
    res.redirect('/');
});

// Hapus data (Delete)
app.get('/hapus/:id', (req, res) => {
    const id = parseInt(req.params.id);
    animals = animals.filter(animal => animal.id !== id);
    res.redirect('/');
});

// Jalankan server
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
