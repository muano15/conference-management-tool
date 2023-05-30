const serverIP = "10.0.11.198"

const createConfBtn = document.querySelector("#create_conference_btn")
if (createConfBtn)
{
    createConfBtn.addEventListener("click", () => {

        let confName = document.querySelector("#newConferenceName").value
        let confOrganisers = JSON.parse(sessionStorage.getItem('organisers'))
        let confAreachairs = JSON.parse(sessionStorage.getItem('areachairs'))
        let confReviewers = JSON.parse(sessionStorage.getItem('reviewers'))
        let modes = document.getElementsByName('newConferenceType')
        let confMode
        modes.forEach(radio => {
            if (radio.checked)
            {
                if (radio.value.toString() == "single-blind")
                {
                    confMode = "0"
                }
                else
                {
                    confMode = "1"
                }
            }
        })
        fetch("http://" + serverIP + ":4040/features/admin/create_conference", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: confName,
                organisers: JSON.stringify(confOrganisers),
                areachairs: JSON.stringify(confAreachairs),
                reviewers: JSON.stringify(confReviewers),
                mode: confMode
            })
        }).then((response) => {
            if (response.status == 200) {
                console.log("Conference created successfully")
                return
            }
        })
    })
}
const addMembersBtn = document.querySelector("#add_members_btn")
const addMembersModal = document.querySelector("#add_members_modal")
if (addMembersBtn)
{
    addMembersBtn.addEventListener("click", () => {
        fetch("http://" + serverIP + ":4040/features/common/get_all_users", {
            method: "GET",
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            }
        }).then((jsonResponse) => {
            if (sessionStorage.getItem('all_users') == null) {
                var allUsers = jsonResponse
                sessionStorage.setItem("all_users", JSON.stringify(allUsers))
            }
            if (sessionStorage.getItem('organisers') == null) {
                sessionStorage.setItem("organisers", JSON.stringify([]))
                sessionStorage.setItem("areachairs", JSON.stringify([]))
                sessionStorage.setItem("reviewers", JSON.stringify([]))
            }
            fillAddMembersModalBody(jsonResponse)
        })
    })
}
const memberSearchBar = document.querySelector("#memberSearchBar")
if (memberSearchBar)
{
    memberSearchBar.addEventListener("input", e => {
        const value = e.target.value.toLowerCase()
        var allUsers = JSON.parse(sessionStorage.getItem('all_users'))
        var filteredUsers = allUsers.filter((user) => {
            return user.USER_NAME.toLowerCase().includes(value) || user.USER_EMAIL.toLowerCase().includes(value)
        })
        fillAddMembersModalBody(filteredUsers)
    })
}
function fillAddMembersModalBody(jsonResponse)
{
    if (addMembersModal) {
        var addMembersModalBody = document.getElementById('add_members_modal_body')
        addMembersModalBody.innerHTML = ''

        for (let i = 0; i < JSON.parse(sessionStorage.getItem("all_users")).length; i++) {

            var userElement = document.createElement('div')
            userElement.setAttribute('class', 'bg-info container d-flex border-bottom py-3 my-4');

            userElement.innerHTML = `
                        <div class="col">
                            ${jsonResponse[i].USER_NAME}
                        </div>
                        <div class="col">
                            ${jsonResponse[i].USER_EMAIL}
                        </div>
                        <div id="thisUserId" class="col">
                            ${jsonResponse[i].USER_ID}
                        </div>
                        <div>
                            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                <div class="btn-group" role="group">
                                    <i type="button" class="bi bi-plus-circle-fill h2" id="addMemberOptBtn" data-bs-toggle="dropdown" aria-expanded="false" ></i>
                                    <ul class="dropdown-menu">
                                        <li><button class="btn" onclick="addToOrganisers(${jsonResponse[i].USER_ID})">Add to organisers</button></li>
                                        <li><button class="btn" onclick="addToAreachairs(${jsonResponse[i].USER_ID})">Add to areachairs</button></li>
                                        <li><button class="btn" onclick="addToReviewers(${jsonResponse[i].USER_ID})">Add to reviewers</button></li>
                                        <li><button class="btn" onclick="removeMember(${jsonResponse[i].USER_ID})">Remove member</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `

            addMembersModalBody.appendChild(userElement)
        }
    }
}
function updateCount()
{
    document.querySelector("#numOfOrganisers").innerHTML = JSON.parse(sessionStorage.getItem("organisers")).length
    document.querySelector("#numOfAreachair").innerHTML = JSON.parse(sessionStorage.getItem("areachairs")).length
    document.querySelector("#numOfReviewers").innerHTML = JSON.parse(sessionStorage.getItem("reviewers")).length
}
function addToOrganisers(userId)
{
    var organisersArr = JSON.parse(sessionStorage.getItem("organisers"))
    organisersArr.push(userId)
    sessionStorage.setItem("organisers", JSON.stringify(organisersArr))
}
function addToAreachairs(userId)
{
    var areachairsArr = JSON.parse(sessionStorage.getItem("areachairs"))
    areachairsArr.push(userId)
    sessionStorage.setItem("areachairs", JSON.stringify(areachairsArr))
}
function addToReviewers(userId)
{
    var reviewersArr = JSON.parse(sessionStorage.getItem("reviewers"))
    reviewersArr.push(userId)
    sessionStorage.setItem("reviewers", JSON.stringify(reviewersArr))
}
function removeMember(userId)
{
    var ssKeys = Object.keys(sessionStorage)
    console.log(ssKeys)
    for (var k = 0; k < ssKeys.length; k++) {
        var myGroup = JSON.parse(sessionStorage.getItem(ssKeys[k]))
        if (myGroup != null)
        {
            console.log(myGroup)
            for (var i = 0; i <= myGroup.length; i++) {
                if (myGroup[i] == userId)
                {
                    myGroup.splice(i, 1)
                    sessionStorage.setItem(ssKeys[k], JSON.stringify(myGroup))
                }
            }
        }
    }
}
function closeNewConference()
{
    if (!(sessionStorage.getItem('organisers') === null))
    {
        document.querySelector("#numOfOrganisers").innerHTML = 0
        document.querySelector("#numOfAreachair").innerHTML = 0
        document.querySelector("#numOfReviewers").innerHTML = 0

        sessionStorage.removeItem("organisers")
        sessionStorage.removeItem("areachairs")
        sessionStorage.removeItem("reviewers")
        sessionStorage.removeItem("all_users")
    }

    if (addMembersModal) {
        var addMembersModalBody = document.getElementById('add_members_modal_body')

        addMembersModalBody.innerHTML = ''
    }
}