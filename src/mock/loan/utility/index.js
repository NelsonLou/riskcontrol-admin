const getData = (data, name, id, idCard, limit, page) => {
  let mockData = []
  let total = 0
  // 初始化页面数据
  if (name === '' && id === '' && idCard === '') {
    for (var i = (page * limit - limit); i < (limit * page); i++) {
      if (i < data.List.length) {
        mockData.push(data.List[i])
      } else {
        break
      }
    }
    total = data.List.length
  } else {
    // 搜索结果匹配客户编号的数据存放区
    let idArr = []
    // 搜索结果匹配客户名称的数据存放区
    let nameArr = []
    // 搜索结果匹配客户身份证的数据存放区
    let idCardArr = []
    // 搜索结果
    let resultArr = []
    // 正则匹配客户编号
    let reId = new RegExp('(.*)(' + id + ')+(.*)')
    // 正则匹配客户名称
    let reName = new RegExp('(.*)(' + name + ')+(.*)')

    // 遍历总数据
    if (id === '') {
      for (let i = 0; i < data.List.length; i++) {
        // 满足客户编号条件的数据
        if (reId.test(data.List[i].id)) {
          idArr.push(data.List[i])
        }
      }
    } else {
      for (let i = 0; i < data.List.length; i++) {
        // 满足客户编号条件的数据
        if ((data.List[i].id + '') === id) {
          idArr.push(data.List[i])
        }
      }
    }
    for (let j = 0; j < idArr.length; j++) {
      // 满足客户名称条件的数据
      if (reName.test(idArr[j].name)) {
        nameArr.push(idArr[j])
      }
    }
    if (idCard !== '') {
      for (let n = 0; n < nameArr.length; n++) {
        // 满足申请金额条件的数据
        if ((nameArr[n].idCard + '') === idCard) {
          idCardArr.push(nameArr[n])
        }
      }
      // 设置搜索结果的数据
      resultArr = idCardArr
    } else {
      resultArr = nameArr
    }
    // 设置搜索结果的数据条数
    total = resultArr.length
    // 设置搜索结果
    mockData = resultArr
  }
  return {
    mockData,
    total
  }
}

export default getData
