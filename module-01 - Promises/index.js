// Obter usuário
// Obter telefone usuário
// Obter endereço usuário

const getUser = () => {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      return resolve({
        id: 1,
        name: 'Aladin',
        phone: '11 940000000',
        address: 'Disney',
      })
    }, 2000);
  });
}

const getPhoneNumber = (user) => {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      return resolve('(11)940000000');
    }, 2000);
  })
}

const getAddress = (user) => {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      return resolve('Disney');
    }, 2000);
  }) 
}

const main = async () => {
  console.time('getUserInfo');

  const user = await getUser();
  const userInfo = await Promise.all([
    getPhoneNumber(user),
    getAddress(user),
  ])
  // const userPhone = await getPhoneNumber(user);
  // const userAddress = await getAddress(user);
  
  console.log(`
  Id => ${user.id}
  Name => ${user.name}
  Phone => ${userInfo[0]}
  Address => ${userInfo[1]}`);

  console.timeEnd('getUserInfo');
}

main()


// ======================= Promises ======================= 
// const user = getUser()
// .then(user => {
//   return getPhoneNumber(user)
//   .then(phoneNumber => {
//     return {
//       user: {
//         id: user.id,
//         name: user.name,
//       },
//       phone: phoneNumber,
//     }
//   })
// })
// .then(user => {
//   return getAddress(user)
//     .then(address => {
//       return {
//         user: {
//           id: user.user.id,
//           name: user.user.name,
//         },
//         phone: user.phone,
//         address: address
//       }
//     })
// })
// .then(res => {
//   console.log(`
//   Id => ${res.user.id}
//   Name => ${res.user.name}
//   Phone Number => ${res.phone}
//   Address => ${res.address} `)
// })
// .catch(error => console.error(error))


// ======================= CallBacks ======================= 
// const user = getUser((error, user) => {
//   if (error) console.error('User is broken!');

//   getPhoneNumber(user, (phoneError, phoneNumber) => {
//     if (phoneError) console.error('Phone number is broken!');

//     getAddress(user, (addressError, address) => {
//       if (addressError) console.error('Address is broken!');
      
//       console.log(`
//         User id => ${user.id}
//         Phone number => ${phoneNumber}
//         Address => ${address}`)
//     });
//   });  
// });

// console.log(`PhoneNumber => ${phoneNumber}`)
// console.log(`Address => ${address}`)
