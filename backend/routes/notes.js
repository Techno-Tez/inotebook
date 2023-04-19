const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Note')

// ROUTE 1 Get all the notes "/api/notes/fetchallnotes". require login
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})
// ROUTE 2 Add new note using POST "/api/notes/addnote". require login
router.post('/addnote', fetchUser, [
    body('title', "title must be more than or equal to 3 characters").isLength({ min: 3 }),
    body('description', "Enter valid description").isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;
    try {
        const note = await Notes.create({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        console.log(error.message);
        res.status(400).send("Internal Server error")
    }

})

// ROUTE 3 : Update an existing note. Login Required
router.put('/updatenote/:id', fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body

        // Create a newNote object 
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.sendStatus(404).send("Note not found") }

        // Allow updation only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.sendStatus(401).send("Not allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.log(error.message);
        res.sendStatus(400).send("Internal Server error")
    }


})
// ROUTE 4 : Delete a existing note. Login Required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body

        // Find the note to be updated and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.sendStatus(404).send("Note not found") }

        // Allow deletion only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.sendStatus(401).send("Not allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        console.log(error.message);
        res.sendStatus(400).send("Internal Server error")
    }
})
module.exports = router