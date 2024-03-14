/* FUNCTIONS */
const logout = () => {
    currentUser = "";
    profileView.innerHTML = ``;
    usersView.innerHTML = ``;
    accountInfoCard.innerHTML = ``;
    hideAllViews();
    hideElement(navLogoutButton);

    showElement(navLoginButton);
    showElement(loginView);
}

const hideAllViews = () => {
    hideElement(loginView);
    hideElement(profileView);
    hideElement(usersView);
}

// overrides default form submit behaviour. If username is correct, handles login logic
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // done to prevent the page from refreshing (the default submit action)
    let userInput = unameTextInput.value;

    let isValid = checkValidUser(userInput); // checks user input against valid usernames, returning true if found.
    if (isValid) setupProfile(getUser(unameTextInput.value));
    else console.log("Invalid user");
});

navLogoutButton.addEventListener('click', logout);

const setupProfile = (userObj) => {
    hideElement(loginView);
    hideElement(navLoginButton);
    currentUser = userObj;

    // make main user profile card.
    let profile;
    if (currentUser.role == "user") profile = buildProfile(userObj);
    else profile = buildAdminProfile(currentUser);

    profileView.innerHTML = profile;

    // create the users view
    usersView.innerHTML = buildUsersView();
    usersView.style.display = "none";

    // adding event listeners for card links
    document.getElementById("accountInfoLink").addEventListener('click', displayAccountInfo);
    document.getElementById("viewUsersLink").addEventListener('click', displayUsersInfo);
    document.getElementById("logoutLink").addEventListener('click', logout);
    
    accountInfoCard = document.getElementById("accountInfo");
    hideElement(accountInfoCard);

    showElement(profileView);
    showElement(navLogoutButton);
}

const buildUsersView = () => {
    const viewableUsers = getViewableUsers(currentUser);
    let view = ``;

    for (const user of viewableUsers) view += buildUserCard(user);
    return view;
}




/* MAIN LOGIC/SETUP */
const userDataArray = []; // main user array. Each element in the array is to hold a user object.
parseUserData(userDataString); // populate userDataArray with pre-made user-data

let currentUser; // to hold the currently logged in user

hideElement(navLogoutButton);
