const promiseAction = <T>(actionCreator: (payload: T) => any) => {
  return (payload: T): Promise<any> =>
    Promise.resolve({
      ...actionCreator(payload),
      then: undefined,
    });
};

export default promiseAction;
