var connection = new WebSocket('ws://localhost:8000');

connection.onopen = function(){
    /*Send a small message to the console once the connection is established */
    console.log('Connection open!');
}

connection.onclose = function(){
    console.log('Connection closed');
}

connection.onerror = function(error){
    console.log('Error detected: ' + error);
}

connection.onmessage = function(e){
    const server_message = e.data;
    if(server_message.includes('[FIN]')) {
        document.querySelectorAll('div.status').forEach(e => {
            e.remove()

        })
        document.querySelectorAll('a.btn.btn-primary')
            .forEach(e => e.classList.remove('disabled'))
    }
    console.log(server_message);
}