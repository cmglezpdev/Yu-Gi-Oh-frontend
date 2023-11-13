
function formatDate(date:Date,format:string):string
{

  const order = format.split('/')

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

export {formatDate}
