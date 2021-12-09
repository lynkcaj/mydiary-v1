const express = require('express')
const Diary = require('../models/diary')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/diarys', (req, res)=>{
    return res.render('diarys');
})
router.post('/diarys', auth, async (req, res) => {
    const diary = new Diary({
        ...req.body,
        owner: req.user._id
    })

    try {
        await diary.save()
        res.status(201).send(diary)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/diarys', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'diarys',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.diarys)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/diarys/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const diary = await Diary.findOne({ _id, owner: req.user._id })

        if (!diary) {
            return res.status(404).send()
        }

        res.send(diary)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/diarys/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const diary = await Diary.findOne({ _id: req.params.id, owner: req.user._id})

        if (!diary) {
            return res.status(404).send()
        }

        updates.forEach((update) => diary[update] = req.body[update])
        await diary.save()
        res.send(diary)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/diarys/:id', auth, async (req, res) => {
    try {
        const diary = await Diary.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!diary) {
            res.status(404).send()
        }

        res.send(diary)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router