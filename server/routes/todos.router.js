const router = require('express').Router();
const pool = require('../modules/pool');

// get route
router.get('/', (req, res) => {
const sqlQueryText = `
    SELECT * FROM "todos"
    ORDER BY "isComplete", "dateCompleted";
`;
pool.query(sqlQueryText)
    .then((dbResult) => {
    console.log('dbResult.rows:', dbResult.rows)
    res.send(dbResult.rows);
    }).catch((dbError) => {
    res.sendStatus(500);
    });
});

// post route
router.post('/', (req, res) => {
    console.log('POST /todos got a request, here is req.body:')
    console.log(req.body);
    const sqlQueryText = `
      INSERT INTO "todos"
        ("text", "isComplete")
        VALUES
        ($1, false);
    `
    const sqlValues = [req.body.text];
    pool.query(sqlQueryText, sqlValues)
      .then((dbResult) => {
        res.sendStatus(201);
      }).catch((dbError) => {
        console.log('POST /todos SQL query failed:', dbError);
        res.sendStatus(500);
      });
});

// delete route
router.delete('/:id', (req, res) => {
    const sqlQueryText = `
    DELETE FROM "todos"
	    WHERE "id" = ($1);
    `
    const sqlValues = [req.params.id];
    pool.query(sqlQueryText, sqlValues)
    .then((dbResult) => {
        res.sendStatus(200);
      }).catch((dbError) => {
        console.log('DELETE /todos SQL query failed:', dbError);
        res.sendStatus(500);
      });
});

// put route
router.put('/:id', (req, res) => {
    const sqlQueryText = 
    `
    UPDATE "todos"
    SET "isComplete" = NOT "isComplete", "dateCompleted" = NOW()
      WHERE "id" = ($1);
    `
    const sqlValues = [req.params.id];
    pool.query(sqlQueryText, sqlValues)
      .then((dbResult) => {
        res.sendStatus(200);
      }).catch((dbError) => {
        console.log('PUT /todos SQL query failed:', dbError);
        res.sendStatus(500);
      })
});


module.exports = router;
