/*******************************
 MASON JOHNSON HOTEL | STAFF LANDING PAGE
    WHAT IS IT
        This project presents the user with a login form asking for a username.
        Using user0-user15, you can login => presenting you with the Profile View.
        The Profile View is the main account hub; from here you can access all other account-related actions.
        
    SETUP & DETAILS
        Setup for this project could not be simpler. Just run the index.html file, which then runs the 3 javascript files.

        THE 3 FILES
            1. script.js - contains the meat of the application. Handles all interaction with the DOM and defines all logic-related functions.
            2. htmlBuilder.js - contains templates for the various user profile views.
            3. users.js - contains data for the 16 user accounts. (add more if you'd like)

    REFLECTION
        I learned a lot of troubleshooting and bug fixing from this project. It was so easy to get lost in the code, but just forcing myself to think it through logically,
        even though tough, got me through to the end. I restructured the entire project at least 3 times. It was very messy at one point, but I gradually kept trying
        to make it simpler, eventually getting to a point that I'm happy with (plus it works).

        I designed the different parts of the program as views:
                LOGIN VIEW - login box and login button

                PROFILE VIEW - main welcome 
                
                ACCOUNT INFO VIEW - side pop-up card that contains all info about the logged-in user
                
                USERS VIEW - This is where the user can see info about other users:
                    - Normal users can see themselves, and any users of a higher role.
                    - Admins can see everybody, but can only delete normal users.
                    - The owner can see everybody and can delete everybody (except himself).

        Each view has its own associated hide and show functions.
 
 ******************************/

// Document references
const navLoginButton = document.getElementById("navLoginButton");
const navLogoutButton = document.getElementById("navLogoutButton");
const loginView = document.getElementById("loginView");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const profileView = document.getElementById("profileView");
const usersView = document.getElementById("usersView");

navLogoutButton.style.display = "none";

// Project declarations
const userDataArray = []; // main user array. Each element in the array is to hold a user object.
let userCardsArray = [];
let deletableUsers = []; // used on admin profiles. list of users the currently logged-on user is permissible to delete
let currentUser;

let accountInfoView;
let logoutButton;
let accountInfoButton;
let viewUsersButton;
let goodButton;
let notGoodButton;
let greetingBox;

const addProfileEventListeners = () => {
    accountInfoButton.addEventListener('click', showAccountInfoView);
    logoutButton.addEventListener('click', logout);
    viewUsersButton.addEventListener('click', showUsersView)
    goodButton.addEventListener('click', goodFunc)
    notGoodButton.addEventListener('click', notGoodFunc);
}

// Ran when the user presses the "not good" button
const notGoodFunc = () => {
    let currUser = getCurrentUser();
    if (currUser.role == "owner") {
        let fireThem = confirm("Would you like to fire everybody?");
        if (fireThem) deleteAllEmployees();
        console.log("all deleted")
    }
    let element = `<div class="d-flex justify-content-center gap-4 mt-4 mb-3">                                    
        <p class="fs-5">We're sorry to hear that!</p>                                            
    </div>`
    greetingBox.innerHTML = element;
}

// Ran when the user presses the "good" button
const goodFunc = () => {
    let element = `<div class="d-flex justify-content-center gap-4 mt-4 mb-3">                                         
        <p class="fs-5">We're glad to hear!</p>                                            
    </div>`
    greetingBox.innerHTML = element;
}

/* DOM MANIPULATION */

/* LOGIN VIEW */
const showLoginView = () => {
    loginView.style.display = "flex";
    navLoginButton.style.display = "block";
}

const hideLoginView = () => {
    loginView.style.display = "none";
    navLoginButton.style.display = "none";
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
    navLogoutButton.style.display = "none";
}


/* profile view */

// helper functions to show and hide main profile-card
const showProfileView = () => {
    profileView.style.display = "flex";
    navLogoutButton.style.display = "flex"
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
    userCardsArray = [];
    deletableUsers = [];
    accountInfoView = ``;
    logoutButton = ``;
    accountInfoButton = ``;
    viewUsersButton = ``;
}

// main login function
const login = (userObj) => {
    currentUser = userObj;
    hideLoginView();
    constructAccountViews(userObj);
    showProfileView();
}

// validates a login attempt
const tryLogin = () => {
    let username = usernameInput.value;
    if (checkLogin(username)) {
        document.getElementById("invalidUserContainer").innerHTML = ``;
        login(getUser(username));
    }
    else {
        document.getElementById("invalidUserContainer").innerHTML = `<p class="mt-5 fw-bold fs-5" style="color: red;">INVALID USER</p>`;
    }
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
    goodButton = document.getElementById("goodButton");
    notGoodButton = document.getElementById("notGoodButton");
    greetingBox = document.getElementById("greetingBox");
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
                deletableUsers.push(viewableUsers[i]);
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
                deletableUsers.push(viewableUsers[i]);
                console.log(viewableUsers.username)
            }
        }
    }
    return cards
}





/* ADMIN USER DELETION */
const adminDeleteUser = (userObj) => {
    document.getElementById(`${userObj.username}Card`).style.display = "none";
    console.log(userObj.username);
    deleteUser(userObj);
    
}

// this function was a pain to write...
const setUpAdminDeleteButtons = () => {
    for (let i = 0; i < deletableUsers.length; i++) { // add 
        let username = deletableUsers[i].username;
        let deleteButton = document.getElementById(`${username}Delete`);
        deleteButton.addEventListener('click', () => adminDeleteUser(deletableUsers[i]));
    }
}



// overrides default form submit behaviour. If username is correct => handles login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    tryLogin();
});

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
const getUserIndex = (username) => {
    for (let i = 0; i < userDataArray.length; i++) {
        if (userDataArray[i].username == username) return i;
    }
    return -1;
}

// deletes user at index
const deleteUser = (userObj) => {
    let index = getUserIndex(userObj.username);
    userDataArray.splice(index, 1);
}

const getCurrentUser = () => {
    return currentUser;
}

const deleteAllEmployees = () => {
    console.log("Hello");
    for (const user of deletableUsers) {
        adminDeleteUser(user);
    }
}



/* MAIN LOGIC/SETUP */
parseUserData(userDataString); // populate userDataArray with pre-made user-data

