import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
//* CSS
import './CSS/SignUser.scss'
//* Queries
import { addUser, allUsers } from '../Queries/Queries'






function SignUser({ setUsersign }) {
    const navigate = useNavigate()
    const [sign, setSign] = useState({ name: '', lastName: '', userName: '', age: '', password: '' })
    const [Signup] = useMutation(addUser)
    const { data } = useQuery(allUsers)


    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setSign({
            ...sign,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (data.allUsers.some(({ userName }) => userName === sign.userName)) {
            alert('این کاربر قبلا ثبت نام کرده است')
        } else {
            Signup({
                variables: {
                    name: sign.name,
                    lastName: sign.lastName,
                    userName: sign.userName,
                    age: Number(sign.age),
                    password: sign.password
                }
            })


            setTimeout(() => {
                setUsersign(sign)
                return navigate('/', { replace: true })
            }, 1)
        }
    }






    return (
        <div id='sign'>
            <h1 align='center' className='mt-2 text-primary'>Sign up</h1>
            <form onSubmit={handleSubmit} autoComplete='off' className='w-50 mx-auto pt-3'>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder='please enter name'
                        className='form-control'
                        value={sign.name}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className='mt-4'>
                    <label htmlFor="lastName">lastName</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder='please enter lastName'
                        className='form-control'
                        value={sign.lastName}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className='mt-4'>
                    <label htmlFor="userName">userName</label>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder='please enter userName'
                        className='form-control'
                        value={sign.userName}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className='mt-4'>
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        placeholder='please enter age'
                        className='form-control'
                        value={sign.age}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className='mt-4'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        placeholder='please enter password'
                        className='form-control'
                        value={sign.password}
                        onChange={handleChangeInput}
                    />
                </div>
                <button type='submit' className='btn btn-primary w-100 mt-3'>Sign up</button>
            </form>
            <Link to='/login' className='d-block text-center mt-5'>Do you have an account? Login</Link>
        </div>
    )
}

export default SignUser