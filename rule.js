module.exports = {
  // 模块介绍
  summary: 'my customized rule for AnyProxy',
  // 发送请求前拦截处理
  *beforeSendRequest(requestDetail) { /* ... */ },
  // 发送响应前处理1
  *beforeSendResponse(requestDetail, responseDetail) { /* ... */ },
  // 是否处理https请求
  *beforeDealHttpsRequest(requestDetail) { /* ... */ },
  // 请求出错的事件
  *onError(requestDetail, error) { /* ... */ },
  // https连接服务器出错
  *onConnectError(requestDetail, error) { /* ... */ }
};
