const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose'); // Import Mongoose
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://<username>:<password>@cluster.mongodb.net/ContactBook', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema and model for contacts
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route for home (contact list)
app.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find(); // Fetch all contacts from the database
        res.render('index', { contacts });
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route for adding contact form
app.get('/add-contact', (req, res) => {
    res.render('add-contact');
});

// Route for handling the form submission
app.post('/add-contact', async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const newContact = new Contact({ name, email, phone });
        await newContact.save(); // Save the new contact to the database
        res.redirect('/');
    } catch (err) {
        console.error('Error adding contact:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
