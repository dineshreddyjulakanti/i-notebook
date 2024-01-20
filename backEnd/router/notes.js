const express = require('express');
const router = express.Router();
const getuser = require('../middleware/getuser')
const Note = require("../model/Note");
const { body, validationResult } = require("express-validator");



//route 1 this gives the notes  of the loged user
router.get('/fetchnotes', getuser, async (req, res) => {// this gives the notes  of the loged user

    try {
        const notes = await Note.find({ user: req.user.id });
        res.send(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured");
    }



})

//route 2 this add the notes  of the loged user

router.post('/addnote', getuser, [
    body("title", "enter a valid name").optional().isLength({ min: 6 }),
    body("description", "enter a valid password").optional().isLength({ min: 6 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savednotes = await note.save()
        res.json(savednotes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured");
    }
})

//route 3 this to update the notes  of the loged user

router.put('/update/:id', getuser, async (req, res) => {
    try {
        
        const { title, description, tag } = req.body
        const newnote = {};
        if (title) { newnote.title = title }
        if (description) { newnote.description = description }
        if (tag) { newnote.tag = tag }
    
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });//{} shows the object
        res.json({ note });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured"); 
    }
})


//route 4 this to update the notes  of the loged user

router.delete('/delete/:id', getuser, async (req, res) => {

   try {
    const { title, description, tag } = req.body
   
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not found") }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id);//{} shows the object
    res.json({ "done":"Deleted ",note:note});
    
   } catch (error) {
    console.error(error.message);
        res.status(500).send("Error occured"); 
   }
})
module.exports = router