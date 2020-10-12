import api from '../../services/api';

async function getPokemons() {
  const result = await api.get('/api/v1/pokedex');

  let docs = result.data.success ? result.data.data.Pokedex : [];

  docs = docs.map(pokemon => {
    const pokemonGen = pokemon.Generation.split(' ');
    return {
      ...pokemon,
      qtyAttacks:
        pokemon['Fast Attack(s)'].length + pokemon['Special Attack(s)'].length,
      Generation: pokemonGen.length > 1 ? pokemonGen[1] : pokemonGen[0],
    };
  });

  console.warn('docs > ', docs);
  // docs = docs.map(customer => {
  //   return {
  //     ...customer,
  //     registerSince: moment(customer.createdAt, 'YYYY-MM-DD').format(
  //       'DD/MM/YYYY'
  //     ),
  //     icon: customer.cnpj ? mdiFactory : mdiAccount,
  //     subtitle: customer.cnpj ? 'Jurídica' : 'Física',
  //   };
  // });

  return docs;
}

// async function getRegistersBySearch(search) {
//   const result = await api.get(`/api/v1/get-customer-by-search/${search}`);

//   let docs = result.data.success ? result.data.pokedex : [];
//   const docCount =
//     result.data.success && result.data.qty > 0 ? result.data.qty : 0;

//   docs = docs.map(customer => {
//     return {
//       ...customer,
//       registerSince: moment(customer.createdAt, 'YYYY-MM-DD').format(
//         'DD/MM/YYYY'
//       ),
//       icon: customer.cnpj ? mdiFactory : mdiAccount,
//       subtitle: customer.cnpj ? 'Jurídica' : 'Física',
//     };
//   });

//   return { docs, docCount };
// }

export default {
  getPokemons,
  // getRegistersBySearch,
};
