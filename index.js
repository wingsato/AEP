const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// This allows the server to parse JSON data sent to it
app.use(express.json());

// This is your "Listener" route
app.post('/incoming-messages', (req, res) => {
    console.log("Message received:", req.body);
    
    // Always send a 200 status back so the sender knows you got it
    res.status(200).send('Message received!');
});

app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});
