import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import "../../Auth/auth.css";
import logo from "../../../assets/Images/logo.svg";
import axios from "axios";
import { Loader } from "../../Loader/Loader";

const VerifyAccount = () => {
  const token = localStorage.getItem("token");
  const [isloading, setIsloading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const id = user?.id;
  const userEmail = user?.email;

  const initialValues = {
    code: ["", "", "", ""],
  };

  const validationSchema = Yup.object().shape({
    code: Yup.array()
      .of(Yup.string().length(1, "Must be exactly 1 character"))
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    // Handle form submission here OTP

    const { code } = values;
    const verifyCode = code.join("");

    try {
      setIsloading(true);
      const response = await axios.post(
        `https://srv475086.hstgr.cloud/api/user/confirm-email/`,
        { user_id: id, otp: verifyCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data;
      setIsloading(false);
      toast.success("تم تاكيد البريد الالكتروني ");
      navigate("/control");
      window.location.reload();
    } catch (error) {
      setIsloading(false);
      toast.error(error.response.data.message);
    }
  };
  const [timer, setTimer] = useState(59);
  const resentCode = async () => {
    try {
      setTimer(59);
      //Resend OTP
      setIsloading(true);
      const response = await axios.post(
        `https://srv475086.hstgr.cloud/api/user/resend-otp/`,
        { email: userEmail }
      );
      setIsloading(false);
      const resData = response.data;
      toast.success("تم  ارسال الرقم ");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    //Get user data
    async function getUserData() {
      const getUserData = await axios.get(
        `https://srv475086.hstgr.cloud/api/userinfo/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = getUserData.data;
      setUser(userData);
    }
    getUserData();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(countdown);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [timer]); // Added timer as a dependency

  // useEffect to handle timerFinished
  useEffect(() => {
    if (timer === 0) {
      setTimerFinished(true);
    }
  }, [timer]);

  return (
    <section
      className="d-flex  justify-content-center align-items-center ar bg-white   "
      dir="rtl">
      <div className=" py-5 d-flex flex-column justify-content-center  align-items-center  col-xl-4 col-lg-6 col-12 ">
        <LazyLoadImage
          alt={"hi"}
          effect="blur"
          src={logo}
          className="h-100 img_xxl"
          opacity="true"
          placeholderSrc={logo}
        />
        <h2 className="mt-5 text-move fw-bolder mt-1 text-move">
          التحقق من الحساب
        </h2>
        <p
          style={{ fontSize: "15px", width: "75%" }}
          className="text-move fw-normal mt-1 text-center">
          لقد تم إرسال الكود إلى
          <span className=" px-1 text-move fw-normal  "> {userEmail} </span>
          أدخل كود التحقق هنا
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="d-flex flex-column justify-content-between w-100 px-5 h-75 ">
              <div className=" d-flex flex-column justify-content-center text-center">
                <label
                  htmlFor="code"
                  className=" mb-2 fs_auth fw-bold  text-move">
                  ادخل الكود{" "}
                </label>
                <div
                  dir="ltr"
                  className="d-flex gap-2 w-100 justify-content-center">
                  {initialValues.code.map((_, index) => (
                    <Field
                      key={index}
                      id={`code-${index}`}
                      name={`code[${index}]`}
                      type="text"
                      maxLength="1"
                      className="input_style_auth text-center"
                      style={{ width: "15%" }}
                    />
                  ))}
                </div>
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-danger"
                />
                <div className=" text-danger">{message}</div>
                <p className=" text-move fw-normal mt-5 text-center ">
                  لم تستلم الكود؟
                  {timerFinished && (
                    <button
                      style={{
                        backgroundColor: "white",
                        border: "none",
                        color: "#001b79",
                      }}
                      type="button"
                      className={`text-move  fw-normal pe-1 ${
                        timer > 1 && "d-none"
                      }`}
                      // to="/verifyaccount"
                      onClick={() => resentCode()}>
                      إعادة الإرسال
                    </button>
                  )}
                </p>
                <p className="text-move fw-normal  text-center">
                  إعادة ارسال الكود في خلال 00:
                  {timer < 10 ? `0${timer}` : timer}
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ background: "#ed5ab3", border: "1px" }}
                className=" btn-move fs_auth">
                {isSubmitting ? <Loader /> : "التحقق من الحساب"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default VerifyAccount;
