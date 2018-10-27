//--FUNCTIONS in login.html--------------------------------------------

function validateuserpw() {
  console.log('Verifying user and password.')
  document.getElementById('message').innerHTML="";
  document.getElementById('msgolduserpw').innerHTML="";
  document.getElementById('msgwrong').innerHTML="";
  //Retrieve user name and save them;
  try {
    //Get username and save them
    var staff = document.getElementById('staffinitialfull2list').value.split(" ");
    var staffinitial=staff[0];
    var stafffull=staff[1];
    if (staffinitial == null || staffinitial == 'NA') {
      document.getElementById('message').innerHTML = 'Staff needs to be selected.';
      return false;
    }
    //else {
    //  localStorage.setItem('staffinitial',staffinitial);
    //  localStorage.setItem('stafffull',stafffull);
    //}
    //Get username and password
    var pw=document.getElementById('oldpw').value;
    var username=document.getElementById('oldusername').value;
    if (pw==null || pw=='' || username==null || username=='') {
      //document.getElementById('msgpw').innerHTML='Missing password.';
      document.getElementById('msgolduserpw').innerHTML='Missing password or username';
      return false;
    }
    else {
      object={staffinitial:staffinitial,pw:pw,username:username};
      //xxx ajax call to database to compare username with password.
      $.ajax({
        type:'POST',
        url:'int_chain_loginverify.php',
        data:object,
        success:function(data){
          if (data=='Correct') {
          //Go to samplestorage.html after user and pw are verified.
            document.getElementById('continueverify').style.display="none";
            document.getElementById('div_newuserpw').style.display="";
            return true;
          }
          else {
            document.getElementById('msgwrong').innerHTML='Incorect username or password';
          }
        }
      });
    }
  }
  catch (err) {
    document.getElementById('message').innerHTML = err.message;
  }
}

function resetuserpw() {
  var staff=document.getElementById('staffinitialfull2list').value.split(" ");
  var staffinitial_reset=staff[0];
  var stafffull_reset=staff[1];
  var username_reset=document.getElementById('newusername').value;
  var pw_reset=document.getElementById('newpw').value;
  var pw_repeat=document.getElementById('newpw2').value;
  if (pw_reset == pw_repeat) {
    object={staffinitial:staffinitial_reset,pw:pw_reset,username:username_reset};
    $.ajax({
      type:'POST',
      url:'int_chain_resetpw.php',
      data:object,
      success:function(data){
        document.getElementById('msgdone').innerHTML=data;
        var input=document.createElement('input');
        input.type="button";
        input.value="Return to Login";
        input.style="font-size:16px";
        input.onclick=function () {window.location='login.html'}
        document.getElementById('returntologin').appendChild(input);
      }
    });
  }
  else {
    document.getElementById('msgpwrepeat').innerHTML='Password entered differently, please re-enter password.';
  }
}
