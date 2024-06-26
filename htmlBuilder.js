const buildProfile = (userObj) => {
    let profileCard = `<div class="card card-style col-10 col-md-8 col-lg-6 mx-4" style="height: 470px;">
                            <!-- profile body -->
                            <div class="card-body p-0 pt-5 d-flex justify-content-start align-items-center flex-column">
                                <div class="mx-auto"><img src="${userObj.image}.jpeg" class="profile-image" alt=""></div>
                                <p class="card-title fw-bold fs-2 mt-3">Welcome, ${userObj.first_name}!</p>

                                <div class="d-flex justify-content-between w-100 mt-3">
                                    <div class="flex-grow-1 flex-fill text-center flex-column d-none d-sm-flex" id="greetingBox">
                                        <p class="fs-5">How are you today?</p>
                                        <div class="d-flex justify-content-center gap-4 mt-4 mb-3">
                                            <button class="btn button-outline btn-danger fw-bold px-2 py-1" id="notGoodButton">NOT GOOD</button>
                                            <button class="btn button-outline btn-success fw-bold px-2 py-1" id="goodButton">GOOD</button>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 flex-fill">
                                        <p class="fs-5 ps-5">Navigation:</p>
                                        <ul class="ps-5 ms-5 list-unstyled">
                                            <li><a href="#" id="accountInfoButton">Account Info</a></li>
                                            <li><a href="#" id="viewUsersButton">View Users</a></li>
                                            <li><a href="#" id="logoutButton">Logout</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card card-style col-10 col-md-5 col-lg-3" style="height: 310px;" id="accountInfo">
                            <!-- account info -->
                            <div class="card-body p-0 pt-4 d-flex justify-content-start align-items-center flex-column">
                                <p class="card-title fw-bold fs-2 mt-3">Account Info:</p>
                                <div class="d-flex align-items-start flex-column fs-6 mt-2">
                                    <p class="mb-0"><span class="fw-bold">Username:</span> <span class="ms-3">${userObj.username}</span></p>
                                    <p class="mt-2 mb-0"><span class="fw-bold">First Name:</span> <span class="ms-3">${userObj.first_name}</span></p>
                                    <p class="mt-2 mb-0"><span class="fw-bold">Last Name:</span> <span class="ms-3">${userObj.last_name}</span></p>
                                    <p class="mt-2 mb-0"><span class="fw-bold">Email:</span> <span class="ms-3">${userObj.email}</span></p>
                                    <p class="mt-2 mb-0"><span class="fw-bold">Role:</span> <span class="ms-3">${userObj.role}</span></p>
                                </div>
                            </div>
                        </div>`;
    return profileCard;
}


const buildUserCard = (userObj) => {
    let card = `<div class="card card-style col-10 col-md-5 col-lg-3 flex-wrap" style="height: 330px;" class="user-card">
                    <!-- account info -->
                    <div class="card-body p-0 ps-1 pt-4 d-flex justify-content-start align-items-center flex-column">
                        <div class="mx-auto"><img src="${userObj.image}.jpeg" class="usersView-image" alt=""></div>
                        <div class="d-flex align-items-start flex-column fs-6 mt-3">
                            <p class="mb-0"><span class="fw-bold">Username:</span> <span class="ms-3">${userObj.username}</span></p>
                            <p class="mt-2 mb-0"><span class="fw-bold">First Name:</span> <span class="ms-3">${userObj.first_name}</span></p>
                            <p class="mt-2 mb-0"><span class="fw-bold">Last Name:</span> <span class="ms-3">${userObj.last_name}</span></p>
                            <p class="mt-2 mb-0"><span class="fw-bold">Email:</span> <span class="ms-3">${userObj.email}</span></p>
                            <p class="mt-2 mb-0"><span class="fw-bold">Role:</span> <span class="ms-3">${userObj.role}</span></p>
                        </div>
                    </div>
                </div>`
    return card
};

// each element has a delete button with a unique id in form: "{username}Delete"
const buildDeletableCard = (userObj) => {
    let card = `<div class="card card-style col-10 col-md-5 col-lg-3 flex-wrap" style="height: 330px;" class="user-card" id="${userObj.username}Card">
                    <!-- account info -->
                    <div class="card-body p-0 ps-1 pt-4 d-flex justify-content-start align-items-center flex-column">
                        <div class="mx-auto"><img src="${userObj.image}.jpeg" class="usersView-image" alt=""></div>
                        <div class="d-flex align-items-start flex-column fs-6 mt-3">
                            <p class="mb-0"><span class="fw-bold">Username:</span> <span class="ms-3">${userObj.username}</span></p>
                            <p class="mt-2 mb-0"><span class="fw-bold">First Name:</span> <span class="ms-3">${userObj.first_name}</span></p>
                            <p class="mt-2 mb-0"><span class="fw-bold">Last Name:</span> <span class="ms-3">${userObj.last_name}</span></p>
                            <p class="mt-2 mb-0"><span class="fw-bold">Email:</span> <span class="ms-3">${userObj.email}</span></p>
                            <p class="mt-2 mb-0"><span class="fw-bold">Role:</span> <span class="ms-3">${userObj.role}</span></p>
                        </div>
                        <button type="button" class="btn btn-danger mt-auto mb-3 align-self-end me-3 p-1" id="${userObj.username}Delete">DELETE</button>
                    </div>
                </div>`
    return card
}
