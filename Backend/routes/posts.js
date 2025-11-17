const express = require('express');
const router = express.Router();
const {
  createPost,
  getPost,
  like,
  comment,
  feed,
  explore,
} = require('../controllers/postController');
const { upload } = require('../config/cloudinary');


// 🧩 Create a post
router.post('/', upload.single('image'), createPost);


// 🧩 Get a single post by ID
router.get('/:id', getPost);

// 🧩 Like / Unlike a post
router.put('/:id/like', like);

// 🧩 Comment on a post
router.post('/:id/comment', comment);

// 🧩 Get feed (posts from followed users)
router.get('/feed/me', feed);

// 🧩 Explore posts (random/public)
router.get('/explore/all', explore);

module.exports = router;
