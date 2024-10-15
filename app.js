const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import uuid
const app = express();
const PORT = 3000;

// Sample contact data (replace with your data source)
let contacts = [
    { id: uuidv4(), name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: uuidv4(), name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' },
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route for home (contact list)
app.get('/', (req, res) => {
    res.render('index', { contacts });
});

// Route for adding contact form
app.get('/add-contact', (req, res) => {
    res.render('add-contact');
});

// Route for handling the form submission
app.post('/add-contact', (req, res) => {
    const { name, email, phone } = req.body;
    contacts.push({ id: uuidv4(), name, email, phone }); // Add unique ID here
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
