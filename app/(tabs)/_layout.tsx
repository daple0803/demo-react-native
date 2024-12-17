import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="createPost"
        options={{
          title: 'Create Post',
        }}
      />
       <Stack.Screen
        name="profile"
        options={{
          title: 'User Profile',
        }}
      />
      <Stack.Screen
        name="postDetails"
        options={{
          title: 'Post Details',
        }}
      />
    </Stack>
  );
}
