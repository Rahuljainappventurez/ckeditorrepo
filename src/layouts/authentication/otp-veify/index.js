/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useLocation, useNavigate } from "react-router-dom";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import { useFormik } from "formik";
import { Button, Grid } from "@mui/material";
import { postRequest } from "services/axios-api-request/axios_api_Request";
import toaster from "utility/toaster/toaster";
import routerConstants from "constants/routerConstants";
import Loader from "components/loader/Loader";
import { apiurl } from "constants/apiURLsConstants";
import '../../../assets/css/global-style.scss';
import OTPInput from "react-otp-input";
import { otpVerifySchema } from "services/yup-validation-schemas";
import { inputNumbersOnly } from "utility/common";
import axios from "axios";
import { stringToBoolean } from "utility/common";

// Image
const bgImage =
  "https://img.freepik.com/free-photo/pieces-blue-stationery_23-2148169528.jpg?t=st=1721905050~exp=1721908650~hmac=ec01f973f950f2b72a22c0b234c08bad29b3b07080efe09b28d3411b1eff4a1f&w=1380";


const initialValues = {
  otp: "",
};

function OTPVerification() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isTimerEnd, setIsTimerEnd] = useState(false);
  // ************** otp timer in seconds default 60s *******************
  const [resendTimer, setResendTimer] = useState(60);
  const userEmail = localStorage.getItem('user_email');


  // *******************For Auth gaurd *******************
  useEffect(() => {
    const otpToken = localStorage.getItem("OTP_TOKEN");
    const isTokenTypeOTP = localStorage.getItem("IS_TOKEN_TYPE_OTP");

    console.log(stringToBoolean(isTokenTypeOTP), 'ebfeubu3br3ubu')

    // Define routes that require OTP_TOKEN to be present
    const protectedRoutes = [
      routerConstants?.otpVerifyRoute,
      routerConstants?.resetPasswordRoute,
    ];
    // Check if the current route is in the protected routes
    const isProtectedRoute = protectedRoutes.includes(location.pathname);

    if (isProtectedRoute && otpToken && !stringToBoolean(isTokenTypeOTP)) {
      navigate(routerConstants?.resetPasswordRoute)
    }
  }, []);


  // ****************For real time timer change for resend otp**********************
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    } else {
      setIsTimerEnd(true);
    }

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [resendTimer]);

  // Function to format time in "mm:ss"
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


  // **************** formik to handle form ***************
  const { values, handleSubmit, setFieldValue, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: otpVerifySchema,
      onSubmit: (values, action) => {
        setIsLoading(true);
        handleVerifyOtp(values, action);
      },
    });


  // *************** for POST request *************
  const POST_for_OTP_Verify = async (url, data) => {
    try {
      const res = await axios.post(url, data, {
        headers: {
          "X-API-KEY": process.env.REACT_APP_API_KEY,
          "Authorization": `Bearer ${localStorage.getItem('OTP_TOKEN')}`,
        }
      });
      return res;
    } catch (error) {
      return error?.response;
    }
  };

  // *************** for verify otp  *************
  const handleVerifyOtp = async (values, action) => {
    const data = {
      otp: values?.otp,
      email: userEmail,
    }

    const res = await POST_for_OTP_Verify(`${process.env.REACT_APP_BASE_URL_DEV}${apiurl?.VERIFY_OTP_URL}`, data)

    if (res?.data?.success) {
      setIsLoading(false);
      localStorage.setItem('TOKEN_TYPE', 'reset-password')
      localStorage.setItem('IS_TOKEN_TYPE_OTP', false)
      toaster('success', res?.data?.message)
      navigate(routerConstants?.resetPasswordRoute)
    }
    else {
      toaster('error', res?.data?.message)
      setIsLoading(false);
    }
  }

  // *************** for resend otp  *************
  const handleResendOtp = async () => {
    const { data } = await POST_for_OTP_Verify(`${process.env.REACT_APP_BASE_URL_DEV}${apiurl?.RESEND_OTP_URL}`, { email: userEmail });
    if (data?.success) {
      toaster('success', data?.message)
    }
    else {
      toaster('error', data?.message)
    }
  }

  return (
    <IllustrationLayout
      title="OTP Verification"
      description={`Enter the OTP sent to ${userEmail}`}
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <form onSubmit={handleSubmit}>

        <ArgonBox mb={2}>
          <OTPInput
            value={values?.otp}
            onChange={(otp) => setFieldValue('otp', otp)}
            numInputs={6}
            renderSeparator={<span className="otp-separator">-</span>}
            inputType={'text'}
            renderInput={(props) => <input {...props} className="otp-input" onKeyDown={inputNumbersOnly} />}
            // placeholder = {'123456'}
            // shouldAutoFocus={true}
            containerStyle='OTP-container'
          />
          {errors.otp && touched.otp ? (
            <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.otp.length <= 60) ? '8px' : '15px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.otp}</p></Grid>
          ) : null}
        </ArgonBox>

        <ArgonBox mb={2}>
          <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} rowGap={'0px'} columnGap={'20px'}>
            <p style={{ fontSize: '14px', minWidth: '158px' }}>Didn't receive any code?</p>
            <button
              type="button"
              disabled={!isTimerEnd}
              style={{
                fontSize: '14px',
                display: `${!isTimerEnd ? 'none' : ''}`,
                textDecoration: 'underline',
                textTransform: 'uppercase',
                cursor: `${!isTimerEnd ? 'default' : 'pointer'}`,
                border: 'none',
                background: 'none',
                color: `${!isTimerEnd ? 'rgb(175 187 190)' : '#11cdef'}`,
              }}
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>

            <p style={{ fontSize: '14px', minWidth: '170px', display: `${isTimerEnd ? 'none' : ''}` }}>{`Request new OTP in ${formatTime(resendTimer)}`}</p>
          </Grid>
        </ArgonBox>

        <ArgonBox mt={4} mb={1}>
          <ArgonButton
            component={Button}
            variant="gradient"
            size="large"
            color={'info'}
            type={!isLoading ? 'submit' : 'button'}
            fullWidth
            disableHover={true}
          >
            {!isLoading ? 'Submit' : <Loader dotsColor={'white'} />}
          </ArgonButton>
        </ArgonBox>

      </form>
    </IllustrationLayout>
  );
}

export default OTPVerification;
