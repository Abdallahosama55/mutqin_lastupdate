import "./App.css";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignIn from "./components/Auth/SignIn/SignIn";
import AppLayoutmot from "./Util/dashboardLayout/AppLayoutmot";
import MyAccount from "./pages/MyAccount/Myaccount";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import VerifyAccount from "./components/Auth/VerifyAccount/VerifyAccount";
import NewPassword from "./components/Auth/NewPassword/NewPassword";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import CreateArticle from "./pages/Create-article";
import { Toaster } from "react-hot-toast";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import Protection from "./components/Auth/Protection/Protection";
import MyPlan from "./pages/MyPlan/MyPlan";
import CreateImage from "./pages/Create-Image/CreateImage";

import { useLocation } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import CheckAndRedirect from "./helpers/CheckAndRedirect";
import EditorPage from "./pages/Editor";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { actionsTypes } from "./helpers/constants";
import { getCurrentUser } from "./redux/features/api/userSlice";
import { Spinner } from "react-bootstrap";
import EndTrial from "./components/EndTrial";
import Control from "./pages/ControlPanal/Control";
import Reformulate from "./pages/Reformulate/Reformulate";
import ContentSection from "./pages/Content-Section";
import Add_Ads from "./pages/Add-Ads";
import ChatLayout from "./pages/chat/ChatLayout";
import Welcome from "./pages/chat/welcome";
import NormalChat from "./pages/chat/normal-chat";

function App() {
  const token = localStorage.getItem("token");
  const [showChat, setShowChat] = useState(0);
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <WrapperComponent>
            <Routes>
              <Route>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/verifyaccount" element={<VerifyAccount />} />
                <Route path="/newpassword" element={<NewPassword />} />
                <Route path="/newpassword/:id" element={<NewPassword />} />

                <Route
                  element={
                    !token ? (
                      <SignIn />
                    ) : (
                      <Protection>
                        <AppLayoutmot />
                      </Protection>
                    )
                  }
                >
                  {/* <Route
                index
                path="/myaccount"
                element={<MyAccount />}
              /> */}
                  <Route path="/control" element={<Control />} />
                  <Route path="/content-section" element={<ContentSection />} />
                  <Route path="/add-ads/:slug" element={<Add_Ads />} />
                  <Route path="/reformulate" element={<Reformulate />} />
                  <Route path="/create-article" element={<CreateArticle />} />
                  <Route path="/create-image" element={<CreateImage />} />
                  <Route path="/editor" element={<EditorPage />} />
                  <Route path="/editor/:id" element={<EditorPage />} />
                  <Route path="/myplan" element={<MyPlan />} />
                  <Route
                    path="*"
                    element={<Navigate replace to="/control" />}
                  />
                </Route>
                <Route
                  element={
                    !token ? (
                      <SignIn />
                    ) : (
                      <Protection>
                        <Layout />
                      </Protection>
                    )
                  }
                >
                  <Route path="/detector" element={<CheckAndRedirect />} />

                  <Route path="/detector/:id" element={<Home />} />
                  <Route path="/detector" element={<Home />} />
                </Route>
                <Route
                  element={
                    !token ? (
                      <SignIn />
                    ) : (
                      <Protection>
                        <Layout />
                      </Protection>
                    )
                  }
                >
                  <Route index path="/myaccount" element={<MyAccount />} />
                </Route>
              </Route>
              <Route path={"/chat"} element={<ChatLayout />}>
                <Route index element={<Welcome />} />
                <Route path={":chatId"} element={<NormalChat />} />
              </Route>
            </Routes>
          </WrapperComponent>
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;

const WrapperComponent = ({ children }) => {
  const pathname = useLocation();

  const dispatch = useAppDispatch();
  const closePanel = () => {
    dispatch({ type: actionsTypes.TOGGLE_HISTORY_PANEL_FALSE });
  };
  const state = useAppSelector((state) => state);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    !state.user.username && dispatch(getCurrentUser());
    closePanel();
    setLoading(false);
  }, [pathname]);
  const [endTrial, setEndTrial] = useState(false);

  useEffect(() => {
    if (
      state.checker.text.split(" ").length - 1 > 2500 &&
      state.user.subscription_plan === "Free"
    ) {
      setEndTrial(true);
    }
  }, [state.checker.text]);
  if (loading) return <Spinner />;

  return (
    <>
      <EndTrial onClose={() => setEndTrial(false)} show={endTrial} />
      {children}
    </>
  );
};
