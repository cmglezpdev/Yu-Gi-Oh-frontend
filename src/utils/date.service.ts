
function formatDate(date:Date,format:string):string
{
  const order = format.split('/')
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export {formatDate}
