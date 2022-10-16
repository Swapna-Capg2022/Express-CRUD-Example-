var UserModel = require('../model/user');

//Create and Save a new user

exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName
        && !req.body.lastName && !req.body.phone) {
        res.status(400).send({ message: "Content cannot be empty" });
    }

    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });

    await user.save().then(data => {
        res.send({
            message: "User added Successfully!!!",
            user: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating user..."
        });
    });
}; //close create user 

//retrives All users from the database

exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};//close find all users

//find a single user with a particular id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};//close find all users

//update the user by using id in the request

exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
    }

    const id = req.params.id;

    await UserModel.findByIdAndUpdate(id, req.body, { userFindAndModify: false }).then(
        data => {
            if (!data) {
                res.status(400).send({ message: "User Not Found" });
            } else {
                res.send({ message: "User Updated Successfully" });
            }
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
};//close of update

//delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).then(data =>{
        if (!data) {
            res.status(400).send({ message: "User Not Found" });
        } else {
            res.send({ message: "User Deleted Successfully" });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};