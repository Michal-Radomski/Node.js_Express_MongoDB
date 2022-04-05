const users = [
  {id: 1, name: "Adam"},
  {id: 2, name: "Marysia"},
  {id: 3, name: "Jagienka"},
  {id: 4, name: "Mieszko"},
];

module.exports = {
  showUsers: function () {
    const names = users.map((user) => user.name);
    console.log("Users are:");
    names.forEach((name) => console.log(name));
  },
  showUserObj(id: number) {
    console.log("Szukany użytkownik to:", id);
    console.log(users.find((user) => user.id === id));
  },
  userListLength: users.length,
};
