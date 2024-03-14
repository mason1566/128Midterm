/* DOM MANIPULATION */
const hideElement = (element) => element.style.display = "none";
const showElement = (element) => element.style.display = "block";

/* HEADER */
const navLoginButton = document.getElementById("navLoginButton");
const navLogoutButton = document.getElementById("navLogoutButton");


/* LOGIN VIEW */
const loginView = document.getElementById("loginView");
const loginForm = document.getElementById("loginForm");
const unameTextInput = document.getElementById("usernameInput");

/* PROFILE VIEW */
const profileView = document.getElementById("profileView");
let accountInfoCard;

const setupProfile = (userObj) => {
    currentUser = userObj;

    let profile;
    if (currentUser.role == "user") profile = buildProfile(userObj);
    else profile = buildAdminProfile(currentUser);

    profileView.innerHTML = profile;

    // adding event listeners for card links
    document.getElementById("accountInfoLink").addEventListener('click', displayAccountInfo);
    document.getElementById("viewUsersLink").addEventListener('click', logout);
    document.getElementById("logoutLink").addEventListener('click', logout);
    
    accountInfoCard = document.getElementById("accountInfo");
    hideElement(accountInfoCard);
}

const buildProfile = (userObj) => {
    let profileCard = `<div class="card card-style col-10 col-md-6 mx-auto" style="height: 470px;">
                            <!-- profile body -->
                            <div class="card-body p-0 pt-5 d-flex justify-content-start align-items-center flex-column">
                                <div class="mx-auto"><img src="${userObj.image}.jpeg" class="profile-image" alt=""></div>
                                <p class="card-title fw-bold fs-2 mt-3">Welcome, ${userObj.first_name}!</p>

                                <div class="d-flex justify-content-between w-100 mt-3">
                                    <div class="flex-grow-1 flex-fill text-center d-flex flex-column">
                                        <p class="fs-5">How are you today?</p>
                                        <div class="d-flex justify-content-center gap-4 mt-4 mb-3">
                                            <button class="btn button-outline btn-danger fw-bold px-2 py-1">NOT GOOD</button>
                                            <button class="btn button-outline btn-success fw-bold px-2 py-1">GOOD</button>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 flex-fill">
                                        <p class="fs-5 ps-5">Navigation:</p>
                                        <ul class="ps-5 ms-5 list-unstyled">
                                            <li><a href="#" id="accountInfoLink">Account Info</a></li>
                                            <li><a href="#" id="viewUsersLink">View Users</a></li>
                                            <li><a href="#" id="logoutLink">Logout</a></li>
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

const buildAdminProfile = (userObj) => {
    let profileCard = `<div class="card card-style col-10 col-md-6 mx-auto" style="height: 470px;">
                            <!-- profile body -->
                            <div class="card-body p-0 pt-5 d-flex justify-content-start align-items-center flex-column">
                                <div class="mx-auto"><img src="${userObj.image}.jpeg" class="profile-image" alt=""></div>
                                <p class="card-title fw-bold fs-2 mt-3">Welcome, ${userObj.first_name}!</p>

                                <div class="d-flex justify-content-between w-100 mt-3">
                                    <div class="flex-grow-1 flex-fill text-center d-flex flex-column">
                                        <p class="fs-5">How are you today?</p>
                                        <div class="d-flex justify-content-center gap-4 mt-4 mb-3">
                                            <button class="btn button-outline btn-danger fw-bold px-2 py-1">NOT GOOD</button>
                                            <button class="btn button-outline btn-success fw-bold px-2 py-1">GOOD</button>
                                        </div>
                                    </div>
                                    <div class="flex-grow-1 flex-fill">
                                        <p class="fs-5 ps-5">Navigation:</p>
                                        <ul class="ps-5 ms-5 list-unstyled">
                                            <li><a href="#" id="accountInfoLink">Account Info</a></li>
                                            <li><a href="#" id="viewUsersLink">View Users</a></li>
                                            <li><a href="#" id="logoutLink">Logout</a></li>
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

const displayAccountInfo = (userObj) => {
    showElement(accountInfoCard);
}


/* USERS VIEW */
const usersView = document.getElementById("usersView");






