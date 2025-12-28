import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Button } from '../components/atoms';
import { colors, spacing } from '../theme';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleRegisterAnswerSheet = () => {
    navigation.navigate('AnswerSheetRegistration');
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.header}>
        <Text variant="h1">SL Prime</Text>
        <Text variant="body" color="secondary" style={styles.subtitle}>
          간편한 채점 도우미
        </Text>
      </View>

      <View style={styles.content}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleRegisterAnswerSheet}
        >
          정답지 등록하기
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  subtitle: {
    marginTop: spacing.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});
