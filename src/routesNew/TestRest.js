import express from "express";

const router = express.Router();
router.get('/test-rest', function (req, res, next) {
  res.render('TestRest');
});

export default router;