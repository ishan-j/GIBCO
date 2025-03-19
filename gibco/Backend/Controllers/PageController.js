const Page = require("../models/PageModel");

// Create a new page
exports.createPage = async (req, res) => {
  try {
    const { name, fields } = req.body;
    const newPage = new Page({ name, fields });
    await newPage.save();
    res.status(201).json(newPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all pages
exports.getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single page by ID
exports.getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a page by ID
exports.updatePage = async (req, res) => {
  try {
    const updatedPage = await Page.findByIdAndUpdate(req.params.id, req.body, {
     
    });
    if (!updatedPage) return res.status(404).json({ message: "Page not found" });
    res.status(200).json(updatedPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a page by ID
exports.deletePage = async (req, res) => {
  try {
    const deletedPage = await Page.findByIdAndDelete(req.params.id);
    if (!deletedPage) return res.status(404).json({ message: "Page not found" });
    res.status(200).json({ message: "Page deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
