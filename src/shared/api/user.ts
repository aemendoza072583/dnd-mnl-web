export const getUserInfo = () => {
  return localStorage.getItem("userInfo");
};

export const getUserId = () => {
  const userInfo = getUserInfo();
  return userInfo ? JSON.parse(userInfo).id : null;
};

export const getUserFullName = () => {
  const userInfo = getUserInfo();
  return userInfo ? JSON.parse(userInfo).fullName : null;
};

export const getUserEmail = () => {
  const userInfo = getUserInfo();
  return userInfo ? JSON.parse(userInfo).email : null;
};

export const getUserRoles = () => {
  const userInfo = getUserInfo();
  return userInfo ? JSON.parse(userInfo).roles : null;
};

export const setUserInfo = (userInfo: any) => {
  localStorage.setItem("userInfo", userInfo);
};

export const removeUserInfo = () => {
  localStorage.removeItem("userInfo");
};