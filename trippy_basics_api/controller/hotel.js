const express = require('express');
const router = express.Router();
const Hotel = require ('../models/Hotel')

module.exports = function () {



    // retourner tous les hotels : 
    router.get('/', (req, res) => {
        res.send('list of hotels')
    })


    router.get('/:id', (req, res) => {

    })


    // créer un nouvel hôtel 
    router.post('/', async (req, res, next) => {
        console.log("je crée un hotel", req.body);
        const { name, adress, city, country, starts, hasSpa, hasPool, priceCategory } = req.body
        try {
            const mariott = await Hotel.create({
                name,
                adress,
                city,
                country,
                // stars,
                hasSpa,
                hasPool,
                priceCategory
            })
            res.json('json hotel')
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    })

    return router
}    