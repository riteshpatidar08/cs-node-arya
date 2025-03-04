const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
//step connect the localdatabase
mongoose
  .connect('mongodb://localhost:27017/crudusers')
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.log(err);
  });

//create a schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    min: [3, 'Name must be atleast 3 character'],
    max: [50, 'Name must not exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  salary: {
    type: Number,
  },
});

const User = mongoose.model('users', userSchema);

//   const insertData = async( ) => {
//     const newUser = await User.create({name : 43234})
//     console.log(newUser)
//   }

//   insertData()

app.post('/users', async (req, res) => {
  try {
    const { name, email, password, salary } = req.body;
    // console.log(typeof name)
    if (!email || !password || !name || !salary) {
      return res.status(400).json({
        message: 'all fields are required',
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: 'email is already exists',
      });
    }

    const newUser = await User.create({ name, email, password, salary });

    res.status(201).json({
      message: 'User created',
      data: newUser,
    });
  } catch (error) {}
});

app.get('/users', async (req, res) => {
  try {
      const {page,pagelimit} =  req.query
    const users = await User.find().limit(pagelimit).skip((page - 1) * pagelimit)
   
    //   .sort({ name: -1 })
    //   .select('-password');
    if (!users) {
      return res.status(404).json({
        messsage: 'No users found',
      });
    }
    const totalCount = await User.countDocuments();
    res.status(200).json({
      message: 'Users fetched successfully',
      totalResults: users.length,
      totalCount,
      data: users,
    });
  } catch (error) {}
});

app.get('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      //   return res.status(404).json({
      //     messsage: 'No user found',
      //   });
      throw new Error('No user found');
    }
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

app.put('/users/:id', async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const newUser = await User.findByIdAndUpdate(id, { name }, { new: true });

  if (!newUser) {
    return res.status(404).json({
      message: 'No user updated',
    });
  }
  res.status(200).json({
    data: newUser,
  });
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: `User for this ${user.email} deleted`,
    });
  } catch (error) {}
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(400).json({
    message: err.message,
  });
});
//handling unmatched route
app.use((req, res) => {
  return res.status(404).json({
    message: `The requested ${req.url} is not found`,
  });
});

app.listen(3000, () => {
  console.log('Server is running');
});
