
import React, { useState } from 'react';
import { ScreenView } from '../types';
import Keypad from './Keypad';

interface DepositScreenProps {
    onDeposit: (amount: number) => boolean;
    setScreen: (screen: ScreenView) => void;
}

const DepositScreen: React.FC<DepositScreenProps> = ({ onDeposit, setScreen }) => {
    const [amount, setAmount] = useState('');

    const handleKeyPress = (key: string) => {
        if (key === '.' && amount.includes('.')) return;
        setAmount(amount + key);
    };

    const handleClear = () => {
        setAmount('');
    };

    const handleEnter = () => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount) && numericAmount > 0) {
            onDeposit(numericAmount);
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-grow">
                <h2 className="text-3xl font-orbitron text-cyan-300 mb-4">Deposit Funds</h2>
                 <p className="text-md text-gray-400 mb-6">Please insert cash or check and enter amount.</p>
                <div className="bg-black/30 w-full h-14 rounded-lg flex items-center justify-end text-4xl px-4">
                    ${amount || '0.00'}
                </div>
            </div>

            <Keypad
                onKeyPress={handleKeyPress}
                onClear={handleClear}
                onEnter={handleEnter}
                showEnter={amount.length > 0}
            />
             <button
                onClick={() => setScreen(ScreenView.MainMenu)}
                className="w-full mt-3 p-3 text-xl font-bold bg-yellow-600/80 hover:bg-yellow-500/80 text-black rounded-full transition-colors duration-200 shadow-md border-2 border-yellow-400/80 active:translate-y-px"
            >
                Cancel
            </button>
        </div>
    );
};

export default DepositScreen;
