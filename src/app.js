const express = require('express')
const path = require ('path')
const hbs = require('hbs')

const app = express()

const port = 3000

const indexURL = path.join(__dirname, '../public')
const viewsURL = path.join(__dirname, '../templates/views')
const partialsURL = path.join(__dirname, '../templates/partials')

//app.use(express.static(indexURL))
app.set('view engine', 'hbs')
app.set('views', viewsURL)
hbs.registerPartials(partialsURL)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Main',
        name: 'Mohamed',
        age: '30'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search term'
        }) 
    }
    res.send({
        forecast: 'it\'s snowing',
        location: 'Blida',
        address: req.query.address
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mohamed',
        age: '30'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mohamed',
        age: '30'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMsg: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMsg: 'Erreur 404, page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running ... on port : ' + port);
})