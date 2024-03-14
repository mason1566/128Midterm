// data is in order: username,first_name,last_name,email,role,image
const userDataString = `user0,Mason,Johnson,c0514274@camosun.ca,owner,images/user0
user1,Denis,Williams,DenisEWilliams@dayrep.com,admin,images/user1
user2,Roberto,Jepsen,rjep228@gmail.com,user,images/user2
user3,Melissa,Dorsey,MelissaWDorsey@teleworm.us,user,images/user3
user4,Bertha,Alford,berthaa@hotmail.com,user,images/user4
user5,Robert,Labarre,bigrobL@robslounge.com,admin,images/user5
user6,Delbert,Wells,dontdwellonit@gmail.com,user,images/user6
user7,Mavis,Scroggins,mscroggs@email.com,user,images/user7
user8,Tony,Simmons,tonyjsimmons@rhyta.com,user,images/user8
user9,Victor,Shortt,vshort893@gmail.com,user,images/user9
user10,Ellen,Preston,EllenBPreston@dayrep.com,user,images/user10
user11,Debra,Carey,dagoodcarey@gmail.com,admin,images/user11
user12,Daniel,Montenegro,danielmonty@aol.com,user,images/user12
user13,Carolyn,Johnson,cj22ohnson@gmail.com,user,images/user13
user14,Gerri,Smith,gsmitty@email.com,user,images/user14
user15,Kyle,Hamrick,kylehamrick7@gmail.com,user,images/user15`;

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

const getUser = (username) => {
    for (const user of userDataArray) {
        if (user.username == username) return user;
    }
    return null;
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