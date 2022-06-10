import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
//* CSS
import './CSS/Login.scss'
//* Queries
import { allUsers } from '../Queries/Queries'






function Login({ setUsersign }) {
    const [logine, setlogin] = useState({ userName: 'ali_801', password: '876814' })
    const { error, loading, data } = useQuery(allUsers)
    const navigate = useNavigate()


    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setlogin({
            ...logine,
            [name]: value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if (data.allUsers.some(({ userName, password }) => userName === logine.userName && password === logine.password)) {
            setUsersign(
                data.allUsers.find(({ userName, password }) => userName === logine.userName && password === logine.password)
            )
            navigate('/', { replace: true })
        } else {
            alert('یوزر نیم یا پسورد اشتباه است')
        }
    }









    return (
        <>
            {loading ? <h1 align='center' id='lodaing-LoginPage'>Loading...</h1> :
                <div id='login'>
                    <h1 align='center' className='text-primary mt-5'>Login</h1>
                    <form onSubmit={handleSubmit} autoComplete='off' className='w-50 mx-auto mt-1 pt-5'>
                        <div className='mt-4'>
                            <label htmlFor="userName">userName</label>
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                placeholder='please enter userName'
                                className='form-control'
                                value={logine.userName}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="age">Password</label>
                            <input
                                type="text"
                                name="password"
                                id="password"
                                placeholder='please enter password'
                                className='form-control'
                                value={logine.password}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <button type='submit' className='btn btn-primary w-100 mt-3'>Login</button>
                    </form>
                    <Link to='/' className='d-block text-center mt-5'>Do not have an account? Sign up</Link>
                </div>
            }
        </>
    )
}

export default Login