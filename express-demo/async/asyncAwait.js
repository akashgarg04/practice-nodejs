//// Async/Await Mechanism begin
console.log('Before');
displayCommitsforUserAndRepo();
console.log('After');


async function displayCommitsforUserAndRepo() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err)
    {
        console.log('THis is an issue: ',err.message);
    }
}

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
            reject(new Error (['commit1', 'commit2', 'commit3','commit4','commit5']));
            // pass
            //resolve(['commit1', 'commit2', 'commit3','commit4','commit5']);
        }, 2000);
    });
}
//// Async/Await Mechanism end
