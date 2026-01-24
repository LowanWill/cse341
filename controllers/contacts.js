const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res, next) => {
  mongodb.getDb().collection('contacts').find().toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  }).catch((err) => {
    res.status(500).json({ message: err.message });
  });
};

const getSingle = (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .collection('contacts')
    .find({ _id: userId })
    .toArray()
    .then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const createContact = async (req, res) => {
    try {
        if (!req.body || !req.body.firstName) {
            return res.status(400).json({ message: 'Request body is missing or invalid' });
        }
        
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        
        const response = await mongodb.getDb().collection('contacts').insertOne(contact);
        if (response.acknowledged) {
            res.status(201).json(response); 
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the contact.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateContact = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const contact = {   
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().collection('contacts').replaceOne({ _id: userId }, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send(); 
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }   
};

const deleteContact = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('contacts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send(); 
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};