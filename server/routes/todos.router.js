const router = require('express').Router();
const pool = require('../modules/pool');

// get route
router.get('/', (req, res) => {
const sqlQueryText = `
    SELECT * FROM "todos"
    ORDER BY "id";
`;
pool.query(sqlQueryText)
    .then((dbResult) => {
    console.log('dbResult.rows:', dbResult.rows)
    res.send(dbResult.rows)
    }).catch((dbError) => {
    res.sendStatus(500)
    })
});


module.exports = router;
