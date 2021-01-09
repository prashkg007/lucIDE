let socket = io();
// socket.on('connect', function(){});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){});

//editor config
var editor = ace.edit("editor");
editor.setValue(`#include <bits/stdc++.h>\nusing namespace std;\n\nint main(){\n\n\tcout << "Hello World!";\n\n\treturn 0;\n}`);
editor.setTheme("ace/theme/dracula");

var CppMode = ace.require("ace/mode/c_cpp").Mode;
editor.session.setMode(new CppMode());

//code sending and response
form = document.getElementById('submit-code');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(`${editor.getValue()}`);
    codeContent = editor.getValue();
    socket.emit('codeSubmitted', {codeContent});
});