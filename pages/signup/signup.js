const signupSubmitBtn = document.querySelector("#signupSubmitBtn")
if (signupSubmitBtn)
{
    signupSubmitBtn.addEventListener("click", () => {

        var expertiseStr = JSON.parse(sessionStorage.getItem("areaOfExpertise")).join('!').toString()

        fetch("http://localhost:4040/features/common/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: document.querySelector("#signupUserName").value,
                email: document.querySelector("#signupUserEmail").value,
                pword: document.querySelector("#signupUserPword").value,
                expertise: '"' + expertiseStr + '"',
                domain: document.querySelector("#signupDomain").value
            })
        }).then(response => {

            if (response.status == 200) {

                window.location.href = "http://localhost:4040/pages/home/home.ejs"
            }
        })
    })
}

const selectExpertiseBtn = document.querySelector("#selectExpertiseBtn")
if (selectExpertiseBtn)
{
    selectExpertiseBtn.addEventListener("click", () => {
        if (sessionStorage.getItem('areaOfExpertise') == null)
            {
                sessionStorage.setItem("areaOfExpertise", JSON.stringify([]))
            }
    })
}

function addExpertise(expertise)
{
    var areaOfExpertise = JSON.parse(sessionStorage.getItem("areaOfExpertise"))
    areaOfExpertise.push(expertise)
    sessionStorage.setItem("areaOfExpertise", JSON.stringify(areaOfExpertise))
}







