
// services.js
interface archetype {
  name: string,
  id: string
}

const getArchetypes = async() => {

  const archetypes : archetype[] = [];

  const response = await fetch(`http://localhost:5202/api/Archetype`).then( r => r.json() )

  response.forEach(element => {
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
