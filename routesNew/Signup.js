import express from "express";
import Users from "../models/users";

const router = express.Router();
router.post('/signup', function (req, res, next) {
  const user = new Users(req.body).save(function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login/' + req.body.email);
    }
  });
});

export default router;