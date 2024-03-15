import User from '../models/user.js'

const createUser = async (req, res) => {
  try {
    const { username, email, phoneNumber, fullName, userType, street , city , state , zipCode } = req.body;

    // Create a new user with the embedded address
    const user = new User({
      username,
      email,
      phoneNumber,
      fullName,
      userType,
      address: {
        street,
        city,
        state,
        zipCode,
      },
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const { username, email, phoneNumber, fullName, userType, address } = req.body;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user fields
      user.username = username;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.fullName = fullName;
      user.userType = userType;
  
      // Update address fields
      user.address.street = address.street;
      user.address.city = address.city;
      user.address.state = address.state;
      user.address.zipCode = address.zipCode;
  
      // Save the updated user
      await user.save();
  
      res.json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export default { createUser, getUsers ,updateUser};
