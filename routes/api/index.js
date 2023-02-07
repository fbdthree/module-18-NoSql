const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/user', courseRoutes);
router.use('/thoughts', studentRoutes);

module.exports = router;
