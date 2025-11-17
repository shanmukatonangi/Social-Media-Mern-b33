const Post = require('../models/Posts');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No image uploaded' });
    }

    const imageUrl = req.file.path; // multer-storage-cloudinary automatically gives this
    const { caption } = req.body;

    const post = new Post({
      user: req.user._id,
      caption,
      image: imageUrl,
    });

    await post.save();
    await post.populate('user', 'username name avatar');
    res.status(201).json(post);
  } catch (err) {
    console.error('Error in createPost:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'username name avatar')
      .populate('comments.user', 'username name avatar');
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.like = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const uid = req.user._id;
    if (!post.likes.includes(uid)) {
      post.likes.push(uid);
      await post.save();
      return res.json({ msg: 'Liked' });
    }

    post.likes = post.likes.filter(id => !id.equals(uid));
    await post.save();
    res.json({ msg: 'UnLiked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.comment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: 'Empty comment' });

    post.comments.push({ user: req.user._id, text });
    await post.save();
    await post.populate('comments.user', 'username name avatar');
    res.json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.feed = async (req, res) => {
  try {
    // feed = posts by you + people you follow
    const me = await req.user.populate('following');
    const ids = me.following.map(u => u._id).concat([me._id]);
    const posts = await Post.find({ user: { $in: ids } })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('user', 'username name avatar')
      .populate('comments.user', 'username name');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.explore = async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1');
    const limit = 12;
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('user', 'username name avatar');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
