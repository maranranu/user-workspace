const WorkspaceModel = require('../database/workspaceEfs.model');
/**
 * Class Workspace Controller
 **/

class WorkspaceEFSController {
  constructor () {
    this.model = new WorkspaceModel();
  }
  async getAll(req, res) {
    try {
      const data = await this.model.findAll(req.query);
      res.json(data);
    } catch (error) {
      res.json({
        success: false,
        message: error.message || error
      });
    }
  }

  async create(req, res) {
    try {
      await this.model.create(req.body);
      res.json({
        message: 'Created',
        success: true
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message || error
      });
    }
  }

  async update(req, res) {
    try {
      await this.model.update(req.params.action, req.body);
      res.json({
        message: 'Updated',
        success: true
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message || error
      });
    }
  }

  async remove(req, res) {
    try {
      await this.model.destroy(req.query);
	    res.send('Worksapce deleted.');
    } catch (error) {
      res.json({
        success: false,
        message: error.message || error
      });
    }
  }
}

module.exports = WorkspaceEFSController;
