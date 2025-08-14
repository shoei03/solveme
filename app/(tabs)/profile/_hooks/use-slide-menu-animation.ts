import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing } from "react-native";

interface UseSlideMenuAnimationProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

interface UseSlideMenuAnimationReturn {
  slideAnimation: Animated.Value;
  opacityAnimation: Animated.Value;
  showModal: boolean;
}

export const useSlideMenuAnimation = ({
  isVisible,
  onAnimationComplete,
}: UseSlideMenuAnimationProps): UseSlideMenuAnimationReturn => {
  // スライドアニメーション用
  const slideAnimation = useRef(
    new Animated.Value(Dimensions.get("window").width)
  ).current;
  // フェードイン・アウトのアニメーション用
  const opacityAnimation = useRef(new Animated.Value(0)).current;
  // モーダルの表示状態
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowModal(true);
      // 少し遅延させてModalが完全に表示されてからアニメーションを開始
      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 350,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnimation, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onAnimationComplete?.();
        });
      });
    } else {
      Animated.parallel([
        Animated.timing(slideAnimation, {
          toValue: Dimensions.get("window").width,
          duration: 300,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowModal(false);
        onAnimationComplete?.();
      });
    }
  }, [isVisible, slideAnimation, opacityAnimation, onAnimationComplete]);

  return {
    slideAnimation,
    opacityAnimation,
    showModal,
  };
};
