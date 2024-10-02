
import React, { FC, useState } from 'react';
import s from './SignUp.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { postUser, setEmail } from '../../store/userSlice';

const SignUp: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [email, setEmailState] = useState('');
    const [password, setPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState<Record<string, string | null>>({
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        phone: null,
    });

    const validateForm = () => {
        const newErrors: Record<string, string | null> = {
            email: null,
            password: null,
            firstName: null,
            lastName: null,
            phone: null,
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Enter a valid email address.';
        }

        if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
        }

        if (!firstName.trim()) {
            newErrors.firstName = 'First name cannot be empty.';
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Last name cannot be empty.';
        }

        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required.';
        }

        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === null);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const userData = {
            email,
            password,
            last_name: lastName,
            first_name: firstName,
            phone,
        };

        try {
            await dispatch(postUser(userData)).unwrap();
            dispatch(setEmail(userData.email))
            navigate('/verification');
        } catch (rejectedValueOrSerializedError) {
            if (typeof rejectedValueOrSerializedError === 'string') {
                setErrors({ ...errors, email: rejectedValueOrSerializedError });
            } else {
                console.error('Неизвестная ошибка');
            }
        }
    };



    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input
                className={s.inp}
                placeholder='user@example.com'
                type="email"
                value={email}
                onChange={(e) => setEmailState(e.target.value)}
            />
            {errors.email && <p className={s.error}>{errors.email}</p>}

            <input
                className={s.inp}
                placeholder='strong_password_1234'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className={s.error}>{errors.password}</p>}
            <input
                className={s.inp}
                placeholder='last_name'
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className={s.error}>{errors.lastName}</p>}
            <input
                className={s.inp}
                placeholder='first_name'
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className={s.error}>{errors.firstName}</p>}
            <input
                className={s.inp}
                placeholder='0999 99 99 99'
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className={s.error}>{errors.phone}</p>}
            <button
                className={s.logBtn}
                type="submit">Register</button>
            <div className={s.wrapText}>
                <p>
                    Already have an account?
                </p>
                <Link className={s.formLink} to={`/`}>Login</Link>
            </div>
        </form>
    );
};

export default SignUp;

