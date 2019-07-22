//Async functions
// Callback Mechanism begin
console.log('Before');
getUser(1, displayUserRepos);
console.log('After'); 

function getUser (id , callback) {
    //An example async function
    setTimeout(()=>{
        // Some operation that takes 2 seconds
        console.log('Sorry! I got late in fetching info for user id: ', id);
        callback ({id: id, name: 'User1', email: 'abc.test@success.com'});
    },2000);
}

function getReposWithEmail (email, callback){
    setTimeout(()=>{
        console.log('Fetching Repos with email: ', email);
        callback (['repo1', 'repo2', 'repo3']);
    },2000);
}
// Methods in order to avoid the callback hell, or callback christmas
function displayUserRepos (user){
    console.log('User' , user);
    getReposWithEmail(user.email, displayRepos);
}
function displayRepos(repos) {
    console.log('Repos are: ',repos);
}
// Callback Mechanism end

