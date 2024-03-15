const userDataArray = []; // main user array. Each element in the array is to hold a user object.
const userCardsArray = [];

/* DOM MANIPULATION */
const hideElement = (element) => element.style.display = "none";
const showElement = (element) => element.style.display = "block";

// Document references
const navLoginButton = document.getElementById("navLoginButton");
const navLogoutButton = document.getElementById("navLogoutButton");
const loginView = document.getElementById("loginView");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");


/* LOGIN VIEW */
const showLoginView = () => {
    // TODO
}

const hideLoginView = () => {
    // TODO
}


/* ACCOUNT VIEWS */

// helper functions to show and hide ui elements relating to logged-in users
const showAccountViews = () => {
    // TODO
}

const hideAccountViews = () => {
    // TODO
}


/* profile view */
const profileView = document.getElementById("profileView");
let accountInfoCard;

// helper functions to show and hide main profile-card
const showProfileView = () => {
    // TODO
}

const hideProfileView = () => {
    // TODO
}



/* users view */
const usersView = document.getElementById("usersView");

// helper functions to show and hide users list view.
const showUsersView = () => {
    // TODO
}

const hideUsersView = () => {
    // TODO
}

/* account info view */

// helper functions to show and hide account info view
const showAccountInfoView = () => {
    // TODO
}

const hideAccountInfoView = () => {

}



/* FUNCTIONS */

// main logout function
const logout = () => {
    hideAccountViews();
    logoutUser();
    showLoginView();
}

const logoutUser = () => {
    // TODO
}

// main login function
const login = (userObj) => {
    hideLoginView();
    constructAccountViews(userObj);
    showProfileView();
}

const tryLogin = () => {
    let username = usernameInput.value;
    if (checkLogin(username)) login(getUser(username));
    else console.log("invalid login");
}

// overrides default form submit behaviour. If username is correct, handles login logic
loginForm.addEventListener('submit', tryLogin);

const constructAccountViews = (userObj) => {
    buildProfile(userObj); // builds default user profile according to userObj values.
    let users = getViewableUsers(userObj);
    buildUserCards(userObj, users);
}

// returns an array of userObjects that the passed-in user is permissible to view
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

// used to build the viewable cards for the currently logged-in user
const buildUserCards = (userObj, usersArray) => {
    let role = userObj.role;

    if (role == "user") {
        for (let user of usersArray) {
            userCardsArray.push(buildUserCard(user));
        }
    }
}

navLogoutButton.addEventListener('click', logout);

// const setupProfile = (userObj) => {
//     hideElement(loginView);
//     hideElement(navLoginButton);
//     currentUser = userObj;

//     // make main user profile card.
//     let profile;
//     if (currentUser.role == "user") profile = buildProfile(userObj);
//     else profile = buildAdminProfile(currentUser);

//     profileView.innerHTML = profile;

//     // create the users view
//     usersView.innerHTML = buildUsersView();
//     usersView.style.display = "none";

//     // adding event listeners for card links
//     document.getElementById("accountInfoLink").addEventListener('click', displayAccountInfo);
//     document.getElementById("viewUsersLink").addEventListener('click', displayUsersInfo);
//     document.getElementById("logoutLink").addEventListener('click', logout);
    
//     accountInfoCard = document.getElementById("accountInfo");
//     hideElement(accountInfoCard);

//     showElement(profileView);
//     showElement(navLogoutButton);
// }

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


// returns the index in userDataArray of the passed-in user. -1 if not found
const getUserIndex = (userObj) => {
    return userDataArray.findIndex(userObj);
}

// deletes user at index
const deleterUser = (index) => {
    userDataArray.splice(index, 1);
}


/* MAIN LOGIC/SETUP */
parseUserData(userDataString); // populate userDataArray with pre-made user-data

hideElement(navLogoutButton);
