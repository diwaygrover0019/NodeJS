
const p = Promise.resolve({ id: 1 });
p.then(result => console.log(result));

const pr = Promise.reject(new Error('reason for rejection...'));
pr.catch(error => console.log(error));

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000);
});

Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(error => console.log('Error', error.message));

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(error => console.log('Error', error.message));