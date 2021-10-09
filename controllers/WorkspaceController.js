const WorkspaceModel = require('../database/workspace.model');
const filters = require('../database/arango-orm/filter');

/**
 * Class Workspace Controller
 **/

class WorkspaceController {
  async getAll(req, res) {
    try {
      let filterObj = [];
      let isParent = false;
      /** user ID should come from authentication token **/
      filterObj.push(filters.userFilter(req.query.userId));
      if (req.query.parentId) {
        filterObj.push(filters.keyFilter(req.query.parentId))
        isParent = true
      }
	    const data = await WorkspaceModel.find(filterObj, req.query.page, req.query.per_page, isParent);
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
      let parentId = req.body.parentId;
      delete req.body.parentId;
      /** add some content to file **/
      if(req.body.type === 'file') {
        req.body['code'] = 'File content';
      }
      await WorkspaceModel.create(req.body, parentId);
      res.json({
        success: true,
        message: 'Workspace created.'
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
      let id = req.params.id;
      req.body['_key'] = id;
	    const data = await WorkspaceModel.update(req.body);
      res.json({
        success: true,
        message: 'Workspace updated.'
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
	    let id = req.params.id;
      await WorkspaceModel.destroy(id);
      res.send('Worksapce deleted.');
    } catch (error) {
      res.json({
        success: false,
        message: error.message || error
      });
    }
  }
}

module.exports = WorksapceController;
