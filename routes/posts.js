const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    posts: {
      title: 'My first post',
      description:
        "some random data you shouldn't access without getting logged in",
    },
  });
});

module.exports = router;
