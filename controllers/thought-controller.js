const { Thought, User } = require('../models');

const thoughtController = {

    getThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
},
    getThoughtByID({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
        },
    addThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id:req.body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
                })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'Incorrect thought data!' });
                        return;
                    }
                    res.json({ mesaage: 'Thought successfully created!' });
                })
                .catch(err => res.json(err));
        },
     updateThought(req, res) {
        Thought.findByIdAndUpdate({ _id: params.thoughtId },{ $set: req.body}, { runValidators: true, new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                        return;
                    }
                    res.json(dbThoughtData);
                })
                .catch(err => res.json(err));
        },
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.thoughtId }, { runValidators: true, new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                        return;
                    }
                    res.json(dbThoughtData);
                })
                .catch(err => res.json(err));
        },
     addReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
        },
    deleteReaction({params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId : params.reactionId}}},
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
        }
    }
    
    
    module.exports = thoughtController;