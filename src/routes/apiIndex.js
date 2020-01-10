import express from 'express';
const router = express.Router()

router.get('/v1/todo', async(req, res)=>{
    try{
        const data = [
            { "id": "01", "executor": "Jason", "text": "Buy milk", "status": "TODO" },
            { "id": "02", "executor": "Sam", "text": "Meeting with a client", "status": "TODO" },
            { "id": "03", "executor": "Kate", "text": "Create new project", "status": "TODO" },
            { "id": "04", "executor": "All", "text": "Update site", "status": "DOING" },
            { "id": "05", "executor": "Sam", "text": "Write new posts", "status": "DONE" },
            { "id": "06", "executor": "Jason", "text": "Fix my phone", "status": "DONE" }
        ];
        res.send({status: 200, error: false, data: data})
    }catch(e){
        res.send({status: 500, error: true, data: []})
    }
})

export default router;