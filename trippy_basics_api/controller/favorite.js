const express = require('express');
const router = express.Router();

module.exports = function () {



    // retourner tous les hotels : 
    router.get('/', (req, res) => {
        res.send('list of favorite places')
    })


    router.get('/:id', (req, res) => {

    })


    // créer un nouveau favori :
    // router.post('/', (req, res) => {

    // })

    return router
}    