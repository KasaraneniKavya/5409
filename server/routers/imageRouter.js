const router = require("express").Router();
const { uploadImage, getImages } = require("../models/imageModel");
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
        res.status(500).send({
            message: "Error uploading image.",
            error: err.message
        });
    }
});

router.get("/:userid", async (req, res) => {
    const userid = req.params.userid;
    try {
        const images = await getImages(userid);
        res.status(200).send({
            images : images
        });
    } catch (err) {
        res.status(500).send({
            message: "Error fetching images.",
            error: err.message
        });
    }
});

module.exports = router;