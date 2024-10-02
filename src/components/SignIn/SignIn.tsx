
import React, { FC, useState } from 'react';
import s from './SignIn.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { getLogin } from '../../store/userSlice';

const SignIn: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [mail, setMail] = useState<string>('')
    const [pass, setPass] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(getLogin({ email: mail, password: pass })).unwrap();
            setMail('')
            setPass('')
            navigate(`/user`)
        } catch (error) {
            console.log('Login failed. Please check your credentials.');
        }
    }
    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <h1>Login</h1>
            <p className={s.signInText}>Email</p>
            <input
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className={s.mail}
                type="email"
                placeholder='user@example.com' />
            <p className={s.signInText}>Password</p>
            <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className={s.pass}
                type="password"
                placeholder='аt least 8 chars, uppercase, lowercase, numbers' />
            <button type="submit" className={s.signInBtn}>Login</button>
            <div className={s.wrapText}>
                <p>Don't have an account?</p>
                <Link to={`/registration`}
                    className={s.signInLink}
                >register</Link>
            </div>
        </form>

    );
};

export default SignIn;
