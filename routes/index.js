const router = require('express').Router();
const apiRouters = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    return res.send('Incorrect route!');
});

module.exports = router;