const http = require('http');
const { connect } = require('net');

const server = http.createServer((req, res) =>{
    if (req.url === '/'){
        res.write('welcome to backend development');
        res.end();
    }

    if(req.url === '/api/courses') {
        res.write(JSON.stringify({id: 1, name: 'vitus', email: 'francis.vitus@gmail.com', phone: '08166761285' }));
        res.end();
    }

    if(req.url === '/api/about') {
        res.write(JSON.stringify('it is all about full stack'));
        res.end();
    }
});

// server.on('connection', (socket) => {
//     console.log('New connection...')
// });

server.listen(4000);
console.log('listening on port 4000...')
