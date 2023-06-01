import server_ip_address from "../common_components/server_ip_address.js"
console.log(server_ip_address)

const loginBtn = document.querySelector("#loginBtn")
if (loginBtn) {
    loginBtn.addEventListener("click", () =>{
        fetch("http://" + server_ip_address + ":4040/features/common/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.querySelector("#loginEmail").value,
                pword: document.querySelector("#loginPword").value
            })
        }).then((response) => {
            if (response.status == 200) {
                window.location.href = "http://" + server_ip_address + ":4040/pages/home/home.ejs"
            } else {
                var statusElement = document.createElement('div')
                statusElement.setAttribute('class', 'bg-danger text-center border-bottom p-1 m-1')

                statusElement.innerHTML = response.statusText.toUpperCase() + ": wrong email or password"

                let statusBox = document.querySelector("#statusBox")
                statusBox.appendChild(statusElement)
            }
        })
    })
}

const signupBtn = document.querySelector("#signupBtn")
if (signupBtn) {
    signupBtn.addEventListener("click", () => {
        window.location.href = "http://" + server_ip_address + ":4040/pages/signup/signup.ejs"
    })
}
