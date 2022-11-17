export const removeDuplicates = (arr) => {
  const uniqueData = []

  const unique = arr.filter(element=>{
    var time = element.time.toString().split(".")[0];
    const isDuplicate = uniqueData.includes(time);

    if(!isDuplicate){
      uniqueData.push(time);
      return true;
    }
    return false
  })
  return unique;

}

export const compare = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const timeA = a.time
  const timeB = b.time

  let comparison = 0
  if (timeA > timeB) {
    comparison = 1
  } else if (timeA < timeB) {
    comparison = -1
  }
  return comparison
}
