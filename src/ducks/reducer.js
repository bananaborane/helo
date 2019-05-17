import axios from "axios";

const initState = {
  id: "",
  email: "",
  password: "",
  profile_pic: "",
  isUserLoggedIn: false
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const REGISTER = "REGISTER";
const UPDATE_PROFILE_PIC = "UPDATE_PROFILE_PIC";
const REDUX_HANDLE_CHANGE = "REDUX_HANDLE_CHANGE";

export const updateProfilePic = (profile_pic)=>{
    return {
        type: UPDATE_PROFILE_PIC,
        payload: profile_pic
    }
}

export const login = (username, password) => {
  let data = axios
    .post("/login", { username, password })
    .then(res => {
      return res.data;
    })
    .catch(err =>
      console.log(`Something happened while logging in through Redux: ${err}`)
    );
  console.log(data);
  return {
    type: LOGIN,
    payload: data
  };
};

export const register = (username, password) => {
    let data = axios
    .post("/register", { username, password })
    .then(res => {
      return res.data;
    })
    .catch(err =>
      console.log(`Something happened while logging in through Redux: ${err}`)
    );
  console.log(data);
  return {
    type: LOGIN,
    payload: data
  };
};

export const reduxHandleChange = e => {
  console.log(initState);
  return {
    type: REDUX_HANDLE_CHANGE,
    payload: e.target
  };
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case LOGIN + "_PENDING":
      return { ...state, loading: true };
    case LOGIN + "_FULFILLED":
      let { username, id } = action.payload.userData;
      return {
        ...state,
        password: "",
        username,
        id,
        loading: false,
        isUserLoggedIn: true
      };
    case UPDATE_PROFILE_PIC:
      return {...state, profile_pic: action.payload}
    case LOGIN + "_REJECTED":
      return { ...state, loading: false };
    case REGISTER + "_PENDING":
      return { ...state, loading: true };
    case REGISTER + "_FULFILLED":
      return {
        ...state,
        id: action.payload.userData.id,
        password: "",
        username: action.payload.userData.username,
        loading: false,
        isUserLoggedIn: true
      };
    case REGISTER + "_REJECTED":
      return { ...state, loading: false };
    case REDUX_HANDLE_CHANGE:
      console.log(state);
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
}
