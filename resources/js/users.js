function editUser(){
  var selectedID = document.getElementById("userID");
  var selectedSchool = document.getElementById("userSchool");
  $("#deactivateBtn").prop('disabled', true);
  $("#saveBtn").prop('disabled', true);
  $("#resetBtn").prop('disabled', true);
  $("#result").html("");
  alert($("#userInfo").data('url'));
  alert(selectedID.selectedIndex + " "  +selectedID.options[selectedID.selectedIndex].value);

  if(selectedID.selectedIndex != 0 && selectedSchool.selectedIndex != 0){
    $.post($("#userInfo").data('url') + $("#userInfo").data('user') + "/" + $("#userInfo").data('edit') ,
      {
        schoolId: selectedID.options[selectedID.selectedIndex].value,
        school: selectedSchool.options[selectedSchool.selectedIndex].value,
      },
      function(data){

        console.log(data);
        if(data != null){
          $("#schoolId").val(data["schoolId"]);
          $("#userType").val(data["userType"]);
          $("#firstName").val(data["firstName"]);
          $("#middleName").val(data["middleName"]);
          $("#lastName").val(data["lastName"]);
          $("#email").val(data["email"]);
          $("#deactivateBtn").prop('disabled', false);
          $("#saveBtn").prop('disabled', false);
          $("#resetBtn").prop('disabled', false);
        }
        else{
          $("#schoolId").val("");
          $("#userType").val("");
          $("#firstName").val("");
          $("#middleName").val("");
          $("#lastName").val("");
          $("#email").val("");

          var res = "User does not exist";
          $("#result").html(res.fontcolor("red"));
        }
      }, "json");
  }
  else{
      var res = "";

      if(selectedID.selectedIndex == 0) res = "Choose an ID";
      if(selectedSchool.selectedIndex == 0) res = "Choose a School";

      $("#schoolId").val("");
      $("#firstName").val("");
      $("#middleName").val("");
      $("#lastName").val("");
      $("#email").val("");
      $('#userID').prop('selectedIndex',0);
      $('#userSchool').prop('selectedIndex',0);
      $("#result").html(res.fontcolor("red"));
  }
}

function deactivateUser(){
  var selectedID = document.getElementById("userID");
  var selectedSchool = document.getElementById("userSchool");

  alert(selectedID.selectedIndex != 0 && selectedSchool.selectedIndex != 0);

  if(selectedID.selectedIndex != 0 && selectedSchool.selectedIndex != 0){
    $.post($("#userInfo").data('url') + $("#userInfo").data('user') + "/deactivateUser",
      {
        id: selectedID.options[selectedID.selectedIndex].value,
        school: selectedSchool.options[selectedSchool.selectedIndex].value,
        userType: $("#userInfo").data('page'),
      },
      function(data){

        console.log(data);
        var res = "";
        if(data == null){
          res = "Teacher (ID #: " + selectedID.options[selectedID.selectedIndex].value + ") was not deactivated";
          $("#result").html(res.fontcolor("red"));
        }
        else{
          res = "Teacher (ID #: " + selectedID.options[selectedID.selectedIndex].value + ") has been successfully deactivated";

          var $el = $("#userID");
          $el.empty(); // remove old options
          $el.append($("<option></option>").attr("value", "").text(" - - Select Teacher ID - - "));

          $("#schoolId").val("");
          $("#userType").val("");
          $("#firstName").val("");
          $("#middleName").val("");
          $("#lastName").val("");
          $("#email").val("");
          $('#userID').prop('selectedIndex',0);
          $('#userSchool').prop('selectedIndex',0);
          $("#result").html(res.fontcolor("green"));
          $("#deactivateBtn").prop('disabled', true);
          $("#saveBtn").prop('disabled', true);
          $("#resetBtn").prop('disabled', true);
        }

      }, "json");
  }
}

function resetPassword(){
  var selectedID = document.getElementById("userID");
  var selectedSchool = document.getElementById("userSchool");

  alert($("#userInfo").data('url') + $("#userInfo").data('user') + "/resetPassword");

  if(selectedID.selectedIndex != 0 && selectedSchool.selectedIndex != 0){
    $.post($("#userInfo").data('url') + $("#userInfo").data('user') + "/resetPassword",
      {
        id: selectedID.options[selectedID.selectedIndex].value,
        school: selectedSchool.options[selectedSchool.selectedIndex].value,
        userType: $("#userInfo").data('page'),
      },
      function(data){

        console.log(data);
        var res = "";
        if(data == null){
          res = "Teacher (ID #: " + selectedID.options[selectedID.selectedIndex].value + ") reset password failed";
          $("#result").html(res.fontcolor("red"));
        }
        else{
          res = "Teacher (ID #: " + selectedID.options[selectedID.selectedIndex].value + ") reset password successfully";
          $("#schoolId").val("");
          $("#firstName").val("");
          $("#userType").val("");
          $("#middleName").val("");
          $("#lastName").val("");
          $("#email").val("");
          $('#userID').prop('selectedIndex',0);
          $('#userSchool').prop('selectedIndex',0);
          $("#result").html(res.fontcolor("green"));
          $("#deactivateBtn").prop('disabled', true);
          $("#saveBtn").prop('disabled', true);
          $("#resetBtn").prop('disabled', true);
        }

      }, "json");
  }
}
