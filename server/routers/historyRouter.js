const router = require("express").Router();
const { deleteImage } = require("../models/imageModel");
const { deleteText } = require("../models/textModel");

router.delete("/:userid/:id", async (req, res) => {
    const userId = req.params.userid;
    const id = req.params.id;
    try {
        await deleteImage(userId, id);
        await deleteText(userId, id);
        res.status(200).send({
            message: "document deleted"
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "error deleting document",
            error: err.message
        });
    }
});

module.exports = router;