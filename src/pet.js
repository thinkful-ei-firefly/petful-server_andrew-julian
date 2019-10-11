let petsData = require('./pets')

const patch = (req, res, next) => {
    let keys = Object.keys(req.body)
    if (keys === null) {
        res.status(404).json('Missing data to update in body')
    }
    console.log(keys)
    let id = req.url.slice(5)
    console.log(id)
    let petFound = -1
    for (let i = 0; i < petsData.length; i++) {
        if (petsData[i].id === id) {
            petFound = i
            i = petsData.length
        }
    }
    if (petFound >= 0) {
        for (let i = 0; i < keys.length; i++) {
            let thisKey = keys[i]
            petsData[petFound].thisKey = req.body.thisKey
        }
        res.status(200).json(petsData[petFound])
    }
    else {
        res.status(404).json('ID does not match any pets in database.')
    }
}


module.exports = { patch }