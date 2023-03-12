import {
  DELETE_TASK,
  EDIT_DATA,
  EDIT_MODAL,
  PUSH_NOTIFICATION,
  SAVE_EDITED,
  SAVE_TODO,
  TOGGLE_COMPLETE,
  TOGGLE_STARRED,
} from "./todoTypes";

export const _SAVE_TODO = (data: any) => {
  return {
    type: SAVE_TODO,
    payload: data,
  };
};

export const _TOGGLE_COMPLETE = (data: any) => {
  return {
    type: TOGGLE_COMPLETE,
    payload: data,
  };
};

export const _TOGGLE_STARRED = (data: any) => {
  return {
    type: TOGGLE_STARRED,
    payload: data,
  };
};

export const _EDIT_DATA = (data: any) => {
  return {
    type: EDIT_DATA,
    payload: data,
  };
};

export const _EDIT_MODAL = () => {
  return {
    type: EDIT_MODAL,
  };
};

export const _DELETE_TASK = (data: any) => {
  return {
    type: DELETE_TASK,
    payload: data,
  };
};

export const _PUSH_NOTIFICATION = (message: string) => {
  return {
    type: PUSH_NOTIFICATION,
    payload: message,
  };
};
