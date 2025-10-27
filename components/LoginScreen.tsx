
import React, { useState } from 'react';
import Keypad from './Keypad';

interface LoginScreenProps {
    onLogin: (pin: string) => boolean;
    message: string | null;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, message }) => {
    const [pin, setPin] = useState('');

    const handleKeyPress = (key: string) => {
        if (pin.length < 4) {
            setPin(pin + key);
        }
    };

    const handleClear = () => {
        setPin('');
    };

    const handleEnter = () => {
        const success = onLogin(pin);
        if (!success) {
            setPin('');
        }
    };

    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex-grow flex flex-col items-center justify-center">
                <h2 className="text-3xl font-orbitron text-cyan-300 mb-4">Welcome</h2>
                <p className="text-lg text-gray-300 mb-6">Please Enter Your PIN</p>
                <div className="bg-black/30 w-48 h-14 rounded-lg flex items-center justify-center text-4xl tracking-[1.5rem] px-4">
                    {'*'.repeat(pin.length).padEnd(4, ' ')}
                </div>
                {message && <p className="text-red-400 mt-4 text-lg animate-pulse">{message}</p>}
            </div>
            <Keypad
                onKeyPress={handleKeyPress}
                onClear={handleClear}
                onEnter={handleEnter}
                showEnter={pin.length > 0}
            />
        </div>
    );
};

export default LoginScreen;
