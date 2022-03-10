const router = require('express').Router();

const {
    getUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

router.route('/')
.get(getUsers)
.post(addUser);

router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

router.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);