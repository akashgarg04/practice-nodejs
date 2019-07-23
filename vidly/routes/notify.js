
// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//       getTopMovies((movies) => {
//         console.log('Top movies: ', movies);
//         sendEmail(customer.email, movies, () => {
//           console.log('Email sent...')
//         });
//       });
//     }
//   });

console.log('Before');
sendEmailToCustomer();
console.log('After');

async function sendEmailToCustomer()
{
    const customer = await getCustomer(1);
    console.log('Customer: ', customer);
    if (customer.isGold) 
    {
            const movies = await getTopMovies();
            console.log('Top movies: ', movies);
            await sendEmail(customer.email, movies);
            console.log('Email sent...');
    }
}


function getCustomer(id ) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
        resolve({ 
            id: 1, 
            name: 'True User', 
            isGold: true, 
            email: 'email' 
        });
        }, 4000);
    });
}
  
  function getTopMovies( ) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(['Mad Man', 'Crazy Girl']);
          }, 4000);
    });
  }
  
  function sendEmail( email, movies ) {
    console.log('Sending email...');
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve();
          }, 4000);
      });
  }