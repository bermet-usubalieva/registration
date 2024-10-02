import React, { FC, useEffect } from 'react';
import s from './UserPage.module.css'
import { useAppSelector } from '../../hooks';

const UserPage: FC = () => {
    const { first_name, last_name, email, phone } = useAppSelector(state => state.user)

    return (
        <div className={s.wrap}>
            <h1>User Information</h1>
            <p><strong>First Name:</strong> {first_name}</p>
            <p><strong>Last Name:</strong> {last_name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
        </div>
    );
};

export default UserPage;