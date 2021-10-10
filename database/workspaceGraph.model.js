const model = require('./arango-orm/model');
const { graphDB: config } = require('config');
const filters = require('./arango-orm/filter');

class Workspace {
  constructor() {
    this.vertices = config.collections['vertices'];
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
      if (document) {
        parentId = parentId || document._key
        let edge = await model.createEdges(document._id, parentId);
        return await model.getNode([filters.idFilter(edge._from)]);
      } else {
        throw new Error('Failed to create document');
      }
      return document;
    } catch (error) {
      throw error;
    }
  }

  update (data) {
    return model.update(data)
  }

  async destroy (id) {
    try {
      let vertices = await this.findOne([filters.keyFilter(id)]);
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
