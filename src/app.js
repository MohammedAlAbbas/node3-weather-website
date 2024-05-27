import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import chalk from 'chalk';
import hbs from 'hbs';
import weatherUtility from './utils/weatherUtility.js';
import Response from './classes/Response.js';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const viewsPath = path.join(__dirname, '../public/templates/views');
const partialsPath = path.join(__dirname, '../public/templates/partials');

// set up handlebars engine and views location
app.set("view engine", "hbs");
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

const name = "Mohammed Al Abbas";

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: name
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: name
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'this is a help message',
        name: name
    });
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    let errors = [];
    if (!city) {
        const message = "city must not be empty!";
        const response = new Response(false, undefined, message);
        return res.send(response);
    }

    const currentWeatherData = await weatherUtility.getCurrentWeather2(city);

    res.send(currentWeatherData);
});

// app.get('*', (req, res) => {
//     res.send('My 404 page');
// });
// app.get('', (req, res) => {
//     res.send('<h1>Testt</h1>');
// });

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'mohammed',
//         age: 'secret'
//     });
// });

// app.get('/about', (req, res) => {
//     res.send('about page');
// });

app.listen(port, () => {
    console.log(chalk.inverse.green(`Server is running on port ${port}.`));
});
