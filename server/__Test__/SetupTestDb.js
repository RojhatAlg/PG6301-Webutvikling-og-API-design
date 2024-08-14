const mongoose = require('mongoose');

const mongooseConnect = async () => {
  const dbUri = 'mongodb+srv://root:root@databasewebapi.8qcvd6c.mongodb.net/?retryWrites=true&w=majority&appName=databaseWebApi'; // Update with your test database URI
  await mongoose.connect(dbUri);
  console.log('MongoDB connection is ready');
};

const mongooseDisconnect = async () => {
  await mongoose.disconnect();
  console.log('MongoDB connection is closed');
};

module.exports = { mongooseConnect, mongooseDisconnect };
