import { useState } from "react";

import { LoginScreen } from "./_components/LoginScreen";
import { SignUpScreen } from "./_components/SignUpScreen";

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
