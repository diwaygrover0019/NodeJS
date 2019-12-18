console.log('Before');

// Promise-based approach
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits', commits))
//     .catch(err => console.log('Error', err.message));

// Async and Await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch(err) {
        console.log('Error', err.message);
    } 
}
displayCommits();

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling the database...');
            resolve({ id: id, gitHubUsername: 'diwaygrover0019' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling the GITHUB Api...');
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('could not get the repos...'))
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling the GITHUB Api...');
            resolve(['Commit1', 'Commit2', 'Commit3']);
        }, 2000);
    });
}