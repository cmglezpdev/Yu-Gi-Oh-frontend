
// services.js
const arquetipos:any[]= 
    [
    {
      name:'mostruos',
      id:'1212122'
    },
    {
      name:'magos',
      id:'1212122'
    },
    {
      name:'elfos',
      id:'1212122'
    },
    {
      name:'piad',
      id:'1212122'
    },
    {
      name:'alimanas',
      id:'1212122'
    },
    {
      name:'bichejos',
      id:'1212122'
    },
  ]

const fetchArchetypes = ()=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(
        arquetipos
      )
    },3000)
  })
}



export { fetchArchetypes};
