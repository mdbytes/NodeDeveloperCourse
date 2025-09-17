require("../src/db/mongoose");

const Task = require("../src/models/Task");

// Task.findByIdAndDelete("5fbec5c77b8ff3641cfb299f")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("5fbec5688441352cc8071cb4")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
