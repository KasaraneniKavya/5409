const router = require("express").Router();
const { getText, createTable } = require("../models/textModel");

router.get("/:userid/:key", async (req, res) => {
    const userId = req.params.userid;
    const key = req.params.key;
    try {
        const text = await getText(userId, key);
        res.status(200).send({
            text : text
        });
    } catch (err) {
        res.status(500).send({
            message: "Error fetching text.",
            error: err
        });
    }
});

router.post("/createtable/:userid/", async (req, res) => {
    const userId = req.params.userid;
    try {
        await createTable(userId);
        res.status(200).send({
            message: "table created"
        });
    } catch (err) {
        res.status(500).send({
            message: "Error creating table.",
            error: err
        });
    }
});

module.exports = router;