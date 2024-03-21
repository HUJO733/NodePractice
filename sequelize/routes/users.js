// express 모듈을 가져오고, User와 Comment 모델도 가져옵니다.
const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

// express 라우터를 생성합니다.
const router = express.Router();

// 루트 경로에 대한 GET 및 POST 요청을 처리합니다.
router.route('/')
  .get(async (req, res, next) => {
    try {
      // 모든 사용자 정보를 조회합니다.
      const users = await User.findAll();
      // 조회된 사용자 정보를 JSON 형식으로 응답합니다.
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      // 요청 바디에서 받은 정보로 새로운 사용자를 생성합니다.
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      // 생성된 사용자 정보를 로그에 출력하고, 201 Created 상태로 응답합니다.
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// 특정 사용자의 댓글을 조회하는 라우트를 정의합니다.
router.get('/:id/comments', async (req, res, next) => {
  try {
    // 해당 사용자의 ID를 사용하여 댓글을 조회합니다.
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });
    // 조회된 댓글을 JSON 형식으로 응답합니다.
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 이 라우터를 외부에서 사용할 수 있도록 내보냅니다.
module.exports = router;
