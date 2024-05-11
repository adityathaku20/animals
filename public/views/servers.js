const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://aditya1032be22:GxmHliZoJ8L2P5Zr@login0.oz50rxf.mongodb.net/?retryWrites=true&w=majority&appName=login0')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Define a schema for donations
const donationSchema = new mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
        
    },
    mail: {
        type: String,
        
    },
    phone: {
        type: String,
       
    },
    state: {
        type: String,
      
    },
    amount: {
        type: Number,
        
    }
});

// Create a model for donations
const Donation = mongoose.model('Donation', donationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to handle donation submissions
app.post('/donate', async (req, res) => {
    const data = {
        fname: req.body.fname,
        lname: req.body.lname,
        mail: req.body.mail,
        phone: req.body.phone, // Fixed field name
        state: req.body.state,
        amount: req.body.amount
    };

    try {
        // Create a new donation instance
       const user= await Donation.create(data);
         console.log(user);
        res.status(200).json({ message: 'Donation submitted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'donation.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
