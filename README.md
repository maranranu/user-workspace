# Workspace
REST API service with workspace creation using graphDB and EFS

# How to run application
Create .env file, copy from .env.example and update required configuration value
npm start

## Hit APIs
- Graph
  - Create:
    - curl -X POST  -H 'Content-Type: application/json' http://localhost:8081/workspace/graph  --data '{"name": "folder-2", "type": "folder", "userId": 1}'
    - curl -X POST  -H 'Content-Type: application/json' http://localhost:8081/workspace/graph  --data '{"name": "file-1", "type": "file", "userId": 1, "content": "", "parentId": "68574813"}'
  - Get:
   - curl  http://localhost:8081/workspace/graph?userId=1
   - curl -XGET  http://localhost:8081/workspace/graph?userId=1\&parentId\=68574813
  - Update: curl -X PUT  -H 'Content-Type: application/json' http://localhost:8081/workspace/graph/68576988  --data '{"name": "file-updated"}'
   - Delete: curl -X DELETE http://localhost:8081/workspace/graph/68574813

- EFS
  - Create:
    - curl -X POST  -H 'Content-Type: application/json' http://localhost:8081/workspace/efs  --data '{"name": "folder1", "type": "folder", "userId": 1, "pwdPath": ""}'
    - curl -X POST  -H 'Content-Type: application/json' http://localhost:8081/workspace/efs  --data '{"name": "file-1", "type": "file", "userId": 1, "pwdPath": "folder1"}'
  - Get:
    - curl  http://localhost:8081/workspace/efs?userId=1&pwdPath='folder1'
  - Update: curl -X PUT  -H 'Content-Type: application/json' http://localhost:8081/workspace/efs/rename  --data '{"name": "folder_updated_2", "userId": 1, "pwdPath": "folder2", "type": "folder"}'
  - Delete: curl -XDELETE http://localhost:8081/workspace/efs\?userId\=1\&pwdPath\='folder-check'
