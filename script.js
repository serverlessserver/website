var actual;

function ready() {
    actual = document.getElementById("upload_panel");
    actual.style.display = "block";
}

document.addEventListener("DOMContentLoaded", ready);

function run_panel() {
    actual.style.display = "none";
    document.getElementById("run_panel").style.display = "block";
    actual = document.getElementById("run_panel");
}
function upload_panel() {
    actual.style.display = "none";
    document.getElementById("upload_panel").style.display = "block";
    actual = document.getElementById("upload_panel")
}
function update_panel() {
    actual.style.display = "none";
    document.getElementById("update_panel").style.display = "block";
    actual = document.getElementById("update_panel")
}
function get_lambda_panel() {
    actual.style.display = "none";
    document.getElementById("get_lambda_panel").style.display = "block";
    actual = document.getElementById("get_lambda_panel")
}
function delete_panel() {
    actual.style.display = "none";
    document.getElementById("delete_panel").style.display = "block";
    actual = document.getElementById("delete_panel")
}
function get_token_panel() {
    actual.style.display = "none";
    document.getElementById("get_token_panel").style.display = "block";
    actual = document.getElementById("get_token_panel")
}


function run() {
    var form = document.getElementById("run");

    var obj = {
        "times":""
    };

    var elements = form.querySelectorAll( "input, select" );

    var name = elements[0].value;

    obj.times = elements[1].value;

    var token = "Bearer " + elements[2].value;

    var json = JSON.stringify( obj);

    var req = new XMLHttpRequest();

    req.open('POST', 'http://localhost:8080/lambdas/' + name +'/execute', true);
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            var answer = req.responseText;
            var ob = JSON.parse(answer)
            output_run.innerText = ob.message;
        }
    };
    req.setRequestHeader('Content-type', 'application/json');
    req.setRequestHeader('Authorization', token)
    req.send(json);
}
function upload() {
    var form = document.getElementById( "upload" );

    var obj = {"name":"",
        "runtimeAttributes":{
            "language":"",
            "code":""
        }};

    var elements = form.querySelectorAll( "input, select" );

    obj.name = elements[0].value;

    var r = obj.runtimeAttributes;
    r.language = elements[1].value;

    var file = elements[2].files[0];

    var reader = new FileReader();

    reader.onload = function(event) {
        var content = event.target.result;
        r.code = content;
        var json = JSON.stringify( obj, null, '  ');


        var req = new XMLHttpRequest();

        req.open('POST', 'http://localhost:8080/lambdas', true);
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                var token = req.responseText;
                var ob = JSON.parse(token)
                upload_token.value = ob.token
            }
        };
        req.setRequestHeader('Content-type', 'application/json');
        req.send(json);
    };

    reader.readAsText(file);
}
function update() {
    var form = document.getElementById( "update" );

    var obj = {"name":"",
        "runtimeAttributes":{
            "language":"",
            "code":""
        }};

    var elements = form.querySelectorAll( "input, select" );

    var token = "Bearer " + elements[3].value;

    obj.name = elements[0].value;

    r = obj.runtimeAttributes;
    r.language = elements[1].value;

    file = elements[2].files[0];

    var reader = new FileReader();

    reader.onload = function(event) {
        var content = event.target.result;
        r.code = content;
        var json = JSON.stringify( obj, null, '  ');

        var req = new XMLHttpRequest();

        req.open('PUT', 'http://localhost:8080/lambdas/' + obj.name, true);
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                var token = req.responseText;
                var ob = JSON.parse(token)
                update_token.value = ob.token
            }
        };
        req.setRequestHeader('Content-type', 'application/json');
        req.setRequestHeader('Authorization', token)
        req.send(json);
    };

    reader.readAsText(file);
}
function get_lambda() {
    var form = document.getElementById( "get_lambda" );

    var elements = form.querySelectorAll( "input" );

    var name = elements[0].value;

    var token = "Bearer " + elements[1].value;

    var req = new XMLHttpRequest();

    req.open('GET', 'http://localhost:8080/lambdas/' + name, true);
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            output_get_lambda.innerText = req.responseText
        }
    };
    req.setRequestHeader('Authorization', token)
    req.send();
}
function delete_lambda() {
    var form = document.getElementById("delete");

    var elements = form.querySelectorAll("input");

    var name = elements[0].value;

    var token = "Bearer " + elements[1].value;

    var req = new XMLHttpRequest();

    req.open('DELETE', 'http://localhost:8080/lambdas/' + name, true);
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.responseText.message == undefined) output_delete.innerHTML = "OK"
            else output_delete.innerHTML = req.responseText.message
        }
    };
    req.setRequestHeader('Authorization', token)
    req.send();
}
function get_token() {
    var form = document.getElementById("get_token");

    var elements = form.querySelectorAll("input");

    var name = elements[0].value;

    var token = "Bearer " + elements[1].value;



    var req = new XMLHttpRequest();

    req.open('GET', 'http://localhost:8080/lambdas/' + name + "/token?expiryDate=" + elements[2].value +"%2000-00-00", true);
    req.onreadystatechange = function() {
        console.log(elements[2].value)
        if (req.readyState === 4) {
            output_get_token.value = req.responseText
            console.log(req.responseText)
        }
    };
    req.setRequestHeader('Authorization', token)
    req.send();
}

