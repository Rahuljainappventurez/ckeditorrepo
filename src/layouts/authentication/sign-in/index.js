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

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import InputBox from "components/Input box";
import { useFormik } from "formik";
import { loginSchema } from "services/yup-validation-schemas";
import { Button, Grid } from "@mui/material";
import { postRequest } from "services/axios-api-request/axios_api_Request";
import toaster from "utility/toaster/toaster";
import routerConstants from "constants/routerConstants";
import Loader from "components/loader/Loader";
import { apiurl } from "constants/apiURLsConstants";
import '../../../assets/css/global-style.scss';

// Image
const bgImage =
  "https://img.freepik.com/free-photo/pieces-blue-stationery_23-2148169528.jpg?t=st=1721905050~exp=1721908650~hmac=ec01f973f950f2b72a22c0b234c08bad29b3b07080efe09b28d3411b1eff4a1f&w=1380";


const initialValues = {
  email: "",
  password: "",
  deviceId: "1234567789675",
  deviceToken: "3455788",
  deviceType: "os",
};

function Illustration() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        setIsLoading(true);
        handleLogin(values, action);
      },
    });

  const handleLogin = async (values, action) => {
    const res = await postRequest(apiurl?.LOGIN_URL, values)
    if (res?.data?.success) {
      setIsLoading(false);
      const userData = {
        email: res?.data?.result?.email,
        name: res?.data?.result?.name,
        role: res?.data?.result?.role,
      }
      localStorage.setItem('user_data', JSON.stringify(userData))
      localStorage.setItem('ACCESS_TOKEN', res?.data?.result?.token)
      toaster('success', res?.data?.message)
      navigate(routerConstants?.dashboardRoute)
    }
    else {
      toaster('error', res?.data?.message)
      setIsLoading(false);
      // action.resetForm();
    }
  }

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <form onSubmit={handleSubmit}>
        <ArgonBox mb={2}>
          <InputBox
            placeholder={'Enter Email'}
            name={'email'}
            id={'login-input-email'}
            type={'text'}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email ? (
            <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.email.length <= 60) ? '8px' : '15px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.email}</p></Grid>
          ) : null}
        </ArgonBox>
        <ArgonBox mb={2}>
          <InputBox
            placeholder={'Enter Password'}
            name={'password'}
            id={'login-input-password'}
            type={'password'}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.password}
            maxLength={30}
          />
          {errors.password && touched.password ? (
            <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.password.length <= 60) ? '8px' : '22px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.password}</p></Grid>
          ) : null}
        </ArgonBox>

        <Grid display={'flex'} justifyContent={'space-between'}>
          <ArgonBox display="flex" alignItems="center">
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <ArgonTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;Remember me
            </ArgonTypography>
          </ArgonBox>

          <Link to={routerConstants?.forgotRoute}>
            <span className="sign-in-forgot-password-text">
              Forgot password?
            </span>
          </Link>

        </Grid>

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
            {!isLoading ? 'Sign In' : <Loader dotsColor={'white'} />}
          </ArgonButton>
        </ArgonBox>

      </form>
    </IllustrationLayout>
  );
}

export default Illustration;
