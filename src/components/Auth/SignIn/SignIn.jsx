import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../Auth/auth.css";
import logo from "../../../assets/Images/logo.svg";
import google from "../../../assets/Images/google.png";

import { Link } from "react-router-dom";
import { SiFacebook } from "react-icons/si";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../Loader/Loader";

const SignIn = () => {
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const [errorSignIn, setErrorSignIn] = useState("");
  const emailFromLocal = localStorage.getItem("email");
  const passwordFromLocal = localStorage.getItem("password");
  const token = localStorage.getItem("token");
  const [checkBoxValue, setCHeckBoxValue] = useState(false);
  const [searchParams] = useSearchParams();
  console.log("searchParams", searchParams);
  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    if (accessToken) {
      localStorage.setItem("token", accessToken);
      // localStorage.setItem("refreshToken", refreshToken);
      // You might navigate using your preferred method here
      navigate("/control");
      window.location.reload(); // Redirect to the control page
    }
  }, [searchParams]);
  // const urlParams = new URLSearchParams(location.hash.substring(1));
  // const accessToken = urlParams.get("access_token");
  // const refreshToken = urlParams.get("refresh_token");

  // // Use accessToken and refreshToken as needed
  // console.log("Access Token:", accessToken);
  // console.log("Refresh Token:", refreshToken);
  // if (accessToken) {
  //   localStorage.setItem("token", accessToken);
  //   navigate("/control");
  //   window.location.reload();
  // }

  const errorMessage = (error) => {
    console.log(error);
  };
  // const loginWithGoogle = () => {
  //   signIn().catch((error) => {
  //     if (error.error === "popup_closed_by_user") {
  //       // User closed the Google OAuth popup
  //       // Provide feedback to the user or offer an alternative sign-in method
  //       toast.error("لقد قمت بإغلاق نافذة تسجيل الدخول بواسطة جوجل");
  //     } else {
  //       // Handle other errors
  //       console.error("Google OAuth error:", error);
  //     }
  //   });
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("الأيميل غير صالح").required("ادخل الايميل"),
      password: Yup.string().required("ادخل الباسورد"),
    }),
    onSubmit: async (values) => {
      try {
        setIsloading(true);
        const response = await axios.post(
          `https://srv475086.hstgr.cloud/api/user/login/`,
          values
        );

        // Assuming the response contains user data
        const userData = response.data;
        const tokenKey = userData.tokens.access;

        // Save token to localStorage
        if (checkBoxValue) {
          localStorage.setItem("email", values.email);
          localStorage.setItem("password", values.password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }
        console.log("user Info", response.data);
        localStorage.setItem("token", tokenKey);
        console.log("userData?.is_active", userData?.is_active);
        // if (!userData.is_active) {
        //   navigate("/verifyaccount");
        // }
        setIsloading(false);
        toast.success("تم التسجيل بنجاح");

        navigate("/control");
        window.location.reload();
      } catch (error) {
        setIsloading(false);
        // Handle error
        // console.log(error.response.data.message);
        toast.error(error.response.data.message);

        if (error.response.data.message === "يرجي تفعيل البريد الالكتروني") {
          navigate("/verifyaccount");
          try {
            //Resend OTP
            const response = await axios.post(
              `https://srv475086.hstgr.cloud/api/user/resend-otp/`,
              { email: values.email }
            );
            const resData = response.data;
            toast.success("تم  ارسال الرقم ");
          } catch (error) {
            toast.error(error.response.data.message);
          }
        }
        // setErrorSignIn("يوجد خطأ بالايميل او الباسورد");
      }
    },
  });

  return (
    <section
      className="d-flex justify-content-center align-items-center ar bg-white "
      dir="rtl">
      <div className="d-flex flex-column justify-content-center  align-items-center  col-xl-4 col-lg-6 col-12 h_vh_IN">
        <LazyLoadImage
          alt={"hi"}
          effect="blur"
          src={logo}
          className="h-100 img_xxl"
          opacity="true"
          placeholderSrc={logo}
        />
        <form
          className="mt-5 d-flex flex-column gap-1 align-content-end w-100 px-5  gap-2"
          onSubmit={formik.handleSubmit}>
          <label
            htmlFor="email"
            className=" fs_auth fw-bold  text-move">
            بريدك الألكتروني{" "}
          </label>
          <input
            id="email"
            type="text"
            className="input_style_auth"
            placeholder="البريد الإلكتروني"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
          <label
            htmlFor="password"
            className="fs_auth fw-bold  text-move">
            كلمة المرور
          </label>
          <span className=" span_input">
            <input
              id="password"
              type="password"
              className="input_style_auth"
              placeholder="كلمة المرور"
              {...formik.getFieldProps("password")}
            />
          </span>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
          <div className="form-check fw-bold  text-move">
            <input
              className="form-check-input"
              type="checkbox"
              value={checkBoxValue}
              onChange={() => setCHeckBoxValue(!checkBoxValue)}
              id="flexCheckDefault"
            />
            <label
              className="form-check-label fs_auth"
              htmlFor="flexCheckDefault">
              تذكرني
            </label>
          </div>
          <div className=" text-center text-danger">{errorSignIn}</div>
          <button
            type="submit"
            className="button_auth fs_auth"
            style={{ background: "#ed5ab3", border: "1px" }}>
            {isloading ? <Loader /> : "تسجيل الدخول"}
          </button>
        </form>
        <p className=" fw-normal my-2  text-muted ">أو الدخول بواسطة</p>

        <div className="d-flex flex-column gap-3 align-content-end w-100 px-5  gap-2">
          <Link
            to="https://srv475086.hstgr.cloud/api/google-login"
            className="button_auth fs_auth text-decoration-none bg-white"
            // target="_blank"
            rel="noopener noreferrer">
            <button
              className="bg-white"
              style={{ position: "relative", color: "#001b79" }}>
              دخول بواسطة جوجل
              <LazyLoadImage
                alt={"hi"}
                effect="blur"
                src={google}
                className="h-100"
                opacity="true"
                placeholderSrc={google}
              />
            </button>
          </Link>

          <button className="button_auth fs_auth">
            دخول بواسطة فيس بوك
            <SiFacebook className=" white fs-5" />
          </button>
        </div>
        <Link
          to="/forgotpassword"
          className="mt-4 fs-6 text-black-50 ">
          فقدت كلمة المرور الخاصة بك؟
        </Link>

        <span className="mt-4 d-flex gap-2">
          <p className=" fs-6 text-black-50">ليس لديك حساب؟</p>
          <Link
            to="/signup"
            className="fs-6 fw-bolder  text-move    ">
            إنشاء حساب
          </Link>
        </span>
      </div>
    </section>
  );
};

export default SignIn;

// function Loader() {
//   return (
//     <div className="text-center">
//       <div
//         className="spinner-border"
//         role="status">
//         <span className="visually-hidden">Loading...</span>
//       </div>
//     </div>
//   );
// }
