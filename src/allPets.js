let petsData = require('./pets')

const get = (req, res, next) => {
    res.status(200).json(petsData)
}


module.exports = {get}