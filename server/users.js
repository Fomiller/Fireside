const users = [];

// Adds user object to room
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const user = { id, name, room };
  users.push(user);
  return { user }
};

// Removes user from room
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// Get user thats sending message from id.
const getUser = (id) => users.find((user) => user.id === id);
// Get all users in room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };