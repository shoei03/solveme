import React, { useState } from "react";
import { LoginScreen } from "./LoginScreen";
import { SignUpScreen } from "./SignUpScreen";

export const AuthScreen: React.FC = () => {
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
