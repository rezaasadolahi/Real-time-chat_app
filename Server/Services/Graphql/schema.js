const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList
} = require('graphql')
const UserModel = require('../Models/Users')
const MessageModel = require('../Models/Message')
const lodash = require('lodash')



//? Sample Data
/* const Data_User = [
  {
    id: '1',
    name: 'Reza',
    lastName: 'Asadolahi',
    userName: 'reza_456',
    age: 23,
    activeTime: false,
    password: '1234'
  },
  {
    id: '2',
    name: 'Ali',
    lastName: 'Eshgarf',
    userName: 'ali_891',
    age: 24,
    activeTime: true,
    password: '8520'
  },
]

const Data_Message = [
  { id: '1', text: 'Hi Ali', time: '08:25', fromUser: 1, toUser: 2 },
  { id: '2', text: 'Where are u ?', time: '08:27', fromUser: 1, toUser: 2 },
  { id: '3', text: 'Hi Reza', time: '09:28', fromUser: 2, toUser: 1 },
  { id: '4', text: 'I am at home', time: '09:29', fromUser: 2, toUser: 1 },
  { id: '5', text: 'Whre are u ?', time: '09:30', fromUser: 2, toUser: 1 }
] */




const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    lastName: { type: GraphQLString },
    userName: { type: GraphQLString },
    age: { type: GraphQLInt },
    activeTime: { type: GraphQLBoolean },
    password: { type: GraphQLString },
    fromMessageTo: {
      type: new GraphQLList(MessageType),
      args: { toUser: { type: GraphQLID } },
      resolve(parent, args) {
        return MessageModel.find({ $and: [{ fromUser: parent.id }, { toUser: args.toUser }] })
      }
    },
  })
})

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    time: { type: GraphQLString },
    fromUser: { type: GraphQLID },
    toUser: { type: GraphQLID },
  })
})




const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    User: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return UserModel.findById(args.id)
      }
    },
    Message: {
      type: MessageType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return MessageModel.findById(args.id)
      }
    },
    allUsers: {
      type: new GraphQLList(UserType),
      resolve() {
        return UserModel.find()
      }
    },
    allMessages: {
      type: new GraphQLList(MessageType),
      resolve() {
        return MessageModel.find()
      }
    },
  }
})



const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        lastName: { type: GraphQLString },
        userName: { type: GraphQLString },
        age: { type: GraphQLInt },
        activeTime: { type: GraphQLBoolean },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newUser = new UserModel({
          name: args.name,
          lastName: args.lastName,
          userName: args.userName,
          age: args.age,
          activeTime: args.activeTime,
          password: args.password
        })
        return newUser.save()
      }
    },
    addMessage: {
      type: MessageType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        time: { type: GraphQLString },
        fromUser: { type: GraphQLID },
        toUser: { type: GraphQLID }
      },
      resolve(parent, args) {
        let newMessage = new MessageModel({
          text: args.text,
          time: args.time,
          fromUser: args.fromUser,
          toUser: args.toUser
        })
        return newMessage.save()
      }
    },
  }
})




module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })