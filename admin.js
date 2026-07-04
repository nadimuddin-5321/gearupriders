const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    if(
        username === "aman" &&
        password === "amansonar5321"
    ){
        window.location.href = "dashboard.html";
    }
    else{
        alert("Wrong Username or Password");
    }

});

