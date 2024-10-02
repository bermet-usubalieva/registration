import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../Pages/LoginPage/LoginPage';
import RegisterPage from '../../Pages/RegisterPage/RegisterPage';
import CodePage from '../../Pages/CodePage/CodePage';
import UserPage from '../../Pages/UserPage/UserPage';

const Main: FC = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/registration' element={<RegisterPage />} />
                <Route path='/verification' element={<CodePage />} />
                <Route path='/user' element={<UserPage />} />
            </Routes>
        </div>
    );
};

export default Main;