/* USER CREATION */
const userDataArray = []; // main user array. Each element in the array is to hold a user object.

/* function to parse comma-separated user-data into objects. Places user objects in userDataArray */
const parseUserData = (users) => {
    let userLines = users.split("\n");
    
    let splitUserData = [];
    for (const line of userLines) {
        splitUserData.push(line.split(","));
    }

    // 
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



/* DOM MANIPULATION */
const form = document.getElementById("loginForm");

// overrides default form submit behaviour
form.addEventListener('submit', (e) => {
    e.preventDefault(); // done to prevent the page from refreshing (the default submit action)
    console.log("SUBMIT");
});


/* MAIN LOGIC */
parseUserData(userDataString);

