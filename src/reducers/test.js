const initialState = {
  test: "Hello world!"
};


export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}