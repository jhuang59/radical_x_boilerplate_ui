const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 8000;

app.use(bodyParser.json())

app.post('/api/query-vertex', async(req, res) => {
    const { query } = req.body;
    console.log("query",query)
    try {
        // Call the Python API using fetch
        const pythonApiResponse = await fetch('http://127.0.0.1:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: query }),
        });

        // Convert the response to JSON
        const data = await pythonApiResponse.json();
        const botResponse = JSON.stringify({ data });
        // const words = data.trim().split(' ');
        // console.log("botResponse",botResponse)
        // console.log("botResponse",botResponse)
        // console.log("words",words)
        // console.log("pythonApiResponse",pythonApiResponse)
        // console.log("response",{response:data[1]})
        contents = data.map(x => x['content'])
        res.json(JSON.stringify(contents));

    } catch (error) {
        console.error('Failed to fetch data from Python API:', error);
        res.status(500).json({ response: 'Internal Server Error' });
    }

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});