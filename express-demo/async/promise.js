//// Promises Mechanism begin
console.log('Before');
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log(commits))
    .catch(err => console.log('Error happened.!!!',err.message));
console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => { 
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'username' });
        }, 2000);    
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => { 
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => { 
        setTimeout(() => {
            console.log('Calling GitHub API...');
            //Error condition
            //reject(new Error (['commit1', 'commit2', 'commit3','commit4','commit5']));
            // pass
            resolve(['commit1', 'commit2', 'commit3','commit4','commit5']);
        }, 2000);
    });
}
//// Promises Mechanism end
