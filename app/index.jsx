import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';

const USER_NAME = 'JOHN WISE';
const USER_ID_BASE = 'user-id-12345-abcde'; 

const MEMBERSHIP_LEVELS = [
  { name: 'Bronze Member', color: '#CD7F32',text:'Bronze' }, 
  { name: 'Silver Member', color: '#C0C0C8',text:'Silver' }, 
  { name: 'Gold Member', color: '#FFD700',text:'Gold' },  
  { name: 'Platinum Member', color: '#E5E4E2',text:'Platinum' }, 
];

const getRandomMembershipLevel = () => {
  const randomIndex = Math.floor(Math.random() * MEMBERSHIP_LEVELS.length);
  return MEMBERSHIP_LEVELS[randomIndex];
};

export default function App() {
  const [qrValue, setQrValue] = useState(`${USER_ID_BASE}`);
  const [currentMembership, setCurrentMembership] = useState(getRandomMembershipLevel());

  const handleRefresh = () => {
    const timestamp = Date.now(); 
    setQrValue(`${USER_ID_BASE}-${timestamp}`); 

    setCurrentMembership(getRandomMembershipLevel());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.profilePic}>
            <Text style={styles.profileInitial}>{USER_NAME[0]}</Text>
          </View>

          <Text style={styles.userName}>{USER_NAME}</Text>

          <View style={[
              styles.membershipContainer,
              { backgroundColor: currentMembership.color } 
            ]}>
            <Text style={styles.membershipLevelText}>{currentMembership.name}</Text>
          </View>

          <View style={styles.qrContainer}>
            <SvgQRCode
              value={qrValue}
              size={180}
              backgroundColor="#23262F" 
              color="#fff"            
            />
          </View>

          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh} activeOpacity={0.85}>
            <Text style={styles.refreshText}>Refresh QR Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#181A20', // Consistent dark background
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181A20', // Consistent dark background
  },
  card: {
    width: '90%', // Use percentage for better responsiveness
    maxWidth: 360, // Max width for larger screens
    backgroundColor: '#23262F', // Dark card background
    borderRadius: 24,
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25, // Increased shadow for more depth
    shadowRadius: 16,
    elevation: 12,
  },
  profilePic: {
    width: 72,
    height: 72,
    borderRadius: 36, // Perfect circle
    backgroundColor: '#353945', // Darker background for the initial
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#393E46', // Subtle border
  },
  profileInitial: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 26, // Slightly larger for prominence
    fontWeight: '700', // Bolder
    marginBottom: 8, // Space below name
    letterSpacing: 0.5,
  },
  membershipContainer: {
    // Background color is set dynamically in the component
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20, // Pill shape for membership tag
    marginBottom: 28, // Space below membership tag
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)', // Very subtle white border
  },
  membershipLevelText: {
    color: 'white', // White text for membership level
    fontSize: 16,
    // fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'uppercase', // Make text uppercase for stylistic consistency
  },
  qrContainer: {
    backgroundColor: '#23262F', // Same as card background for seamless look
    padding: 12,
    borderRadius: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#353945', // Border around the QR code area
  },
  refreshButton: {
    backgroundColor: '#4A90E2', // A vibrant blue for the button
    paddingVertical: 14, // Taller button
    paddingHorizontal: 40, // Wider button
    borderRadius: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // More pronounced shadow
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  refreshText: {
    color: '#fff',
    fontSize: 18, // Larger text for button
    fontWeight: '700', // Bolder text
    letterSpacing: 0.5,
  },
});