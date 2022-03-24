const express = require('express');
const router = express.Router();
//get request
router.get('/', (req, res)=>{
    res.send('Server esta corriendo');
});
module.exports = router;