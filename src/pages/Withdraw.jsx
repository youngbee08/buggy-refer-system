import React, { useState, useRef } from 'react';
import { EyeClosed, EyeIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Withdraw = () => {
  const [toggleWithdraw, setToggleWithdraw] = useState(false);
  const [withdrawPopup, setWithdrawPopup] = useState(false);
  const [pinPopup, setPinPopup] = useState(false);
  const [toggleBalance, setToggleBalance] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [pinError, setPinError] = useState('');
  const [pin, setPin] = useState('');
  const bankDetails = JSON.parse(localStorage.getItem('bankDetails') || '{}');
  const amountRef = useRef(null);
  const navigate = useNavigate();

  const triggerWithdrawal = () => {
    if (amountRef.current.value === '') {
      return setErrorMessage('Please provide an amount');
    }
    if (!bankDetails.account_name || !bankDetails.bank_code || !bankDetails.account_number) {
      toast.error('Please add bank details in your profile.');
      return;
    }
    setErrorMessage('');
    setWithdrawPopup(true);
  };

  const handleConfirmWithdrawal = () => {
    setWithdrawPopup(false);
    setPinPopup(true);
  };

  const handlePinSubmit = () => {
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      return setPinError('Please enter a valid 4-digit PIN');
    }
    setPinError('');
    toast.success('Withdrawal request would be submitted here.');
    setPinPopup(false);
    setPin('');
  };

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(value);
  };

  return (
    <div className="flex flex-col gap-6 lg:p-6">
      <div className="bg-pryClr backdrop-blur-lg rounded-xl p-6 flex flex-col gap-4 shadow-lg border border-accClrYellow/30 transition-all duration-300 hover:shadow-xl hover:bg-pryClr/90">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setToggleBalance(!toggleBalance)}>
          <h3 className="text-lg lg:text-xl font-semibold text-secClrWhite">Wallet Balance</h3>
          {toggleBalance ? (
            <EyeClosed size={20} className="text-secClrBlack" />
          ) : (
            <EyeIcon size={20} className="text-secClrBlack" />
          )}
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-accClrYellow drop-shadow-lg">
            {toggleBalance ? '₦5,000' : '****'}
          </h2>
          <button
            className="bg-accClrPink text-secClrWhite rounded-lg px-6 py-2 text-base lg:text-lg font-semibold hover:bg-accClrPink/90 transition-all duration-300 transform hover:scale-105"
            onClick={() => setToggleWithdraw(!toggleWithdraw)}
          >
            Withdraw
          </button>
        </div>
      </div>

      {toggleWithdraw && (
        <div className="bg-pryClr backdrop-blur-lg rounded-xl p-6 flex flex-col gap-4 shadow-lg border border-accClrYellow/30">
          {bankDetails.account_name && bankDetails.bank_code && bankDetails.account_number ? (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-base lg:text-lg font-semibold text-secClrWhite">Bank Name</label>
                <input
                  type="text"
                  value={bankDetails.bank_name || 'Unknown Bank'}
                  readOnly
                  className="bg-pryClr/60 backdrop-blur-md rounded-lg p-3 text-base text-secClrWhite border border-secClrWhite/30 outline-none opacity-70 cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Account Number</label>
                <input
                  type="text"
                  value={bankDetails.account_number}
                  readOnly
                  className="bg-pryClr/60 backdrop-blur-md rounded-lg p-3 text-base text-secClrWhite border border-secClrWhite/30 outline-none opacity-70 cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Account Name</label>
                <input
                  type="text"
                  value={bankDetails.account_name}
                  readOnly
                  className="bg-pryClr/60 backdrop-blur-md rounded-lg p-3 text-base text-secClrWhite border border-secClrWhite/30 outline-none opacity-70 cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Amount</label>
                <input
                  ref={amountRef}
                  type="text"
                  inputMode="numeric"
                  className="bg-pryClr/60 backdrop-blur-md rounded-lg p-3 text-base text-secClrWhite border border-secClrWhite/30 outline-none focus:ring-2 focus:ring-accClrYellow transition-all duration-300"
                />
                {errorMessage && (
                  <p className="text-sm font-medium text-red-600">{errorMessage}</p>
                )}
              </div>
              <button
                className="bg-accClrYellow text-secClrBlack rounded-lg px-6 py-2 text-base lg:text-lg font-semibold hover:bg-accClrYellow/90 transition-all duration-300 transform hover:scale-105 lg:w-1/3 mx-auto"
                onClick={triggerWithdrawal}
              >
                Confirm Withdrawal
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-base lg:text-lg text-secClrWhite">No bank details provided.</p>
              <button
                className="bg-accClrPink text-secClrWhite rounded-lg px-6 py-2 text-base lg:text-lg font-semibold hover:bg-accClrPink/90 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/profile')}
              >
                Add Bank Details
              </button>
            </div>
          )}
        </div>
      )}

      {withdrawPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-pryClr/90 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl border border-accClrYellow/30 transition-all duration-300 transform scale-95 hover:scale-100 popUpPin">
            <h3 className="text-xl lg:text-2xl font-semibold text-secClrWhite mb-4">Confirm Withdrawal</h3>
            <p className="text-base text-secClrWhite mb-6 leading-relaxed">
              You are about to withdraw <span className="font-bold text-accClrYellow">₦{amountRef.current.value}</span> to{' '}
              <span className="font-bold">{bankDetails.account_name}</span> ({bankDetails.account_number}).
            </p>
            <div className="flex gap-4 justify-center">
              <button
                className="bg-red-500 text-secClrWhite rounded-lg px-6 py-2 text-base font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                onClick={() => setWithdrawPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-accClrPink text-secClrWhite rounded-lg px-6 py-2 text-base font-semibold hover:bg-accClrPink/90 transition-all duration-300 transform hover:scale-105"
                onClick={handleConfirmWithdrawal}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {pinPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-pryClr/40 backdrop-blur-xl rounded-2xl p-8 w-full max-w-sm mx-4 shadow-xl border border-accClrPink/40 transition-all duration-500 transform scale-90 hover:scale-100">
            <h3 className="text-lg lg:text-xl font-semibold text-secClrWhite mb-4">Enter PIN</h3>
            <p className="text-sm text-secClrWhite mb-6">Please enter your 4-digit PIN to confirm the withdrawal.</p>
            <input
              type="text"
              inputMode="numeric"
              value={pin}
              onChange={handlePinChange}
              placeholder="****"
              className="bg-pryClr/60 backdrop-blur-md rounded-lg p-3 w-full text-center text-lg text-secClrWhite border border-accClrYellow/30 outline-none focus:ring-2 focus:ring-accClrYellow transition-all duration-300 placeholder-secClrWhite/50"
              maxLength={4}
            />
            {pinError && (
              <p className="text-sm font-medium text-red-600 mt-2">{pinError}</p>
            )}
            <div className="flex gap-4 justify-center mt-6">
              <button
                className="bg-red-500 text-secClrWhite rounded-lg px-6 py-2 text-base font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  setPinPopup(false);
                  setPin('');
                  setPinError('');
                }}
              >
                Cancel
              </button>
              <button
                className="bg-accClrYellow text-secClrBlack rounded-lg px-6 py-2 text-base font-semibold hover:bg-accClrYellow/90 transition-all duration-300 transform hover:scale-105"
                onClick={handlePinSubmit}
              >
                Submit PIN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdraw;