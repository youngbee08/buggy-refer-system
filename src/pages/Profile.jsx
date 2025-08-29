import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Upload, ChevronUp, ChevronDown, CheckCircle } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import assets from '../assets/assests';

const PS_SK = import.meta.env.VITE_PAYSTACK_SECRET_KEY;

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8, 'Current password must be at least 8 characters')
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'New password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'New password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showBankForm, setShowBankForm] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [successPopup, setSuccessPopup] = useState({ show: false, message: '' });
  const [profile, setProfile] = useState({
    username: 'Musiliu',
    email: 'musiliu@example.com',
    phone: '07012345678',
    profileImage: localStorage.getItem('profileImage') || assets.profile,
  });
  const [listOfBanks, setListOfBanks] = useState([]);
  const [isLoadingBanks, setIsLoadingBanks] = useState(false);
  const [isResolvingAccount, setIsResolvingAccount] = useState(false);
  const [bankDetails, setBankDetails] = useState(() => {
    const savedDetails = localStorage.getItem('bankDetails');
    return savedDetails
      ? JSON.parse(savedDetails)
      : { bank_code: '', account_name: '', account_number: '', bank_name: '' };
  });
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchApprovedBanks = async () => {
      setIsLoadingBanks(true);
      try {
        const response = await axios.get('https://api.paystack.co/bank');
        if (response.status === 200 && response.data.status) {
          setListOfBanks(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching banks', err);
        toast.error('Error fetching bank list.');
      } finally {
        setIsLoadingBanks(false);
      }
    };
    fetchApprovedBanks();
  }, []);

  useEffect(() => {
    const resolveBankAccount = async () => {
      const { account_number, bank_code } = bankDetails;
      if (bank_code && account_number.length === 10) {
        setIsResolvingAccount(true);
        try {
          const response = await axios.get(
            `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
            {
              headers: { Authorization: `Bearer ${PS_SK}` },
            }
          );
          if (response.data.status) {
            setBankDetails((prev) => ({
              ...prev,
              account_name: response.data.data.account_name,
            }));
          } else {
            setBankDetails((prev) => ({ ...prev, account_name: '' }));
            toast.error(response.data.message || 'Could not resolve account name.');
          }
        } catch (error) {
          setBankDetails((prev) => ({ ...prev, account_name: '' }));
          console.error('Error resolving bank account:', error);
          toast.error('Error resolving bank account. Please check details.');
        } finally {
          setIsResolvingAccount(false);
        }
      } else {
        setBankDetails((prev) => ({ ...prev, account_name: '' }));
      }
    };
    const handler = setTimeout(resolveBankAccount, 500);
    return () => clearTimeout(handler);
  }, [bankDetails.account_number, bankDetails.bank_code]);

  const handleEditToggle = () => {
    if (isEditing) {
      toast.success('Profile updated successfully!');
      setSuccessPopup({
        show: true,
        message: 'Your profile has been updated successfully!',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size must be less than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setProfile((prev) => ({ ...prev, profileImage: reader.result }));
        localStorage.setItem('profileImage', reader.result);
        toast.success('Profile image updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBankSubmit = (e) => {
    e.preventDefault();
    if (!bankDetails.account_name) {
      toast.error('Please verify bank details.');
      return;
    }
    const selectedBank = listOfBanks.find((bank) => bank.code === bankDetails.bank_code);
    const updatedDetails = {
      ...bankDetails,
      bank_name: selectedBank ? selectedBank.name : '',
    };
    setBankDetails(updatedDetails);
    localStorage.setItem('bankDetails', JSON.stringify(updatedDetails));
    toast.success('Bank details saved successfully!', {
      description: 'Your bank details have been updated.',
    });
    setSuccessPopup({
      show: true,
      message: 'Your bank details have been saved successfully!',
    });
    setShowBankForm(false);
  };

  return (
    <div className="py-12 p-4 md:p-8 rounded-xl mx-auto min-h-screen bg-pryClr space-y-6 pb-24 lg:pb-6">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={profileImage || profile.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-accClrYellow shadow-lg transition-all duration-300 hover:scale-105"
          />
          {isEditing && (
            <button
              className="absolute bottom-0 right-0 p-2 bg-accClrPink rounded-full text-secClrWhite hover:bg-accClrPink/80 transition-all duration-300"
              onClick={() => fileInputRef.current.click()}
            >
              <Upload size={20} />
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="bg-pryClr rounded-2xl p-6 shadow-lg border border-accClrYellow transition-all duration-300 hover:shadow-xl">
        <div className="space-y-4">
          <div>
            <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Username</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className={`w-full p-3 border border-secClrWhite/30 rounded-lg bg-pryClr text-secClrWhite focus:ring-2 focus:ring-accClrYellow transition-all duration-300 ${
                isEditing ? '' : 'opacity-70 cursor-not-allowed'
              }`}
            />
          </div>
          <div>
            <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className={`w-full p-3 border border-secClrWhite/30 rounded-lg bg-pryClr text-secClrWhite focus:ring-2 focus:ring-accClrYellow transition-all duration-300 ${
                isEditing ? '' : 'opacity-70 cursor-not-allowed'
              }`}
            />
          </div>
          <div>
            <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className={`w-full p-3 border border-secClrWhite/30 rounded-lg bg-pryClr text-secClrWhite focus:ring-2 focus:ring-accClrYellow transition-all duration-300 ${
                isEditing ? '' : 'opacity-70 cursor-not-allowed'
              }`}
            />
          </div>
          <button
            onClick={handleEditToggle}
            className="w-full bg-accClrYellow text-secClrBlack px-4 py-2 rounded-lg font-semibold text-base lg:text-lg hover:bg-accClrYellow/90 transition-all duration-300 transform hover:scale-105"
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="bg-pryClr rounded-2xl p-6 shadow-lg border border-accClrYellow transition-all duration-300 hover:shadow-xl">
        <button
          onClick={() => setShowBankForm(!showBankForm)}
          className="w-full flex justify-between items-center text-base lg:text-lg font-semibold text-secClrWhite hover:text-accClrYellow transition-all duration-300"
        >
          Bank Upload
          <span>{showBankForm ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
        </button>
        {showBankForm && (
          <form onSubmit={handleBankSubmit} className="mt-4 space-y-4 animate-fade-in">
            <div>
              <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Bank Name</label>
              <select
                name="bank_code"
                value={bankDetails.bank_code}
                onChange={handleBankDetailsChange}
                className="w-full p-3 bg-pryClr/60 backdrop-blur-md rounded-lg text-base text-secClrWhite border border-secClrWhite/30 outline-none focus:ring-2 focus:ring-accClrYellow transition-all duration-300"
                disabled={isLoadingBanks}
              >
                <option value="" className="bg-pryClr text-secClrWhite">
                  {isLoadingBanks ? 'Loading Banks...' : 'Select Bank'}
                </option>
                {listOfBanks.map((bank) => (
                  <option key={bank.id} value={bank.code} className="bg-pryClr text-secClrWhite">
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Account Number</label>
              <input
                name="account_number"
                type="text"
                inputMode="numeric"
                value={bankDetails.account_number}
                onChange={handleBankDetailsChange}
                className="w-full p-3 bg-pryClr/60 backdrop-blur-md rounded-lg text-base text-secClrWhite border border-secClrWhite/30 outline-none focus:ring-2 focus:ring-accClrYellow transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Account Name</label>
              <input
                name="account_name"
                type="text"
                value={isResolvingAccount ? 'Resolving...' : bankDetails.account_name}
                readOnly
                className="w-full p-3 bg-pryClr/60 backdrop-blur-md rounded-lg text-base text-secClrWhite border border-secClrWhite/30 outline-none opacity-70 cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accClrPink text-secClrWhite px-4 py-2 rounded-lg font-semibold text-base lg:text-lg hover:bg-accClrPink/90 transition-all duration-300 transform hover:scale-105"
            >
              Save Bank Details
            </button>
          </form>
        )}
      </div>

      <div className="bg-pryClr rounded-2xl p-6 shadow-lg border border-accClrYellow transition-all duration-300 hover:shadow-xl">
        <button
          onClick={() => setShowResetPassword(!showResetPassword)}
          className="w-full flex justify-between items-center text-base lg:text-lg font-semibold text-secClrWhite hover:text-accClrYellow transition-all duration-300"
        >
          Reset Password
          <span>{showResetPassword ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
        </button>
        {showResetPassword && (
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={PasswordSchema}
            onSubmit={(values, { resetForm }) => {
              toast.success('Password updated successfully!');
              setSuccessPopup({
                show: true,
                message: 'Your password has been updated successfully!',
              });
              resetForm();
              setShowResetPassword(false);
            }}
          >
            {({ errors, touched }) => (
              <Form className="mt-4 space-y-4 animate-fade-in">
                <div>
                  <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Current Password</label>
                  <Field
                    type="password"
                    name="currentPassword"
                    className={`w-full p-3 bg-pryClr text-secClrWhite border border-secClrWhite/30 rounded-lg focus:ring-2 focus:ring-accClrYellow transition-all duration-300 ${
                      errors.currentPassword && touched.currentPassword ? 'border-red-600' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="p"
                    className="text-sm font-medium text-red-600 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-base lg:text-lg font-semibold text-secClrWhite">New Password</label>
                  <Field
                    type="password"
                    name="newPassword"
                    className={`w-full p-3 bg-pryClr text-secClrWhite border border-secClrWhite/30 rounded-lg focus:ring-2 focus:ring-accClrYellow transition-all duration-300 ${
                      errors.newPassword && touched.newPassword ? 'border-red-600' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="p"
                    className="text-sm font-medium text-red-600 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Confirm New Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className={`w-full p-3 bg-pryClr text-secClrWhite border border-secClrWhite/30 rounded-lg focus:ring-2 focus:ring-accClrYellow transition-all duration-300 ${
                      errors.confirmPassword && touched.confirmPassword ? 'border-red-600' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-sm font-medium text-red-600 mt-1"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accClrPink text-secClrWhite px-4 py-2 rounded-lg font-semibold text-base lg:text-lg hover:bg-accClrPink/90 transition-all duration-300 transform hover:scale-105"
                >
                  Update Password
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>

      {successPopup.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-pryClr/90 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl border border-accClrYellow/30 transition-all duration-300 transform scale-95 hover:scale-100">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle size={24} className="text-accClrYellow" />
              <h3 className="text-xl lg:text-2xl font-semibold text-secClrWhite">Success</h3>
            </div>
            <p className="text-base text-secClrWhite mb-6 leading-relaxed">{successPopup.message}</p>
            <button
              className="w-full bg-accClrPink text-secClrWhite px-4 py-2 rounded-lg font-semibold text-base lg:text-lg hover:bg-accClrPink/90 transition-all duration-300 transform hover:scale-105"
              onClick={() => setSuccessPopup({ show: false, message: '' })}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;