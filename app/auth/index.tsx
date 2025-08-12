import { useState } from "react";

import { LoginScreen } from "./_components/login-screen";
import { SignUpScreen } from "./_components/signup-screen";

export const AuthScreen = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return isLoginMode ? (
    <LoginScreen onToggleMode={toggleMode} />
  ) : (
    <SignUpScreen onToggleMode={toggleMode} />
  );
};
