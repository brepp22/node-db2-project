const Cars = require('./cars-model')
const db = require('../../data/db-config')

const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const cars = await Cars.getById(req.params.id)
    if(cars){
      req.car = cars
      next()
    } else {
      next({ status: 404 , message: `car with id ${req.params.id} is not found`})
    }
  }
  catch(err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.vin) return next({status: 400,
    message: `vin is missing`
  })
  if(!req.body.make) return next({status: 400,
    message: `make is missing`
  })
  if(!req.body.model) return next({status: 400,
    message: `model is missing`
  })
  if(!req.body.mileage) return next({status: 400,
    message: `mileage is missing`
  })
  next()
}

const checkVinNumberValid =  (req, res, next) => {
  // DO YOUR MAGIC
  if(vinValidator.validate(req.body.vin)){
    next()
  }
  else{
    next({ status: 400 , message: `vin ${req.body.vin} is invalid`})
}
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const exists = await Cars.getByVin(req.body.vin)
    if(!exists){
            next() 
    }else{
     next({status: 400 , message: `vin ${req.body.vin} already exists`})
    }
  }
  catch(err){
    next(err)
  }
}

module.exports = {
  checkCarId, 
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
}
