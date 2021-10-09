const {objectToString} = require('./helpers');
const crypto = require('crypto');
const filters = require('./filter')

const Database = require('arangojs').Database

const db = new Database(config.graphDB.url)
db.useDatabase(config.graphDB.database)
db.useBasicAuth(config.graphDB.user, config.graphDB.password)

let vertices = config.graphDB.collections['vertices']
let edges = config.graphDB.collections['edges']

function getNeighbourChild (filterObj, pageno, limit) {
  let offset = (pageno - 1) * limit
  let filterStr = objectToString('algo', filterObj)

  return db.query({
    query: `FOR algo IN ${vertices} \
      ${filterStr['filter']} \
      FOR vertex,edge IN INBOUND algo ${edges} \
      FILTER edge._to != edge._from \
      SORT vertex.updatedAt DESC \
      LIMIT ${offset},${limit} \
      RETURN vertex`,
    bindVars: filterStr['bind']
  })
}

function createVertices (data, parentId) {
  let hash = crypto.randomBytes(16).toString('hex')
  data['algorithmHash'] = hash
  data = JSON.stringify(data)
  return db.query(`INSERT ${data} INTO ${vertices} RETURN NEW`)
}

function createEdges (child, parent) {
  return db.query({
    query: `INSERT { _from: '${child}', _to: '${vertices}/${parent}' } INTO ${edges} RETURN NEW`,
    bindVars: {}
  })
}

function updateDocument (data) {
  return db.query({
    query: `UPDATE '${data._key}' WITH ${JSON.stringify(data)} IN ${vertices} RETURN NEW`,
    bindVars: {}
  })
}

function deleteVertices (keys) {
  return db.query({
    query: `FOR algo in ${vertices} FILTER algo._id IN @keys \
            REMOVE algo IN ${vertices}`,
    bindVars: {keys: keys}
  })
}

function deleteEdges (keys) {
  return db.query({
    query: `FOR edge in ${edges} FILTER edge._to IN @keys || edge._from IN @keys REMOVE edge IN ${edges}`,
    bindVars: {keys: keys}
  })
}

function getRootNodes (filterObj, pageno, limit) {
  let offset = (pageno - 1) * limit
  let filterStr = objectToString('algo', filterObj)
  return db.query({
    query: `FOR algo IN ${vertices} \
    ${filterStr['filter']} \
    FOR v,e IN OUTBOUND algo ${edges} \
    FILTER e._to == e._from \
    COLLECT data = v \
    SORT data.updatedAt DESC \
    LIMIT ${offset},${limit} \
    RETURN data`,
    bindVars: filterStr['bind']
  })
}

function getAllRootNodes (filterObj) {
  let filterStr = objectToString('algo', filterObj)
  filterStr['bind'] = Object.assign({}, filterStr['bind'], { 'n': config.graphDB.maxDepth })
  return db.query({
    query: `FOR algo IN ${vertices} \
    ${filterStr['filter']} \
    FOR  v IN 0..@n INBOUND algo ${edges}
    COLLECT data = v \
    SORT data.updatedAt DESC \
    RETURN data`,
    bindVars: filterStr['bind']
  })
}

function getNode (filterObj) {
  let filterStr = objectToString('algo', filterObj)

  return db.query({
    query: `FOR algo IN ${vertices} \
              ${filterStr['filter']} \
              RETURN algo`,
    bindVars: filterStr['bind']
  })
}


module.exports = {
  getNeighbourChild: queryNeighboursChild,
  createVertices: createVertices,
  createEdges: createEdges,
  update: updateDocument,
  deleteVertices: deleteVertices,
  deleteEdges: deleteEdges,
  getRootNodes: getRootNodes,
  getAllRootNodes: getAllRootNodes,
  getNode: getNode,
  getEdges: getEdges,
}
