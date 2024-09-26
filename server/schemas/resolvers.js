const { User } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth'); 

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      const foundUser = await User.findOne({
        _id: context.user_id,
      }).populate('savedBooks')

      if (!foundUser){
        throw AuthenticationError;
      }
      return foundUser
  }
},

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPW = await user.isCorrectPassword(password);

      if (!correctPW) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedBooks: content } },
          { new: true }
        );

        return updateUser.savedBooks.find(b => b.bookId === book.bookId);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteBook: async (parent, params, context) => {
      if (context.user) {

        const updateUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId: params.bookId } } },
          { new: true }
        );


        return updateUser.savedBooks.find(b => b.bookId === bookId);
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;