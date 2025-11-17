const express = require('express');
const router = express.Router();
const { getUser, followUser, unfollowUser } = require('../controllers/userController');

// Test if functions imported properly
console.log({ getUser, followUser, unfollowUser });

router.get('/:id', getUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);

module.exports = router;
