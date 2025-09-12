import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Upload, ChevronUp, ChevronDown, CheckCircle } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import assets from '../assets/assests';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PS_SK = import.meta.env.VITE_PAYSTACK_SECRET_KEY;

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Current password must be at least 8 characters')
    .required('Current password is required'),
  new_password: Yup.string()
    .min(8, 'New password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'New password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('New password is required'),
  new_password_confirmation: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Profile = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false);
  const [isSavingBankDetails,setIsSavingBankDetails] = useState(false)
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showBankForm, setShowBankForm] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [successPopup, setSuccessPopup] = useState({ show: false, message: '' });
  const {authRequestWithToken,getUserDetails} = useContext(AuthContext);
  const user = getUserDetails();
  const [profile, setProfile] = useState(user);
  const [listOfBanks, setListOfBanks] = useState([]);
  const [isLoadingBanks, setIsLoadingBanks] = useState(false);
  const [isResolvingAccount, setIsResolvingAccount] = useState(false);
  const [bankDetails, setBankDetails] = useState(() => {
    const savedDetails = localStorage.getItem('bankDetails');
    return savedDetails
      ? JSON.parse(savedDetails)
      : { bank_code: '', account_name: '', account_number: '', bank_name: '' };
  });

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

  const handleEditToggle = async () => {
    setIsSaving(true)
    try {
      if (isEditing) {
        const res = await authRequestWithToken("/user/profile",profile,"PUT");
        if (res.success === true) {
          toast.success(res.message);
          setSuccessPopup({
            show: true,
            message: 'Your profile has been updated successfully!',
          });
        }else{
          toast.error(res.message)
        }
      }
      setIsEditing(!isEditing);
    } catch (err) {
      console.log(err)
    } finally{
      setIsSaving(false)
    }
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankSubmit = async (e) => {
    setIsSavingBankDetails(true)
    try {
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
      const res = await authRequestWithToken("/user/profile",profile,"PUT");
      if (res.success === true) {
        toast.success('Bank details saved successfully!', {
          description: 'Your bank details have been updated.',
        });
        setSuccessPopup({
          show: true,
          message: 'Your bank details have been saved successfully!',
        });
      }else{
        toast.error(res.message)
      }
      setShowBankForm(false);
    } catch (error) {
      console.log(error)
    } finally{
      setIsSavingBankDetails(false)
    }
  };

  return (
    <div className="py-12 p-4 md:p-8 rounded-xl mx-auto min-h-screen bg-transparent space-y-6 mb-24 lg:pb-6">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={assets.profile}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-accClrYellow shadow-lg transition-all duration-300 hover:scale-105"
          />
        </div>
      </div>

      <div className="bg-pryClr rounded-2xl p-6 shadow-lg  transition-all duration-300 hover:shadow-xl">
        <div className="space-y-4">
          <div>
            <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={profile.full_name}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className={`w-full p-3 border border-secClrWhite/30 rounded-lg bg-pryClr text-secClrWhite focus:ring-2 focus:ring-accClrYellow transition-all duration-300 ${
                isEditing ? '' : 'opacity-70 cursor-not-allowed'
              }`}
            />
          </div>
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
          <button
            onClick={handleEditToggle}
            className="w-full bg-accClrYellow text-secClrBlack px-4 py-2 rounded-lg font-semibold text-base lg:text-lg hover:bg-accClrYellow/90 transition-all duration-300 transform hover:scale-105"
          >
            {!isEditing ? 'Edit Profile' : isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="bg-pryClr rounded-2xl p-6 shadow-lg  transition-all duration-300 hover:shadow-xl">
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
              {isSavingBankDetails ? "Saving Bank Details...." : "Save Bank Details"}
            </button>
          </form>
        )}
      </div>

      <div className="bg-pryClr rounded-2xl p-6 shadow-lg  transition-all duration-300 hover:shadow-xl">
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
              password: '',
              new_password: '',
              new_password_confirmation: '',
            }}
            validationSchema={PasswordSchema}
            onSubmit={async (values, { resetForm }) => {
              setIsUpdating(true)
              try {
                const res = await authRequestWithToken("/user/change-password",values,"POST");
                if (res.success === true) {
                  toast.success(res.message);
                  setSuccessPopup({
                    show: true,
                    message: 'Your password has been updated successfully!',
                  });
                }else{
                  toast.error(res.message)
                }
                resetForm();
                setShowResetPassword(false);
              } catch (error) {
                console.log(error)
              }finally{
                setIsUpdating(false)
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="mt-4 space-y-4 animate-fade-in">
                <div>
                  <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Current Password</label>
                  <Field
                    type="password"
                    name="password"
                    className={`w-full p-3 bg-pryClr text-secClrWhite border border-secClrWhite/30 rounded-lg focus:ring-2 focus:ring-accClrYellow transition-all duration-300 ${
                      errors.password && touched.password ? 'border-red-600' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm font-medium text-red-600 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-base lg:text-lg font-semibold text-secClrWhite">New Password</label>
                  <Field
                    type="password"
                    name="new_password"
                    className={`w-full p-3 bg-pryClr text-secClrWhite border border-secClrWhite/30 rounded-lg focus:ring-2 focus:ring-accClrYellow transition-all duration-300 ${
                      errors.new_password && touched.new_password ? 'border-red-600' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="new_password"
                    component="p"
                    className="text-sm font-medium text-red-600 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-base lg:text-lg font-semibold text-secClrWhite">Confirm New Password</label>
                  <Field
                    type="password"
                    name="new_password_confirmation"
                    className={`w-full p-3 bg-pryClr text-secClrWhite border border-secClrWhite/30 rounded-lg focus:ring-2 focus:ring-accClrYellow transition-all duration-300 ${
                      errors.new_password_confirmation && touched.new_password_confirmation ? 'border-red-600' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="new_password_confirmation"
                    component="p"
                    className="text-sm font-medium text-red-600 mt-1"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accClrPink text-secClrWhite px-4 py-2 rounded-lg font-semibold text-base lg:text-lg hover:bg-accClrPink/90 transition-all duration-300 transform hover:scale-105"
                >
                  {!isUpdating ? 'Update Password' : 'Updating Password...'}
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
              onClick={() => navigate("/dashboard")}
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