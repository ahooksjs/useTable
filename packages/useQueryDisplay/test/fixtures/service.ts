const service = () => {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          data: 'data',
        }),
      500,
    );
  });
};

export default service;
