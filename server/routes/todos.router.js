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

// post route
router.post('/', (req, res) => {
    console.log('POST /todos got a request, here is req.body:')
    console.log(req.body)
    const sqlQueryText = `
      INSERT INTO "todos"
        ("text", "isComplete")
        VALUES
        ($1, false);
    `
    const sqlValues = [req.body.text]
    pool.query(sqlQueryText, sqlValues)
      .then((dbResult) => {
        res.sendStatus(201)
      }).catch((dbError) => {
        console.log('POST /todos SQL query failed:', dbError)
        res.sendStatus(500)
      })
});


module.exports = router;
