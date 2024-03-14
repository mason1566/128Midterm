/* FUNCTIONS */
const logout = () => {
    currentUser = "";
    profileView.innerHTML = ``;
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
    if (isValid) {
        hideElement(loginView);
        hideElement(navLoginButton);

        setupProfile(getUser(unameTextInput.value))
        showElement(profileView);
        showElement(navLogoutButton);
    }
    else console.log("Invalid user");
    console.log(unameTextInput.value)
});

/* MAIN LOGIC */
const userDataArray = []; // main user array. Each element in the array is to hold a user object.
parseUserData(userDataString); // populate userDataArray with pre-made user-data
