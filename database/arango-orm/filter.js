module.exports = {
  userFilter: function (value) {
    return {
      name: 'userId',
      value: value,
      op: '=='
    }
  },
  keyFilter: function (value) {
    return {
      name: '_key',
      value: value,
      op: '=='
    }
  },
  nameFilter: function (value) {
    return {
      name: 'name',
      value: value,
      op: '=='
    }
  },
  typeFilter: function (value) {
    return {
      name: 'type',
      value: value,
      op: '=='
    }
  },
  idFilter: function (value) {
    return {
      name: '_id',
      value: value,
      op: '=='
    }
  }
}
