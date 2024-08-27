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
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import InputBox from "components/Input box";
import { useFormik } from "formik";
import { Button, Grid } from "@mui/material";
import { postRequest } from "services/axios-api-request/axios_api_Request";
import toaster from "utility/toaster/toaster";
import routerConstants from "constants/routerConstants";
import Loader from "components/loader/Loader";
import { apiurl } from "constants/apiURLsConstants";
import '../../../assets/css/global-style.scss';
import { resetPasswordSchema } from "services/yup-validation-schemas";
import axios from "axios";
import { stringToBoolean } from "utility/common";

// Image
const bgImage =
  "https://img.freepik.com/free-photo/pieces-blue-stationery_23-2148169528.jpg?t=st=1721905050~exp=1721908650~hmac=ec01f973f950f2b72a22c0b234c08bad29b3b07080efe09b28d3411b1eff4a1f&w=1380";


const initialValues = {
  resetPassword: "",
  confirmPassword: "",
};

function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  // *******************For Auth gaurd *******************
  useEffect(() => {
    const otpToken = localStorage.getItem("OTP_TOKEN");
    const isTokenTypeOTP = localStorage.getItem("IS_TOKEN_TYPE_OTP");

    // Define routes that require OTP_TOKEN to be present
    const protectedRoutes = [
      routerConstants?.otpVerifyRoute,
      routerConstants?.resetPasswordRoute,
    ];
    // Check if the current route is in the protected routes
    const isProtectedRoute = protectedRoutes.includes(location.pathname);

    if (isProtectedRoute && otpToken && stringToBoolean(isTokenTypeOTP)) {
      navigate(routerConstants?.otpVerifyRoute)
    }

  }, []);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: resetPasswordSchema,
      onSubmit: (values, action) => {
        setIsLoading(true);
        handleResetPassword(values, action);
      },
    });


  const POST_for_Reset_password = async (url, data) => {
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

  const handleResetPassword = async (values, action) => {
    const { resetPassword } = values;
    const res = await POST_for_Reset_password(`${process.env.REACT_APP_BASE_URL_DEV}${apiurl?.RESET_PASSWORD_URL}`, { newPassword: resetPassword })
    if (res?.data?.success) {
      setIsLoading(false);
      localStorage.clear()
      toaster('success', res?.data?.message)
      navigate(routerConstants?.loginRoute)
    }
    else {
      toaster('error', res?.data?.message)
      setIsLoading(false);
    }
  }

  return (
    <IllustrationLayout
      title="Reset Password"
      description=""
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <form onSubmit={handleSubmit}>
        <ArgonBox mb={2}>
          <Grid className='add-edit-screen-input-container' width={'100%'}>
            <p>New Password</p>
            <InputBox
              placeholder={'Enter New Password'}
              name={'resetPassword'}
              id={'resetPassword-input-resetPassword'}
              type={'password'}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.resetPassword}
              maxLength={30}
            />
            {errors.resetPassword && touched.resetPassword ? (
              <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.resetPassword.length <= 60) ? '-2px' : '15px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.resetPassword}</p></Grid>
            ) : null}
          </Grid>
        </ArgonBox>

        <ArgonBox mb={2}>
          <Grid className='add-edit-screen-input-container' width={'100%'}>
            <p>Confirm Password</p>
            <InputBox
              placeholder={'Enter Password'}
              name={'confirmPassword'}
              id={'resetPassword-input-confirmPassword'}
              type={'password'}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.confirmPassword}
              maxLength={30}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.confirmPassword.length <= 60) ? '-2px' : '15px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.confirmPassword}</p></Grid>
            ) : null}
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
            {!isLoading ? 'Reset Password' : <Loader dotsColor={'white'} />}
          </ArgonButton>
        </ArgonBox>

        <ArgonBox mt={4} mb={1}>
          <ArgonButton
            component={Button}
            variant="outlined"
            size="large"
            color={'info'}
            type={'button'}
            fullWidth
            disableHover={true}
            onClick = {()=>navigate(routerConstants?.loginRoute)}
          >
            {'Back To Login'}
          </ArgonButton>
        </ArgonBox>

      </form>
    </IllustrationLayout>
  );
}

export default ResetPassword;
