import { SET_Career, SET_Type, SET_Steam, SET_Report, SET_Webinar ,LOGOUT} from "./actionTypes";

export const setCarrer = (career) => ({
    type: SET_Career,
    payload: career,
  });

export const setReport = (report) => ({
    type: SET_Report,
    payload: report,
  });

export const setType = (type) => ({
    type: SET_Type,
    payload: type,
  });

  export const setSteam = (steam) => ({
    type: SET_Steam,
    payload: steam,
  });
  
  export const setWebinar = (webinar) => ({
    type: SET_Webinar,
    payload: webinar,
  });

  export const setLogoutCareer = (logout) => ({
    type: LOGOUT,
    payload: logout,
  });
  
