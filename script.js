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




const displayAccountInfo = () => {
    showElement(accountInfoCard);
}


/* USERS VIEW */
const usersView = document.getElementById("usersView");
let userCardsArray;

const displayUsersInfo = () => {
    usersView.style.display = "flex";
}




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

/* USER CREATION && HANDLING */
/* function to parse comma-separated user-data into objects. Pushes user objects to userDataArray */
const parseUserData = (users) => {
    let userLines = users.split("\n");
    
    let splitUserData = [];
    for (const line of userLines) {
        splitUserData.push(line.split(","));
    }

    // Creates an object for each array of user-data
    for (const userInfo of splitUserData) {
        let userObj = createUserObject(userInfo);
        userDataArray.push(userObj);
    }
}

const createUserObject = (userArray) => {
    let currUser = {
        username: userArray[0],
        first_name: userArray[1],
        last_name: userArray[2], 
        email: userArray[3],
        role: userArray[4],
        image: userArray[5]
    };
    return currUser;
}


const getUser = (username) => {
    for (const user of userDataArray) {
        if (user.username == username) return user;
    }
    return null;
}

// returns true if username is valid
const checkLogin = (username) => {
    for (const user of userDataArray) if (user.username == username) return true;
    return false;
}

const getViewableUsers = (userObj) => {
    if (userObj.role == "user") {
        let users = [];
        for (const user of userDataArray) {
            if (user.role == "admin" || user.role == "owner") users.push(user);
        }
        users.push(userObj);
        return users;
    }
    else return userDataArray;
}

const getUserIndex = (userObj) => {
    return userDataArray.findIndex(userObj);
}

const deleterUser = (index) => {
    userDataArray.splice(index, 1);
}


/* MAIN LOGIC/SETUP */
const userDataArray = []; // main user array. Each element in the array is to hold a user object.
parseUserData(userDataString); // populate userDataArray with pre-made user-data

let currentUser; // to hold the currently logged in user

hideElement(navLogoutButton);
