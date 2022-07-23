const fs = require("fs");
const PDFDocument = require('pdfkit');
const router = require("express").Router();
const { getText, createTable } = require("../models/textModel");

router.get("/:userid/:key", async (req, res) => {
    const userId = req.params.userid;
    const key = req.params.key;
    try {
        const text = await getText(userId, key);
        res.status(200).send(text);
    } catch (err) {
        res.status(500).send({
            message: "Could not get text.",
            error: err.message
        });
    }
});

//https://www.geeksforgeeks.org/how-to-create-pdf-document-in-node-js/
//https://stackoverflow.com/questions/15484350/serving-temporary-files-with-nodejs
router.get("/download/:userid/:key", async (req, res) => {
    const userId = req.params.userid;
    const key = req.params.key;
    const file = key+".pdf";
    try {
        const response = await getText(userId, key);
        const text = response.text;
        const pdf = new PDFDocument;
        const stream = fs.createWriteStream(file);
        pdf.pipe(stream);
        pdf.text(text);
        pdf.end();
       
        //https://github.com/foliojs/pdfkit/issues/265
        stream.on('finish',() => {
            res.download(file, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        message: "Could not get file.",
                        error: err.message
                    });
                }
                fs.unlinkSync(file);
            });
        })
    } catch (err) {
        fs.unlinkSync(file);
        res.status(500).send({
            message: "Could not get file.",
            error: err.message
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
            error: err.message
        });
    }
});

module.exports = router;