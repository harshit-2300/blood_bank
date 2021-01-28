//utility functions and restore default input values
function assign(ele, data){ //assign if element is not null
  if(ele){
    ele.style.display = data;
  }
}

let max_bloodbank = 0; //number of total records shown
var input_values = []; //used to restore values on cancel 2D

//initialize by hiding buttons and creating 2D array
function hide_all_btn(val){
  for(let i=0;i<val;i++){
    toggle(false, i);
  }
}


function toggle(on, blid){
  assign(document.getElementsByClassName("btn-edit")[blid], on ? "none":"block");
  assign(document.getElementsByClassName("btn-submit")[blid], on ? "none":"block");
  assign(document.getElementsByClassName("btn-update")[blid], on ? "block":"none");
  assign(document.getElementsByClassName("btn-cancel")[blid],  on ? "block":"none");
  assign(document.getElementsByClassName("btn-delete")[blid], on ? "block":"none");
}

function edit_btn(blid) {
    var inputs = document.getElementsByClassName("editable"+blid);
    input_values[blid] = []; //empty
    for(let i=0;i<inputs.length;i++){
      if(inputs[i].type=='radio'){
        input_values[blid].push(inputs[i].checked);
      }
      else{
        input_values[blid].push(inputs[i].value);
      }
      inputs[i].disabled = false;
    }
    toggle(true, blid);
}

function cancel_btn(blid){
  var inputs = document.getElementsByClassName("editable"+blid);
  for(let i =0;i<inputs.length;i++){
    if(inputs[i].type=='radio'){
      inputs[i].checked=input_values[blid][i];
    }
    else{
      inputs[i].value = input_values[blid][i];
    }
    inputs[i].disabled = true;
  }
  toggle(false, blid);
}

function update_btn(blid){
  var inputs = document.getElementsByClassName("editable"+blid);
  for(let i =0;i<inputs.length;i++){
    inputs[i].disabled = true;
  }
  //update database here
  toggle(false, blid);
}

function delete_btn(blid){
  var inputs = document.getElementsByClassName("editable"+blid);
  for(let i =0;i<inputs.length;i++){
    inputs[i].disabled = true;
  }
  toggle(false, blid);
  if(confirm("Are you sure you want to DELETE this record?")) {
    //confirm and then delete from database
    //then refresh this tab
    location.reload();
  }
  else{
    cancel_btn(blid);
  }
}
