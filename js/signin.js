const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
// u1,e1,p1,p2

var form = document.getElementById('sakhalogin');

form.onsubmit = function(event){
        var xhr = new XMLHttpRequest();
        var formData = new FormData(form);
        //open the request
        xhr.open('POST','https://ai.sakha.chat/sakha/v2/user/signin?')
        xhr.setRequestHeader("Content-Type", "application/json");

        //send the form data
        // xhr.send(JSON.stringify(Object.fromEntries(formData)));
        var data={
          "email":document.getElementById("sakhaemail").value,
          "password":document.getElementById("sakhapass").value
      }
      
      xhr.send(JSON.stringify(data))
      

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
                
                form.reset(); //reset form after AJAX success or do something else
                var data=xhr.responseText;
                var jsonResponse = JSON.parse(data);
                document.cookie =  "authToken=" + jsonResponse["authToken"];
                document.cookie =  "userId=" + jsonResponse["userId"];
                window.location = "/dashboard.html";

              }

        }
        //Fail the onsubmit to avoid page refresh.
        return false; 
    }

    var form = document.getElementById('sakhasignup');

    form.onsubmit = function(event){
            var xhr = new XMLHttpRequest();
            var formData = new FormData(form);
            //open the request
            xhr.open('POST','https://ai.sakha.chat/sakha/v2/user/signup')
            xhr.setRequestHeader("Content-Type", "application/json");
    
            //send the form data
            // xhr.send(JSON.stringify(Object.fromEntries(formData)));
            var data={
              "username":document.getElementById("u1").value,
              "password":document.getElementById("p1").value,
              "email":document.getElementById("e1").value,
              "phoneNumber":document.getElementById("p2").value
          }
          
          xhr.send(JSON.stringify(data))
            
    
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    alert("User Id Created, Please Signin to Access");
                }
            }
            //Fail the onsubmit to avoid page refresh.
            return false; 
        }






