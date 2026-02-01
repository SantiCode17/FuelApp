import React, { useEffect, useRef } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onHide: () => void;
}

const toastConfig: Record<ToastType, { icon: keyof typeof Ionicons.glyphMap; bgColor: string; iconColor: string }> = {
  success: { icon: "checkmark-circle", bgColor: "bg-emerald-500/20", iconColor: "#10B981" },
  error: { icon: "close-circle", bgColor: "bg-rojo-400/20", iconColor: "#A82001" },
  warning: { icon: "warning", bgColor: "bg-naranja-400/20", iconColor: "#F59002" },
  info: { icon: "information-circle", bgColor: "bg-amarillo-400/20", iconColor: "#FCE902" },
};

export function Toast({ visible, message, type = "info", duration = 3000, onHide }: ToastProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  };

  if (!visible) return null;

  const config = toastConfig[type];

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: insets.top + 10,
        left: 16,
        right: 16,
        zIndex: 9999,
        transform: [{ translateY }],
        opacity,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={hideToast}
        className={`flex-row items-center p-4 rounded-2xl ${config.bgColor} border border-border bg-surface`}
      >
        <View className="w-10 h-10 rounded-xl bg-surface-light items-center justify-center">
          <Ionicons name={config.icon} size={22} color={config.iconColor} />
        </View>
        <Text className="flex-1 text-text-primary font-medium ml-3 text-sm leading-5">
          {message}
        </Text>
        <TouchableOpacity onPress={hideToast} className="p-1">
          <Ionicons name="close" size={18} color="#71717A" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}
