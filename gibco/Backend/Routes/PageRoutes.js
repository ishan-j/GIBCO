const express = require("express");
const router = express.Router();
const PageController = require("../controllers/pageController");

// Create a new page
router.post("/", PageController.createPage);

// Get all pages
router.get("/", PageController.getAllPages);

// Get a single page by ID
router.get("/:id", PageController.getPageById);

// Update a page by ID
router.put("/:id", PageController.updatePage);

// Delete a page by ID
router.delete("/:id", PageController.deletePage);

module.exports = router;
