export const getSender = (loggedUser: any, users: any) => {
  return users[0]._id === loggedUser.id ? users[1].name : users[0].name;
};

export const getFullSender = (loggedUser: any, users: any) => {
  return users[0]._id === loggedUser.id ? users[1] : users[0];
};
