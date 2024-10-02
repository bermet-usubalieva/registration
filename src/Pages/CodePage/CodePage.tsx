import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './CodePage.module.css';
import { useAppSelector } from '../../hooks';
import { userAPI } from '../../API';

const CodePage: FC = () => {
    const navigate = useNavigate();
    const email = useAppSelector(state => state.user.email);
    const [codeState, setCodeState] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const handleSubmit = async () => {
        if (codeState.length === 6) {
            try {
                const response = await userAPI.checkCode(email, Number(codeState));

                if (response.data) {
                    navigate('/');
                } else {
                    setErrorMessage('Invalid code. Please try again.');
                }
            } catch (error) {
                setErrorMessage('Server error. Try again.');
            }
        } else {
            setErrorMessage('Enter the full six-digit code.');
        }
    };



    return (
        <div className={s.wrap}>
            <h2>Enter six digit code</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className={s.codeWrap}>
                <input
                    type="text"
                    value={codeState}
                    maxLength={6}
                    onChange={(e) => setCodeState(e.target.value)}
                    className={s.codeInp}
                    placeholder="Enter code"

                />
                <button onClick={handleSubmit} className={s.codeBtn}>Confirm</button>
            </div>
        </div>
    );
};

export default CodePage;

