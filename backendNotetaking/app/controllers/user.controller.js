const User = require('../models/user.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    if(!req.body.email) {
        return res.status(400).send({
            message: "Email can not be empty"
        });
    }else if(!req.body.password){
        return res.status(400).send({
            message:"Password Can not be empty"
        })
    }

    // Create a Note
    const user = new User({
        email: req.body.email , 
        password: req.body.password
    });

    // Save Note in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.login=(req,res)=>{
    
     User.findOne({"email":req.body.email,"password":req.body.password})
    
    .then(users=>{
        console.log(users)
        if(users){
            res.status(200).send(users)
        }else{
            res.status(200).send({"message":"user Not Found","status":300})
        }
        
    }).catch(err=>{
        res.status(500).send({
            message:error.message
        })
    });
    
    
};

exports.delete = (req, res) => {
    User.findOne({"email":req.body.email})
    .then(note => {

        
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        User.findByIdAndRemove(note._id)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({message: "Note deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });                
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};