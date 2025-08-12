import { useState } from "react";

import { ForgotEmailScreen } from "./_components/forgot-email-screen";
import { ForgotPasswordScreen } from "./_components/forgot-password-screen";
import { LoginScreen } from "./_components/login-screen";
import { SignUpScreen } from "./_components/signup-screen";

type AuthMode = "login" | "signup" | "forgot-password" | "forgot-email";

export const AuthScreen = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const handleModeChange = (mode: AuthMode) => {
    setAuthMode(mode);
  };

  const toggleLoginSignup = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  const goBackToLogin = () => {
    setAuthMode("login");
  };

  switch (authMode) {
    case "signup":
      return <SignUpScreen onToggleMode={toggleLoginSignup} />;
    case "forgot-password":
      return <ForgotPasswordScreen onGoBack={goBackToLogin} />;
    case "forgot-email":
      return <ForgotEmailScreen onGoBack={goBackToLogin} />;
    default:
      return (
        <LoginScreen
          onToggleMode={toggleLoginSignup}
          onForgotPassword={() => handleModeChange("forgot-password")}
          onForgotEmail={() => handleModeChange("forgot-email")}
        />
      );
  }
};
