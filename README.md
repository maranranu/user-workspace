# Workspace
REST API service with workspace creation using graphDB


# How to run application
npm start

## Hit APIs
- Create:
   - curl -X POST  -H 'Content-Type: application/json' http://localhost:8081/workspace/create  --data '{"name": "folder-1", "type": "folder", "userId": 1}'
   - curl -X POST  -H 'Content-Type: application/json' http://localhost:8081/workspace/create  --data '{"name": "file-1", "type": "file", "userId": 1}'
- Get:
   - curl  http://localhost:8081/workspace?userId=1
- Update: curl -X PUT  -H 'Content-Type: application/json' http://localhost:8081/workspace/1  --data '{"name": "folder-updated-1"}'
- Delete: curl -X DELETE http://localhost:8081/workspace/1
