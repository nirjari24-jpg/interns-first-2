const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  email: String
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function main() {
  const uri = "mongodb+srv://nirjari24_db_user:d4D3yahgyg1FZcpg@cluster0.sehzw9g.mongodb.net/chatgroup?appName=Cluster0";
  
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas!");
    const users = await User.find({});
    console.log("Users in DB:");
    console.log(users.map(u => ({ id: u._id, username: u.username, email: u.email })));
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
}

main();
