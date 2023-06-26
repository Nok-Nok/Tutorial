document.addEventListener('DOMContentLoaded', () => {
  const continentSelect = document.getElementById('continent-select');
  const countriesList = document.getElementById('countries-list');
  queryFetch(`
      query {
        continents{
          name
          code
        }
      }
      `).then((data) => {
    data.data.continents.forEach((continent) => {
      const option = document.createElement('option');
      option.value = continent.code;
      option.innerText = continent.name;
      continentSelect.append(option);
    });
    // next Task, for each continent we select, we want to display its contries
    continentSelect.onchange = async (e) => {
      // continentSelect.value === e.target.value
      const continentCode = e.target.value;
      const countries = await getContinentCountries(continentCode);
      countriesList.innerHTML = '';
      const list = document.createElement('ul');
      countries.forEach((country) => {
        const item = document.createElement('li');
        item.innerText = country.name;
        list.append(item);
      });
      countriesList.append(list);
    };
  });
});

async function getContinentCountries(continentCode) {
  // Option 1, use ${...}
  /**
   * queryFetch(`
      {
        continent(code: "${continentCode}") {
          countries {
            name
          }
        }
      }
      `).then((data) => console.log(data));
   */
  // Option 2, use variable
  return queryFetch(
    `
    query getCountries($code: ID!) {
      continent(code: $code) {
        countries {
          name
        }
      }
    }
    `,
    { code: continentCode }
  ).then((data) => data.data.continent.countries);
}

function queryFetch(query, variables) {
  return fetch('https://countries.trevorblades.com/', {
    // Did a post request to send the query, even though we are doing a get request
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((res) => res.json());
}
