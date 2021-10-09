# Workspace
REST API service with workspace creation using graphDB and EFS


# How to run application
npm start

## Hit APIs
- Graph
  - Create:
    - curl -X POST  -H 'Content-Type: application/json' http://localhost:8081/workspace/graph  --data '{"name": "folder-1", "type": "folder", "userId": 1}'
    - curl -X POST  -H 'Content-Type: application/json' http://localhost:8081/workspace/graph  --data '{"name": "file-1", "type": "file", "userId": 1}'
  - Get:
   - curl  http://localhost:8081/workspace/graph?userId=1
   - Update: curl -X PUT  -H 'Content-Type: application/json' http://localhost:8081/workspace/graph/1  --data '{"name": "folder-updated-1"}'
   - Delete: curl -X DELETE http://localhost:8081/workspace/graph/1

- EFS
  - Create:
    - curl -X POST  -H 'Content-Type: application/json' http://localhost:8081/workspace/efs  --data '{"name": "folder-1", "type": "folder", "userId": 1, "pwdPath": ""}'
    - curl -X POST  -H 'Content-Type: application/json' http://localhost:8081/workspace/efs  --data '{"name": "file-1", "type": "file", "userId": 1, "pwdPath": "root-1"}'
  - Get:
    - curl  http://localhost:8081/workspace/efs?userId=1&pwdPath='root-1'
  - Update: curl -X PUT  -H 'Content-Type: application/json' http://localhost:8081/workspace/efs/rename  --data '{"name": "folder-updated-1"}'
  - Delete: curl -X DELETE http://localhost:8081/workspace/efs?userId=1&pwdPath='root-1'
