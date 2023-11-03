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

    let request = "Please execute the folloing python code and return the execution result only \n" + code;

    console.log("request", request)

    let config = {
        method: "post",
        url: 'http://127.0.0.1:5000/compile',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ message: request })
    };

    // Call the code compilation API
    Axios(config)
        .then((response) => {
            let data = response.data
            console.log(data[1]['content']);
            let lines = data[1]['content'].split("\n");
            let sliced = lines.slice(3, -1);
            res.send(sliced.join('\n'));
        }).catch((error) => {
            console.log(error);
        });
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});