const { Router } = require("express");

const adminchecker = require("../middleware/admin.checker");
const upload = require("../middleware/upload.middleware");
const { createCitation, deleteCitation } = require("../controller/citation.controller");

const CitationRouter = Router();

CitationRouter.put("/update_citation/:id", adminchecker,  updateCitation);
CitationRouter.delete("/delete_citation/:id", adminchecker, deleteCitation);
CitationRouter.post("/add_citation/:id", adminchecker,  addCitation);

module.exports = CitationRouter;