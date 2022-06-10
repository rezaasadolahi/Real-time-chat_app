import { useState } from 'react'
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { Routes, Route } from 'react-router-dom'
//* Components
import NavBar_component from './Components/NavBar_component'
import SignUser from './Components/SignUser'
import Login from './Components/Login'
//* Pages
import BothAside from './Pages/BothAside'
//* CSS
import './App.css'






const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`Graphql error ${message}`)
      })
    }
  }),
  new HttpLink({ uri: "http://localhost:4000/graphql" })])
})




function App() {
  const [userSignUser, setUsersign] = useState([])


  return (
    <div>
      <ApolloProvider client={client}>
        <NavBar_component />
        <Routes>
          <Route index element={userSignUser.length !== 0 ?
            <BothAside userSignUser={userSignUser} /> :
            <SignUser setUsersign={setUsersign} />
          }
          />
          <Route path='/login' element={<Login setUsersign={setUsersign} />} />
        </Routes>
      </ApolloProvider>
    </div>
  )
}

export default App