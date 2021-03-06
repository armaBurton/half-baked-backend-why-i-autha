const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class UserService {
  static async create(code) {
    //exchange code for token
    
    const token = await exchangeCodeForToken(code);

    //get user info from github using token
    const profile = await getGithubProfile(token);

    let user = await GithubUser.findByUsername(profile.username);

    if (!user) {
      user = await GithubUser.insert(profile);
    }

    //this checks to see if there is any users on the server
    // const getAll = await GithubUser.getAllUsers();

    return user;
  }
};
