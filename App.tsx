
import React, { useState, useCallback } from 'react';
import { ScreenView, Transaction } from './types';
import LoginScreen from './components/LoginScreen';
import MainMenuScreen from './components/MainMenuScreen';
import BalanceScreen from './components/BalanceScreen';
import WithdrawScreen from './components/WithdrawScreen';
import DepositScreen from './components/DepositScreen';
import TransactionHistoryScreen from './components/TransactionHistoryScreen';

const App: React.FC = () => {
    const [currentScreen, setCurrentScreen] = useState<ScreenView>(ScreenView.Login);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [balance, setBalance] = useState<number>(5432.10);
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: 't3', type: 'DEPOSIT', amount: 300.00, date: '2024-07-19' },
        { id: 't2', type: 'WITHDRAWAL', amount: 80.00, date: '2024-07-18' },
        { id: 't1', type: 'WITHDRAWAL', amount: 20.00, date: '2024-07-15' },
    ]);
    const [message, setMessage] = useState<string | null>(null);

    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000);
    };

    const handleLogin = useCallback((pin: string) => {
        if (pin === '1234') {
            setIsAuthenticated(true);
            setCurrentScreen(ScreenView.MainMenu);
            return true;
        }
        showMessage('Invalid PIN');
        return false;
    }, []);

    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        setCurrentScreen(ScreenView.Login);
    }, []);

    const handleWithdraw = useCallback((amount: number) => {
        if (amount > balance) {
            showMessage('Insufficient funds');
            return false;
        }
        if (amount % 20 !== 0) {
            showMessage('Amount must be a multiple of $20');
            return false;
        }
        setBalance(prev => prev - amount);
        const newTransaction: Transaction = {
            id: `t${transactions.length + 1}`,
            type: 'WITHDRAWAL',
            amount,
            date: new Date().toISOString().split('T')[0]
        };
        setTransactions(prev => [newTransaction, ...prev]);
        showMessage(`Successfully withdrew $${amount.toFixed(2)}`);
        setCurrentScreen(ScreenView.MainMenu);
        return true;
    }, [balance, transactions.length]);

    const handleDeposit = useCallback((amount: number) => {
        setBalance(prev => prev + amount);
        const newTransaction: Transaction = {
            id: `t${transactions.length + 1}`,
            type: 'DEPOSIT',
            amount,
            date: new Date().toISOString().split('T')[0]
        };
        setTransactions(prev => [newTransaction, ...prev]);
        showMessage(`Successfully deposited $${amount.toFixed(2)}`);
        setCurrentScreen(ScreenView.MainMenu);
        return true;
    }, [transactions.length]);

    const renderScreen = () => {
        if (!isAuthenticated) {
            return <LoginScreen onLogin={handleLogin} message={message} />;
        }

        switch (currentScreen) {
            case ScreenView.MainMenu:
                return <MainMenuScreen setScreen={setCurrentScreen} onLogout={handleLogout} message={message} />;
            case ScreenView.Balance:
                return <BalanceScreen balance={balance} setScreen={setCurrentScreen} />;
            case ScreenView.Withdraw:
                return <WithdrawScreen onWithdraw={handleWithdraw} setScreen={setCurrentScreen} balance={balance} />;
            case ScreenView.Deposit:
                return <DepositScreen onDeposit={handleDeposit} setScreen={setCurrentScreen} />;
            case ScreenView.History:
                return <TransactionHistoryScreen transactions={transactions} setScreen={setCurrentScreen} />;
            default:
                return <LoginScreen onLogin={handleLogin} message={message} />;
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 text-gray-200">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl aspect-[9/14] md:aspect-[4/5] bg-black rounded-3xl shadow-2xl shadow-cyan-500/10 border-4 border-gray-700 p-4 flex flex-col">
                <div className="flex justify-between items-center mb-4 px-2">
                    <h1 className="text-2xl font-orbitron text-cyan-400">J-ATM</h1>
                    <div className="flex items-center space-x-2">
                        <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 100 125">
                            <path d="M49.5,15.2c-20.1,0-35.9,13.2-35.9,33.5c0,13.1,8.4,24.2,21.8,29.8c-1.4,3.8-3.3,8.4-3.6,10.1c-0.2,1.3,0.3,2.6,1.4,3.3  c1.1,0.7,2.5,0.5,3.4-0.5c1-1.1,5.3-5.7,9.3-11c1.2,0.1,2.4,0.1,3.6,0.1c20.1,0,35.9-13.2,35.9-33.5S69.6,15.2,49.5,15.2z M60.4,49.3  c0,2.6-1.1,3.6-3.1,3.6c-2.3,0-3.6-1.3-3.6-4.2c0-2.8,1-5.1,3.8-5.1C60.1,43.7,60.4,45.8,60.4,49.3z M47,49.3c0,2.6-1.1,3.6-3.1,3.6  c-2.3,0-3.6-1.3-3.6-4.2c0-2.8,1-5.1,3.8-5.1C46.7,43.7,47,45.8,47,49.3z"/>
                        </svg>
                        <span className="text-sm text-orange-400 font-bold">Powered by Java</span>
                    </div>
                </div>
                <div className="bg-gray-800 border-2 border-gray-600 rounded-xl flex-grow flex items-center justify-center p-2">
                   <div className="w-full h-full bg-blue-900/40 rounded-lg p-6 flex flex-col text-center shadow-inner shadow-black/50">
                        {renderScreen()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
