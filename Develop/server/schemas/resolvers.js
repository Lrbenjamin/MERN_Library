const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, args) => {
      try {
        console.log('Received args:', args); // Log the input arguments

        // Attempt to create the user
        const user = await User.create(args);
        console.log('User created:', user); // Log the created user

        // Generate a token for the new user
        const token = signToken(user);
        console.log('Token generated:', token); // Log the generated token

        // Return the token and user object
        return { token, user };
      } catch (error) {
        // Handle duplicate key error
        if (error instanceof mongoose.Error.ValidationError || error.code === 11000) {
          console.error('Duplicate key error:', error.message);
          throw new Error('Email already exists. Please use a different email.');
        }

        // Log other errors with full stack trace
        console.error('Error during user creation:', error.message);
        console.error('Stack trace:', error.stack);

        // Re-throw the error to be caught by Apollo Client
        throw new Error('Failed to add user');
      }
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: bookData } },
          { new: true }
        ).populate('savedBooks');

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks');

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;





