const express = require('express');
const cors = require('cors');
const Axios = require('axios');
const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

app.post('/compile', (req, res) => {
    // Receive the required data from the request
    let code = req.body.code;
    let langauge = req.body.language;
    let input = req.body.input;

    if (langauge == 'python') {
        language = 'py'
    }

    let data = ({
        "code": code,
        "langauge": language,
        "input": input
    });

    let request = "Please execute the folloing python code: \n" + code;

    console.log("request", request)

    let config = {
        method: "post",
        url: 'http://127.0.0.1:5000/query',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: request })
    };

    // Call the code compilation API
    Axios(config)
        .then((response) => {
            res.send(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error);
        });
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});