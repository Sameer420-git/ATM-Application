
import React, { useState } from 'react';
import { ScreenView } from '../types';
import Keypad from './Keypad';

interface WithdrawScreenProps {
    onWithdraw: (amount: number) => boolean;
    setScreen: (screen: ScreenView) => void;
    balance: number;
}

const WithdrawScreen: React.FC<WithdrawScreenProps> = ({ onWithdraw, setScreen, balance }) => {
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
            onWithdraw(numericAmount);
        }
    };
    
    const quickWithdraw = (value: number) => {
        onWithdraw(value);
    }

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-grow">
                 <h2 className="text-3xl font-orbitron text-cyan-300 mb-2">Withdraw Funds</h2>
                 <p className="text-md text-gray-400 mb-4">Current Balance: ${balance.toFixed(2)}</p>

                <div className="bg-black/30 w-full h-14 rounded-lg flex items-center justify-end text-4xl px-4 mb-4">
                    ${amount || '0.00'}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    {[20, 40, 60, 100].map(val => (
                        <button key={val} onClick={() => quickWithdraw(val)} className="p-3 text-xl font-bold bg-gray-700/60 hover:bg-cyan-500/40 rounded-lg transition-all duration-200 border-2 border-gray-600 hover:border-cyan-400 shadow-md active:translate-y-px">
                            ${val}
                        </button>
                    ))}
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

export default WithdrawScreen;
