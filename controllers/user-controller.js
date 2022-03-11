const { User } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
          .select('-__v')
          .then((dbUserData) => {
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
           
    addUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
            .then((dbUserData) => {
              if(!dbUserData) {
             return res.status(404).json({ message: 'No user with this id!' });
              }
              res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                   return res.status(404).json({ message: 'No user found with this ID!' });
                }

                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
        .then(dbUserData => {
            if(!dbUserData) {
               return res.status(404).json({ message: 'No user found with this ID!' });
            }

            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    },
    addFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
               return res.status(404).json({ message: 'No user found with this ID!' });
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
            if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
        },
    }

module.exports = userController;