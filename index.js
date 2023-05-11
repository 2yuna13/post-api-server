const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { Post } = require("./models");

mongoose
  .connect("mongodb+srv://shha0213:@cluster0.al9mmxc.mongodb.net/test")
  .then((res) => {
    console.log("mongodb connected");
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Blog");
});

app.get("/posts", async (req, res) => {
  const allPosts = await Post.find({});

  res.send(allPosts);
});

// x번 게시물 보여줘!
app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const postById = await Post.findOne({ id });

  res.send(postById);
});

// 클라이언트 -> 서버 글 저장해줘
app.post("/posts", async (req, res) => {
  const { id, title, content, author } = req.body;
  const newPost = await Post.create({
    id,
    title,
    content,
    author,
  });

  res.send(newPost);
});

app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content, author } = req.body;

  const updatePost = await Post.findOneAndUpdate(
    { id },
    { title, content, author }
  );

  res.send(updatePost);
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;

  await Post.findOneAndDelete({ id });

  res.send("OK");
});

app.listen(3000);
