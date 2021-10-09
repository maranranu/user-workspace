const model = require('./arango-orm/model');
const { graphDB: config } = require('config');

class Workspace {
  constructor() {
    this.vertices = config.collections['vertices'];
  }

  _documentObject(data) {
    return data._result.filter(item => item)
  }

  findOne (filters) {
    return model.getNode(filters)
  }

  find (filters, pageno, limit, isParent) {
    pageno = pageno ? parseInt(pageno) : 1;
    limit = limit ? parseInt(limit) : 5;
    return isParent ? model.getNeighbourChild(filters, pageno, limit) : model.getRootNodes(filters, pageno, limit);
  }

  async create (data, parentId) {
    try {
      let document = await model.createVertices(data, parentId);
      document = this._documentObject(document);
      if (document && document.length) {
        parentId = parentId || document[0]._key
        let edges = await model.createEdges(document[0]._id, parentId);
        edge = this._documentObject(edge);
        return await model.getNode([filters.idFilter(edge[0]._from)]);
      } else {
        throw new Error('Failed to create document');
      }
      return document;
    } catch (error) {
      throw error;
    }
  }

  updateDocument (data) {
    return model.update(data)
  }

  async destroy (id) {
    try {
      let vertices = await this.findOne([filters.keyFilter(id)]);
      vertices = this._documentObject(vertices);
      let verticesIds = vertices.map(ver => { return ver._id });
      verticesIds.push(`${this.vertices}/${id}`);
      await model.deleteVertices(verticesIds);
      return model.deleteEdges(verticesIds)
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Workspace;
