/* DOM MANIPULATION */
const hideElement = (element) => element.style.display = "none";
const showElement = (element) => element.style.display = "block";

/* login view */
const loginView = document.getElementById("loginView");
const loginForm = document.getElementById("loginForm");
const unameTextInput = document.getElementById("usernameInput");

// overrides default form submit behaviour
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // done to prevent the page from refreshing (the default submit action)
    let isValid = checkValidUser(unameTextInput.value);
    if (isValid) {
        hideElement(loginView);
    }
    else console.log("Invalid user");
    console.log(unameTextInput.value)
});



/* profile view */
const profileView = document.getElementById("profileView");

const buildProfile = (userObj) => {
    
}



/* users view */
const usersView = document.getElementById("usersView");




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

const printUsers = () => {
    for (let i = 0; i < userDataArray.length; i++) {
        console.log(userDataArray[i]);
    }
}

const checkValidUser = (username) => {
    for (const user of userDataArray) {
        if (user.username == username) return true;
    }
    return false;
}


/* MAIN LOGIC */
const userDataArray = []; // main user array. Each element in the array is to hold a user object.
parseUserData(userDataString); // populate userDataArray with pre-made user-data

