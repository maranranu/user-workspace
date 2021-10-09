const express = require('express');
const router = express.Router();

/**
 * Routing for Articles
 */
const WorkspaceEfsController = require("../controllers/WorkspaceEfsController");
const controller = new WorkspaceEfsController();

router.post('/', (req, res) => { controller.create(req, res) });
router.get('/', (req, res) => { controller.getAll(req, res) });
router.put('/:action', (req, res) => controller.update(req, res));
router.delete('/', (req, res) => controller.remove(req, res));

module.exports = router;
