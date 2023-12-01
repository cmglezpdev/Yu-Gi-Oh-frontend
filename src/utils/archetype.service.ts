import { httpClient } from "./axios"

// services.js
interface archetype {
  name: string,
  id: string
}

const getArchetypes = async() => {

  const archetypes : archetype[] = [];

  const response = await httpClient.get('/Archetype'); 

  console.log(response.data)
  response.data.forEach((element: any) => {
    let archetype: archetype = {
      name: element.name,
      id: element.id,
    }
    archetypes.push(archetype)
  });

  return archetypes;
}

const fetchArchetypes = ()=>{
  return new Promise((resolve)=>{
    resolve(
      getArchetypes()
    )
  })
}


export { fetchArchetypes};
