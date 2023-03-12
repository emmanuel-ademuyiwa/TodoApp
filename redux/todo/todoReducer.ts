import {
  TOGGLE_COMPLETE,
  SAVE_TODO,
  TOGGLE_STARRED,
  EDIT_DATA,
  DELETE_TASK,
  PUSH_NOTIFICATION,
} from "./todoTypes";

const initialState = {
  tasksArray: [],
  editedData: {},
  notification: "",
};

const TodoReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_TODO: {
      const inList = state.tasksArray.find((item: any) =>
        item.id === payload.id ? true : false
      );
      return {
        ...state,
        tasksArray: inList
          ? state.tasksArray.map((item: any) =>
              item.id === payload.id ? payload : item
            )
          : [...state.tasksArray, payload],
      };
    }
    case TOGGLE_COMPLETE:
      const updatedTask = { ...payload, completed: !payload.completed };
      const updatedArray = state.tasksArray.map((item: any) =>
        item.id === payload.id ? updatedTask : item
      );
      return {
        ...state,
        tasksArray: [...updatedArray],
      };
    case TOGGLE_STARRED:
      const updatedStarred = { ...payload, starred: !payload.starred };
      const updatedList = state.tasksArray.map((item: any) =>
        item.id === payload.id ? updatedStarred : item
      );
      return {
        ...state,
        tasksArray: [...updatedList],
      };
    case EDIT_DATA: {
      return {
        ...state,
        editedData: payload,
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        tasksArray: state.tasksArray.filter(
          (obj: any) => obj.id !== payload.id
        ),
      };
    }
    case PUSH_NOTIFICATION: {
      return {
        ...state,
        notification: payload,
      };
    }
    default:
      return state;
  }
};

export default TodoReducer;
