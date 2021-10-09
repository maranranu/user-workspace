module.exports = {
  port: 8081,
  graphDB: {
    user: process.env.GRAPH_DATABASE_USER,
    password: process.env.GRAPH_DATABASE_PASSWORD,
    database: process.env.GRAPH_DATABASE_NAME,
    url: process.env.GRAPH_DATABASE_HOST,
    collections: {
      vertices: process.env.VERTICES,
      edges: process.env.EDGES
    }
  },
  efs: {
    homePath: process.env.EFS_PATH
  }
}
