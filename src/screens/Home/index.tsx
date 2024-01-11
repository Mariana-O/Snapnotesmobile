import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  New: undefined;
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;
type NewScreenNavigationProp = NavigationProp<RootStackParamList, 'New'>;

const Navbar: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp | NewScreenNavigationProp>();

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.titleText}>SnapNotes</Text>
        </TouchableOpacity>
      </Text>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('New')} style={styles.newBtn}>
          <Text style={styles.menuItem}>New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#3498db', // Você pode personalizar a cor de fundo
  },
  title: {
    flex: 1,
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menu: {
    flexDirection: 'row',
    gap: 10,
  },
  menuItem: {
    color: '#fff',
    fontSize: 16,
  },
  newBtn: {
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default Navbar;
