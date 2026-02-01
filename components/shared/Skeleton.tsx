import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, ViewStyle } from "react-native";

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ 
  width = "100%", 
  height = 20, 
  borderRadius = 8,
  style 
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: "#2A2A3A",
          opacity,
        },
        style,
      ]}
    />
  );
}

export function StationCardSkeleton() {
  return (
    <View className="bg-surface rounded-3xl p-5 border border-border mb-3">
      <View className="flex-row items-start">
        <Skeleton width={56} height={56} borderRadius={16} />
        <View className="flex-1 ml-4">
          <Skeleton width={80} height={16} borderRadius={8} style={{ marginBottom: 8 }} />
          <Skeleton width="90%" height={18} borderRadius={8} style={{ marginBottom: 6 }} />
          <Skeleton width="70%" height={14} borderRadius={8} />
        </View>
      </View>
      <View className="flex-row mt-4 gap-2">
        <Skeleton width={80} height={32} borderRadius={12} />
        <Skeleton width={80} height={32} borderRadius={12} />
        <Skeleton width={80} height={32} borderRadius={12} />
      </View>
    </View>
  );
}

export function ProvinceCardSkeleton() {
  return (
    <View className="bg-surface rounded-2xl p-4 border border-border mb-2">
      <View className="flex-row items-center">
        <Skeleton width={48} height={48} borderRadius={14} />
        <View className="flex-1 ml-4">
          <Skeleton width="60%" height={18} borderRadius={8} style={{ marginBottom: 6 }} />
          <Skeleton width="40%" height={14} borderRadius={8} />
        </View>
        <Skeleton width={24} height={24} borderRadius={12} />
      </View>
    </View>
  );
}

export function ListSkeleton({ count = 5, type = "province" }: { count?: number; type?: "province" | "station" }) {
  const SkeletonComponent = type === "station" ? StationCardSkeleton : ProvinceCardSkeleton;
  
  return (
    <View className="p-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </View>
  );
}
