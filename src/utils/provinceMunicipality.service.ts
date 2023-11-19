  export async function getAllProvinces()
  {
     return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve([
          {
            id:'1',
            name:'Pinar del Rio'
          },
          {
            id:'hjhjkk',
            name:'Artemisa'
          },
          {
            id:'hjhjkk',
            name:'La Habana'
          },
          {
            id:'hjhjkk',
            name:'Matanzas'
          },
          {
            id:'hjhjkk',
            name:'Oriente'
          },

        ])
      },2000);
    })
  }
  export async function getMunicipalities(provinceId:string)
  {
     return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve([
          {
            id:'hjhjkk',
            name:'Municipio1'
          },
          {
            id:'1',
            name:'Municipio2'
          },
          {
            id:'hjhjkk',
            name:'Municipio3'
          },
        ])
      },2000);
    })
  }
