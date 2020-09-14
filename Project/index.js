const express = require('express');
const mongoose = require('mongoose');

const app = express();

// CHAVE DO BANCO DE DADOS
const db = require('./config/keys').mongoURI;

// CONECTAR AO BANCO DE DADOS
mongoose.connect(db)
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err));

app.use(express.json());


// ROTAS
const shorten = require('./routes/api/url');
app.use('/api/url', shorten);

const redirect = require('./routes/api/redirect');
app.use('/api/redirect', redirect);


if (process.env.NODE_ENV === 'production' ) {
    // REDIRECIONA
    app.get('/:hash', function(req, res) {
        const id = req.params.hash;
        URL.findOne({ _id: id }, function(err, doc) {
            if(doc) {
                res.redirect(doc.url);
            } else {
                res.redirect('/');
            }
        });
    });
    // DEFININDO PASTA ESTATICA
    app.use(express.static('client/build'));

    // CARREGANDO ARQUIVO ESTATICO
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// INICIAR SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));