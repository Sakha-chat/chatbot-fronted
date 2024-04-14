// nav start
let navToggle = document.querySelector(".nav__toggle");
let navWrapper = document.querySelector(".nav__wrapper");

navToggle.addEventListener("click", function () {
  if (navWrapper.classList.contains("active")) {
    this.setAttribute("aria-expanded", "false");
    this.setAttribute("aria-label", "menu");
    navWrapper.classList.remove("active");
  } else {
    navWrapper.classList.add("active");
    this.setAttribute("aria-label", "close menu");
    this.setAttribute("aria-expanded", "true");
  }
});
// nav end



// Sound Part Start
var p=0;
var tom1 = new Audio("musics/LordKrishna.mp3");
document.getElementById("img-volume").onclick = function() {
    if(p==0){
        p=1; 
        myFunction();
    }
    else{
        p=0;
        stopaudio();
    }
};

function myFunction() { 
    tom1.play();
    document.getElementById("img-volume").src="./images/volume.png";
}
function stopaudio() {
    tom1.pause();
    document.getElementById("img-volume").src="./images/mute.png";
} 
// Sound Part Ends


// Typing Part
document.getElementById("askKrishna").onclick = function() {
    console.log("hi");
    let text = document.getElementById("lower-button").value;
    document.getElementById("text-area").innerHTML = text;

};

// Multiple Time Chat JS-Part

let lastSakhaResponse = "";

class Chatbox {
    constructor() {
        this.args = {
            chatBox: document.querySelector('.wrapper'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))
        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })

    }


    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
    //  let ms2={name:'Sakha',message:"hare krishna"}
       this.messages.push(msg1);
    // this.messages.push(ms2);

   function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
        
        console.log(text1);
        fetch('https://ai.sakha.chat/sakha/v2/chat/message', {
            method: 'POST',
            body: JSON.stringify({
                "authToken": getCookie("authToken"),
                "userId": getCookie("userId"),
                "message" : text1
            }
            ),
            
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(data => {
            let msg2 = { name: "Sakha", message: data.sakhaResponse };
            console.log(data);
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
          
    }

    updateChatText(chatbox) {
        var html = '';
        let isSakhaLast = false; // Flag to check if the last message is from Sakha
    
        this.messages.slice().forEach(function(item, index) {
            if (item.name === "Sakha") {
                lastSakhaResponse=item.message;
                html += '<div class="messages__item messages__item--visitor">' + 
                        '<div class="icon icon-left"> <img class="user" src="./images/krishna1.png" alt="">   </div>' +
                        '<p style="font-size: 20px; width:100%;">' + item.message + '</p></div>';
                isSakhaLast = true; // Sakha is the current, thus the last (for now)
            } else {
                html += '<div class="messages__item messages__item--operator">' +
                        '<p style="font-size: 20px;width:100%;">' + item.message + '</p>' +
                        '<div class="icon icon-right"> <img class="user" src="./images/man1.png" alt="">   </div></div>';
                isSakhaLast = false; // Not Sakha, so set the flag to false
            }
        });
    
        // If the last message is from Sakha, append the options
        if (isSakhaLast) {
            html += '<div class="response-options">' +
                    '<i class="fas fa-thumbs-up"></i>' +  
                    '<i class="fas fa-thumbs-down"></i>' +
                    '<i class="fas fa-copy"></i>' +
                    '<i class="fas fa-comment-dots"></i>' +
                    '</div>';
        }
        
    
        const chatMessage = chatbox.querySelector('.msg');
        chatMessage.innerHTML = html;

    }
    
}
const chatbox = new Chatbox();
chatbox.display();

// End of multiple Time


window.onload = function() {
	displayName();
}

function displayName() {
	fetch('/getCurrentUser')
		.then(r => r.json())
		.then(r => {

			document.getElementById('username').innerHTML = r.username;

		}).catch((error) => {
			console.error('Error:', error);
			/* this.updateChatText(chatbox)
			 textField.value = ''*/
		});
	/*	document.getElementById('username').innerHTML="Arpita Mittal";*/
}


// This is the part of the response animation

// like,dislike animation
document.addEventListener('click', function(e) {
    const isLike = e.target.classList.contains('fa-thumbs-up');
    const isDislike = e.target.classList.contains('fa-thumbs-down');
    
    // Check if the clicked element is either like or dislike icon
    if (isLike || isDislike) {
        // Get the opposite icon class based on the clicked icon
        const oppositeClass = isLike ? 'fa-thumbs-down' : 'fa-thumbs-up';
        const oppositeIcon = document.querySelector(`.${oppositeClass}`);

        // Remove the opposite action class and animation
        oppositeIcon.classList.remove('liked', 'disliked');
        oppositeIcon.classList.remove('icon-animation-clicked');

        // Add animation class
        e.target.classList.add('icon-animation-clicked');

        // Ensure animation resets for subsequent clicks
        setTimeout(() => {
            e.target.classList.remove('icon-animation-clicked');
        }, 500);

        // Toggle like or dislike class for color change
        e.target.classList.toggle('liked', isLike);
        e.target.classList.toggle('disliked', isDislike);
    }
});

// Open the feedback modal when the feedback icon is clicked
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('fa-comment-dots')) {
        // Assuming 'sakhaResponse' holds the last Sakha response; adjust as needed
        var sakhaResponse = "The last message from Sakha here"; // You need to dynamically set this based on your application logic
       if(lastSakhaResponse!="") sakhaResponse=lastSakhaResponse;
        // Set the Sakha's response in the feedback modal
        document.getElementById('sakhaResponseText').value = sakhaResponse;
        
        // Open the feedback modal
        $('#feedbackModal').modal('show');
    }
});


document.getElementById('submitFeedback').addEventListener('click', function() {
    var sakhaResponse = document.getElementById('sakhaResponseText').value;
    var userFeedback = document.getElementById('userFeedbackText').value;
    
    var emailSubject = 'Feedback from Sakha App';
    var emailBody = `Sakha Response: ${sakhaResponse}%0D%0AUser Feedback: ${userFeedback}`;
    var emailAddress = 'sakhachat9@gmail.com';

    // Construct the mailto URI
    var mailtoUri = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

    // Open the default email client with the mailto URI
    window.open(mailtoUri);
});


// Function to get userId from cookie
function getUserIdFromCookie() {
    var userId = null;
    // Split the cookie string into an array of individual cookies
    var cookies = document.cookie.split(';');
    // Iterate over each cookie to find the one containing the user ID
    cookies.forEach(function(cookie) {
        // Trim any whitespace from the cookie
        var trimmedCookie = cookie.trim();
        // Check if the cookie starts with "userId="
        if (trimmedCookie.startsWith("userId=")) {
            // Extract the user ID from the cookie
            userId = trimmedCookie.substring("userId=".length);
            // Break out of the loop since we found the user ID
            return;
        }
    });
    // Return the extracted user ID (or null if not found)
    return userId;
}

// Construct the logout URL using the user ID
function constructLogoutUrl(userId) {
    return "https://ai.sakha.chat/sakha/v2/user/" + userId;
}

// Get the logout button element
var logoutButton = document.getElementById("logout");

// Add event listener to the logout button
logoutButton.addEventListener("click", function(event) {
    // Prevent the default behavior of the link
    event.preventDefault();

    // Retrieve the user ID from the cookie
    var userId = getUserIdFromCookie();
    if (userId) {
        // Construct the logout URL using the user ID
        var logoutUrl = constructLogoutUrl(userId);
        // Redirect to the logout URL
        window.location.href = logoutUrl;
    }
});



document.addEventListener('click', function(e) {
    if (e.target.classList.contains('fa-copy')) {
        // Logic to copy the message text
        // This assumes you have a way to access the specific message text you want to copy
        let messageToCopy = "This is the message text to copy"; // You need to dynamically set this
        if(lastSakhaResponse!="") messageToCopy=lastSakhaResponse;
        navigator.clipboard.writeText(messageToCopy).then(() => {
            // Show confirmation message
            const confirmation = document.getElementById('copyConfirmation');
            confirmation.style.display = 'block';
            confirmation.classList.add('fade-in');

            // After a few seconds, hide the message with fade-out animation
            setTimeout(() => {
                confirmation.classList.replace('fade-in', 'fade-out');
                // Optionally, hide the element completely after fade-out animation
                setTimeout(() => {
                    confirmation.style.display = 'none';
                }, 1000); // Match this timeout with the fade-out animation duration
            }, 2000); // Adjust this duration for how long you want the message to stay visible
        });
    }
});

