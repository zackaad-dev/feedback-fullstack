exports.getPosts = async (req, res) => {
  res.json({ message: "Get posts" });
};

exports.getPost = async (req, res) => {
  res.json({ message: "Get post" });
};

exports.createPost = async (req, res) => {
  res.json({ message: "Create post" });
};

exports.updatePost = async (req, res) => {
  res.json({ message: "Update post" });
};

exports.deletePost = async (req, res) => {
  res.json({ message: "Delete post" });
};
