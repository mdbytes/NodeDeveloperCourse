require("../src/db/mongoose");

const User = require("../src/models/User");

// User.findByIdAndUpdate("5fbec3dc5de5b667d4407c5f", { age: 48 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 48 });
//   })
//   .then((result) => {
//     console.log(result);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5fbec3dc5de5b667d4407c5f", 2)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
