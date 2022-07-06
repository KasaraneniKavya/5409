const router = require("express").Router();
const { getText, createTable } = require("../models/textModel");

router.get("/:userid/:key", async (req, res) => {
    const userId = req.params.userid;
    const key = req.params.key;
    try {
        var text = await getText(userId, key);
        res.status(200).send({
            "text" : text
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching text.");
    }
});

router.post("/createtable/:userid/", async (req, res) => {
    const userId = req.params.userid;
    try {
        await createTable(userId);
        res.status(200).send("table created");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching text.");
    }
});

module.exports = router;