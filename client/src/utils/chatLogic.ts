type users = {
  email: string;
  id?: string;
  picture: string;
  name: string;
  token: string;
  _id?: string;
};

type messageProps = {

}

export const getSender = (loggedUser: users, users: users[]) => {
  return users[0]._id === loggedUser?.id ? users[1].name : users[0].name;
};

export const getFullSender = (loggedUser: users, users: users[]) => {
  return users[0]._id === loggedUser?.id ? users[1] : users[0];
};

export const isSameUser = (messages: any, m: any, i: number, userId: string) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const isLastMessage = (messages: any, i:number, userId: string) => {
  return (
    i === messages.length - 1 && //if its is the last message
    messages[messages.length - 1].sender._id !== userId  //if last message sender is not the user

  );
};

export const isSameSender = (messages: any, m: any, i: number, userId: string) => {
  return (
    i < messages.length - 1 && 
    messages[i + 1].sender._id !== m.sender._id &&
    messages[i].sender._id !== userId
  );
};


export const isSameSenderMargin = (messages: any, m: any, i: number, userId: string) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};