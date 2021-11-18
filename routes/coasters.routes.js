const router = require("express").Router();
const Coaster = require("../models/Coaster.model")
const Park = require("../models/Park.model")

// Endpoints
router.get('/new', (req, res, next) => {
    Park.find()
        .then((parks) => res.render('coasters/new-coaster', { parks }))
        .catch(err => next(err))

})

router.post('/new', (req, res, next) => {

    const { name, description, insversions, length, park_id } = req.body
    console.log("este es el de los coasters", name, description)
    Coaster.create({ name, description, insversions, length, park_id })
        .then((place) => {
            console.log(place)
            res.redirect('/')
        })
        .catch((error) => {
            console.log("----------------------->", error)
            res.render('coasters/new-coaster');
        })
});

router.get('/', (req, res, next) => {
    Coaster.find()
        .then((allCoasters) => res.render('coasters/coaster-index', { allCoasters }))
        .catch(err => next(err))
})

router.get('/delete', (req, res, next) => {
    let { id } = req.query

    Coaster.findByIdAndRemove(id)
        .then(() => res.redirect("/coasters"))
        .catch(err => next(err))
})

router.get('/edit', (req, res, next) => {
    let { id } = req.query
    Coaster.findById(id)
        .populate("park_id")
        .then((coaster) => {
            console.log(coaster)
            res.render('coasters/coaster-edit', { coaster }
            )
        })
        .catch(err => next(err))
})


router.get('/:id', (req, res, next) => {
    let { id } = req.params
    console.log(id)
    Coaster.findById(id)
        .populate("park_id")
        .then((coaster) => {
            console.log("este es el que quiero ver", coaster)
            res.render('coasters/coaster-details', { coaster })
        }
        )
        .catch(err => next(err))
})


router.post('/:id', (req, res, next) => {
    let { name, description, length, inversions } = req.body
    let { id } = req.params

    console.log(req.body)

    Coaster.findByIdAndUpdate(id, { name, description, length, inversions }, { new: true })
        .populate("park_id")
        .then(() => res.redirect(`/coasters/${id}`))
        .catch(err => next(err))
})



module.exports = router;