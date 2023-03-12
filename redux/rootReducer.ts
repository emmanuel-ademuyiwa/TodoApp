import { combineReducers } from "redux";
import TodoReducer from "./todo/todoReducer";

export const rootReducer = combineReducers({
  tasks: TodoReducer,
});
