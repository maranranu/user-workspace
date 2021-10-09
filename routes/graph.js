const express = require('express');
const router = express.Router();

/**
 * Routing for Articles
 */
const WorkspaceGraphController = require("../controllers/WorkspaceGraphController");
const controller = new WorkspaceGraphController();

router.get('/', (req, res) => { controller.getAll(req, res) });
router.post('/', (req, res) => { controller.create(req, res) });
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.remove(req, res));

module.exports = router;
