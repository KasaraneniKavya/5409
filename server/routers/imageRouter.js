const router = require("express").Router();
const { uploadImage } = require("../models/imageModel");

router.put("/upload/:userid", async (req, res) => {
    //how send image in request and retrieve?
    const image = req.body.image;
    const userid = req.params.userid;
    try {
        const key = await uploadImage(image, userid);
        res.status(200).send({
            "key" : key
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error uploading image.");
    }
});

module.exports = router;