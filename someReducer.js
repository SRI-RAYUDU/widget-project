// src/someReducer.js
const initialState = {
    widgets: [] // Holds widget data
  };
  
  const someReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_WIDGET':
        return {
          ...state,
          widgets: [...state.widgets, action.payload]
        };
      case 'REMOVE_WIDGET':
        return {
          ...state,
          widgets: state.widgets.filter(widget => widget.id !== action.payload)
        };
      default:
        return state;
    }
  };
  
  export default someReducer;
  