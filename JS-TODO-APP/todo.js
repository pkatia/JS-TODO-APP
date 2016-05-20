

 function get_todos() {
    var todos = [];
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}

function add() {
    var text = document.getElementById('text').value;

    var todos = get_todos();
    todos.push(text);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    document.getElementById('text').value = "";

    return false;
}

function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}

function show() {
    var todos = get_todos();

    var html = '<form id="modal_form" >';
    for(var i=0; i<todos.length; i++) {
        html +='<input id="edit' + i + '" value="' + (i + 1) + '. '+ todos[i] + '" onclick="showModal(this)" ><button class="remove" id="' + i  + '">x</button>';
            };
    html += '</form>';

    document.getElementById('todos').innerHTML = html;

    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };  
}

document.getElementById('add').addEventListener('click', add);
show();

 
function showCover() {
      var coverDiv = document.createElement('div');
      coverDiv.id = 'cover-div';
      document.body.appendChild(coverDiv);
}

function hideCover() {
      document.body.removeChild(document.getElementById('cover-div'));
}

function callback(value, obj){obj.value = value;}

function showModal (obj) {
      showCover();
      var myModal = document.getElementById('myModal');
      var container = document.getElementById('container');
      var saveBtn = document.getElementById('saveBtn');
      var closeBtn = document.getElementById('closeBtn');
      var editFld = document.getElementById('editDiv')
      editFld.value = obj.value;
      container.style.display = 'block';
 
      function complete(value) {
        hideCover();
        container.style.display = 'none';
        document.onkeydown = null;
        callback(value, obj);
      }

      saveBtn.onclick = function() {
        var value = editFld.value;
        if (value == '') return false;

        complete(value, obj);
        return false;
      };

      closeBtn.onclick = function() {
        complete(obj.value, obj);
      };

      document.onkeydown = function(e) {

          switch (e.keyCode){
              case 27: {
                  complete(obj.value, obj);
                  break;
              }
              case 13:{
                  var value = editFld.value;
                  complete(value, obj);
                  break;
              }
              case 8:{
                  if (editFld.selectionStart >= 1 && editFld.value.length <= 1) {
                      saveBtn.disabled = true;
                      break;
                  }
              }
              case 46:{
                  if ((editFld.selectionStart < editFld.value.length) && editFld.value.length <= 1) {
                      saveBtn.disabled = true;
                      break;
                  }
              }
              default:{
                  if (editFld.value.length > 0)
                      saveBtn.disabled = false;
              }
          }
      }
        
}

