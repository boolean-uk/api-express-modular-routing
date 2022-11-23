global.beforeEach(async() => {
  delete require.cache[require.resolve('../../data')];
})

