import { gql } from '@apollo/client'




const allUsers = gql`
  {
    allUsers{
      id,
      name,
      lastName,
      userName,
      age,
      activeTime,
      password,
    }
  }
`


const addUser = gql`
  mutation($name: String, $lastName: String, $userName: String, $age: Int, $password: String) {
      addUser(name: $name, lastName: $lastName, userName: $userName, age: $age, password: $password) {
        id,
        name,
        lastName,
        userName,
        age,
        activeTime,
        password
      }
  }
`


const allMessages = gql`
    {
      allMessages {
        id,
        text,
        time,
        fromUser,
        toUser
      }
    }
`


const addMessage = gql`
  mutation($text: String!, $time: String, $fromUser: ID, $toUser: ID) {
      addMessage(text: $text, time: $time, fromUser: $fromUser, toUser: $toUser) {
        id,
        text,
        time,
        fromUser,
        toUser
      }
  }
`





export { allUsers, addUser, allMessages, addMessage }