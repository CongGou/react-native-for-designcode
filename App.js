import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import TabNavigator from "./navigator/TabNAvigator";
const initialState = {
  action: "",
  name: "未登录",
  photo:
    "https://p97.f4.n0.cdn.getcloudapp.com/items/kpudnrBx/avatar-default.jpg?v=4aadcdbdffe209bbd523530a75351afd",
  allArtive: [
    {
      author: {
        name: "",
        photo:
          "https://p97.f4.n0.cdn.getcloudapp.com/items/kpudnrBx/avatar-default.jpg?v=4aadcdbdffe209bbd523530a75351afd"
      }
    }
  ]
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { ...state, action: "openMenu" };
    case "CLOSE_MENU":
      return { ...state, action: "closeMenu" };
    case "UPDATE_NAME":
      return { ...state, name: action.name };
    case "UPDATE_AVATAR":
      return { ...state, photo: action.photo };
    case "UPDATE_ALLARTIVE":
      return { ...state, allArtive: action.allArtive };
    case "OPEN_CARD":
      return { ...state, action: "openCard" };
    case "CLOSE_CARD":
      return { ...state, action: "closeCard" };
    case "OPEN_LOGIN":
      return { ...state, action: "openLogin" };
    case "CLOSE_LOGIN":
      return { ...state, action: "closeLogin" };
    default:
      return state;
  }
};
const store = createStore(reducer);
const App = () => (
  <Provider store={store}>
    <TabNavigator />
  </Provider>
);
export default App;
