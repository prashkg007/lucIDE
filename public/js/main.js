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
codeInputSection = document.getElementById("input-field");
form = document.getElementById('submit-code');
submitButton = document.querySelector('form > input');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    submitButton.disabled = true;
    console.log(`${editor.getValue()}`);
    codeContent = editor.getValue();
    codeInput = codeInputSection.value;
    socket.emit('codeSubmitted', {codeContent, codeInput});
});

socket.on('outputGenerated', ({codeOutput}) => {
    console.log(`Output of code: ${codeOutput}`);
    submitButton.disabled = false;
    const outputField = document.getElementById("output-field");
    outputField.textContent = codeOutput;
});