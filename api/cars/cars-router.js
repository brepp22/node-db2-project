// DO YOUR MAGIC
const express = require('express')
const router = express.Router()

const Cars = require('./cars-model')

const { checkCarId , checkVinNumberUnique, 
        checkVinNumberValid , checkCarPayload } = require('./cars-middleware')

router.get('/' , async (req, res , next) => {
    try {
        const cars = await Cars.getAll()
        res.json(cars)
    }
    catch(err) {
        next(err)
    }
})

router.get('/:id' , checkCarId , async (req, res, next) => {
    try{
        const car = await Cars.getById(req.params.id)
        res.json(car)
    }
    catch(err){
        next(err)
    }
})

router.post('/' , checkCarPayload, checkVinNumberUnique, 
    checkVinNumberValid  , async (req, res, next) => {
    try{
       const newCar = await Cars.create(req.body)
       res.status(201).json(newCar)
    }
    catch(err){
        next(err)
    }
})


router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message , 
      stack: err.stack,
    })
  })

module.exports = router;