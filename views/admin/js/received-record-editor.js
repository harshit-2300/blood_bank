function update_btn(){
  var inputs = document.getElementsByClassName("editable");
  for(let i =0;i<inputs.length;i++){
    inputs[i].disabled = true;
  }
  //update database here
  toggle(false);
}
function delete_btn(){
  var inputs = document.getElementsByClassName("editable");
  for(let i =0;i<inputs.length;i++){
    inputs[i].disabled = true;
  }
  toggle(false);
  if(confirm("Are you sure you want to DELETE this record?")) {
    //confirm and then delete from database
    //then close this tab
    window.close();
  }
  else{
    cancel_btn();
  }
}

function delete_bloodbag(){

  if(confirm("Are you sure you want to DELETE this record?")) {
    //confirm and then delete from database//delete from received-record and refresh page

    location.reload();
  }
}

function add_newbloodbag_toggle_btn(){
  assign(document.getElementById("btn-edit"), "none");
  assign(document.getElementById("btn-submit"), "none");
  assign(document.getElementById("bloodbag-btn-add"), "block");
  assign(document.getElementById("bloodbag-btn-cancel"), "block");
  assign(document.getElementById("new_bloodbag"), "table-row");
  let inputs = document.getElementById("new_bloodbag").getElementsByClassName("editable");
  for(let i=0;i<inputs.length;i++){
    inputs[i].disabled = false;
  }
}

function add_newbloodbag(){
  let inputs = document.getElementById("new_bloodbag").getElementsByClassName("editable");
  for(let i=0;i<inputs.length;i++){
    inputs[i].disabled = true;
  }
  //insert new-received-bloodbag in database

  //reload page to view updated received-record and refresh toggles
  location.reload();
}

function cancel_newbloodbag(){
  assign(document.getElementById("btn-edit"), "block");
  assign(document.getElementById("btn-submit"), "block");
  assign(document.getElementById("bloodbag-btn-add"), "none");
  assign(document.getElementById("bloodbag-btn-cancel"), "none");
  assign(document.getElementById("new_bloodbag"), "none");
  let inputs = document.getElementById("new_bloodbag").getElementsByClassName("editable");
  for(let i=0;i<inputs.length;i++){
    inputs[i].disabled = true;
  }
}
