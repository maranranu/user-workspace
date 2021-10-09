function evaluateAQLFilters (obj, finalObj, index) {
  if (typeof (obj.value) === 'number') {
    finalObj.filter += ` FILTER ${index}.${obj.name} ${obj.op} ${obj.value}`
  } else if (typeof (obj.value) === 'object') {
    finalObj.filter += ` FILTER ${index}.${obj.name} ${obj.op} @value`
    finalObj.bind['value'] = obj.value
  } else {
    finalObj.filter += ` FILTER ${index}.${obj.name} ${obj.op} '${obj.value}'`
  }
  return finalObj
}

function objectToString (loopIndexName, filterObj) {
  let finalObj = {
    filter: '',
    bind: {}
  }
  filterObj.forEach((filter) => {
    let obj = evaluateAQLFilters(filter, finalObj, loopIndexName)
    finalObj = obj
  })
  return finalObj
}

module.exports = {
  objectToString: objectToString
}
