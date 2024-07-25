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

router.get('/:id' , checkCarId ,  (req, res, next) => {
    res.json(req.car)
})

router.post('/' , checkCarPayload, checkVinNumberUnique, 
    checkVinNumberValid  , async (req, res, next) => {
    try{
       const car = await Cars.create(req.body)
       res.json(car)
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