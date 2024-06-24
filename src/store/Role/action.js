import { SET_USER_ROLE, SET_USER_ID,  SET_USER_NAME, SET_JWTTOKEN, SET_O_PHOTO, SET_STUDENT, SET_PHONE,LOGOUT, SET_SPACE_BUCKS, SET_NEW_REGISTER} from "./actionTypes";


export const setUserRole = (role) => ({
    type: SET_USER_ROLE,
    payload: role,
  });

  
export const setUserId = (_id) => ({
    type: SET_USER_ID,
    payload: _id,
  });

  
export const setUserName = (fullName) => ({
  type: SET_USER_NAME,
  payload: fullName,
});

export const setJwtToken = (jwtToken) => ({
  type: SET_JWTTOKEN,
  payload: jwtToken,
});

export const setO_photo = (o_photo) => ({
  type: SET_O_PHOTO,
  payload: o_photo,
});

export const setStudent = (student) => ({
  type: SET_STUDENT,
  payload: student,
});

export const setPhone = (phone) => ({
  type: SET_PHONE,
  payload: phone,
});
export const setSpaceBucksNew = (spaceBucks) => ({
  type: SET_SPACE_BUCKS,
  payload: spaceBucks,
});
export const setNewRegister = (newRegister) => ({
  type: SET_NEW_REGISTER,
  payload: newRegister,
});

export const setLogout = (logout) => ({
  type: LOGOUT,
  payload: logout,
});