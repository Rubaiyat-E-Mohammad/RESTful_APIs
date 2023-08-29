const http = require('http') //Import http core module
const PORT = process.env.PORT || 3000
const todos = require('./todos')
const getRequestData = require('./utils')
//Create server - return a server object
const server = http.createServer(async (request, response)=>{
	//header information -> text/javascript, json
    if(request.url === "/api/v1/todos" && request.method === "GET"){
        //set the status code, and content-type
        response.writeHead(200, {"content-type":"application/json"})
        //send the data
        response.end(JSON.stringify(todos))
    }
    else if(request.url === "/api/v1/todos" && request.method === "POST"){
        let request_body = await getRequestData(request)
        todos.push(JSON.parse(request_body))
        //set the status code and content-type
        response.writeHead(201, {"content-type":"application/json"})
        //send the todo
        response.end(JSON.stringify(request_body))
    }
    else if (request.url.match(/\/api\/v1\/todos\/([0-9]+)/) && request.method === "PUT"){
        //get the id from url
        const id = request.url.split("/")[4]
        const todo = todos.find(t => t.id === parseInt(id))
        if(!todo){
            response.writeHead(404, {"content-type":"application/json"})
            response.end('No todo with id present')
        } else{
            let todo_data = await getRequestData(request)
            todos.push(JSON.parse(todo_data))
            response.writeHead(404, {"content-type":"application/json"})
            response.end(JSON.stringify(todo_data))
        }
    }
    else if(request.url.match(/\/api\/v1\/todos\/([0-9]+)/) && request.method === "DELETE"){
        //get the id from url
        const id = request.url.split("/")[4]
        const todo = todos.find(t => t.id === parseInt(id))
        if(!todo){
            response.writeHead(404, {"content-type":"application/json"})
            response.end('No todo with id present')
        } else{
            const index = todos.indexOf(todo)
            todos.splice(index, 1)
            response.writeHead(404, {"content-type":"application/json"})
            response.end('Deleted')
        }
    }
	
})
//make the server listen for clients
//event emitter model
//server -> emits a listen event, port no etc
server.listen(PORT, ()=>{
	console.log("server is listening at port", PORT)
})
server.on('error', (error)=>{
	if(error.code === 'EADRINUSE'){
		console.log('Port already in use')
	}
})