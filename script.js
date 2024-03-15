// Document references
const navLoginButton = document.getElementById("navLoginButton");
const navLogoutButton = document.getElementById("navLogoutButton");
const loginView = document.getElementById("loginView");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const profileView = document.getElementById("profileView");
const usersView = document.getElementById("usersView");

// Project declarations
const userDataArray = []; // main user array. Each element in the array is to hold a user object.
let userCardsArray = [];
let deletableCardUsernames = []; // used on admin profiles. list of users the currently logged-on user is permissible to delete

let accountInfoView;
let logoutButton;
let accountInfoButton;
let viewUsersButton;

const addProfileEventListeners = () => {
    accountInfoButton.addEventListener('click', showAccountInfoView);
    logoutButton.addEventListener('click', logout);
    viewUsersButton.addEventListener('click', showUsersView)
}

/* DOM MANIPULATION */
const hideElement = (element) => element.style.display = "none";
const showElement = (element) => element.style.display = "block";

/* LOGIN VIEW */
const showLoginView = () => {
    loginView.style.display = "flex";
}

const hideLoginView = () => {
    loginView.style.display = "none";
}


/* ACCOUNT VIEWS */

// helper functions to show and hide ui elements relating to logged-in users
const showAccountViews = () => {
    showProfileView();
    showAccountInfoView()
    showUsersView();
}

const hideAccountViews = () => {
    hideProfileView();
    hideAccountInfoView();
    hideUsersView();
}


/* profile view */

// helper functions to show and hide main profile-card
const showProfileView = () => {
    profileView.style.display = "flex";
}

const hideProfileView = () => {
    profileView.style.display = "none";
}



/* users view */

// helper functions to show and hide users list view.
const showUsersView = () => {
    usersView.style.display = "flex";
}

const hideUsersView = () => {
    usersView.style.display = "none";
}

/* account info view */

// helper functions to show and hide account info view
const showAccountInfoView = () => {
    accountInfoView.style.display = "flex";
}

const hideAccountInfoView = () => {
    accountInfoView.style.display = "none";
}



/* FUNCTIONS */

// main logout function
const logout = () => {
    hideAccountViews();
    logoutUser();
    showLoginView();
}

// because technically the user could simply change the display type in the html, 
// we need to delete the elements that contained user-data.
const logoutUser = () => {
    // TODO
}

// main login function
const login = (userObj) => {
    hideLoginView();
    constructAccountViews(userObj);
    showProfileView();
}

// validates a login attempt
const tryLogin = () => {
    let username = usernameInput.value;
    if (checkLogin(username)) login(getUser(username));
    else console.log("invalid login");
}

// function to create the profile of a logging-in user
const constructAccountViews = (userObj) => {
    profileView.innerHTML = buildProfile(userObj); // builds default user profile according to userObj values.
    let users = getViewableUsers(userObj);
    userCardsArray = buildUserCards(userObj, users);

    let cards = ``;
    for (let i = 0; i < userCardsArray.length; i++) cards += userCardsArray[i];
    usersView.innerHTML = cards;

    // event-listener setup for newly injected html elements
    accountInfoView = document.getElementById("accountInfo");
    logoutButton = document.getElementById("logoutButton");
    accountInfoButton = document.getElementById("accountInfoButton");
    viewUsersButton = document.getElementById("viewUsersButton");
    addProfileEventListeners();

    if (userObj.role != "user") setUpAdminDeleteButtons();
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

// used to build the viewable cards for the currently logged-in user. Returns an array of html user-cards
const buildUserCards = (userObj, viewableUsers) => {
    let role = userObj.role;
    cards = [];

    if (role == "user") {
        for (let i = 0; i < viewableUsers.length; i++) {
            cards.push(buildUserCard(viewableUsers[i]));
        }
    }
    else if (role == "admin") {
        for (let i = 0; i < viewableUsers.length; i++) {
            if (viewableUsers[i].role == "user") {
                cards.push(buildDeletableCard(viewableUsers[i]));
                deletableCardUsernames.push(viewableUsers.username);
            } 
            else cards.push(buildUserCard(viewableUsers[i]));
        }
    }
    else if (role == "owner") {
        for (let i = 0; i < viewableUsers.length; i++) {
            if (userObj == viewableUsers[i]) { // if current viewableUser is the owner
                cards.push(buildUserCard(viewableUsers[i]));
            } 
            else {
                cards.push(buildDeletableCard(viewableUsers[i]));
                deletableCardUsernames.push(viewableUsers.username);
                console.log(viewableUsers.username)
            }
        }
    }
    return cards
}

const adminDeleteUser = (username) => {
    console.log(username);
}

const setUpAdminDeleteButtons = () => {
    for (let i = 0; i < deletableCardUsernames.length; i++) {
        let uname = deletableCardUsernames[i];
        let deleteButton = document.getElementById(`${uname}Delete`);
        console.log(deleteButton);
    }
}

// overrides default form submit behaviour. If username is correct => handles login
loginForm.addEventListener('submit', tryLogin);

navLogoutButton.addEventListener('click', logout);

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

// returns the userObj that matches with passed-in username.
const getUser = (username) => {
    for (const user of userDataArray) {
        if (user.username == username) return user;
    }
    return null;
}

// returns true if username is that of a valid user
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
