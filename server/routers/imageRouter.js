const router = require("express").Router();
const { uploadImage } = require("../models/imageModel");
const multer = require('multer');

router.put("/upload/:userid", multer().array('image',1), async (req, res) => {
    const image = req.files[0];
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