export default store => {
  // console.log(localStorage.getItem('env'))
  store.subscribe(({ type, payload }, state) => {
    // mutation 的格式为 { type, payload }
    // if (type === 'setEnv') {
    //   localStorage.setItem('env', payload)
    // }
  })
}