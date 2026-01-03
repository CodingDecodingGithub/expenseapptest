import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

// 1. Import Page Components
import NavBar from './components/NavBar';
import Expenses from './components/Expenses';
import Dues from './components/Dues';
import Trips from './components/Trips';
import FloatingButton from './components/FloatingButton';

// 2. Import Your New Modals
import AddNewExpense from './components/ExpensesPage/AddNewExpense';
import AddNewDue from './components/DuesPage/AddNewDue';
import AddNewTrip from './components/TripsPage/AddNewTrip';

export default function App() {
  // State for the Active Tab (Expenses, Dues, Trips)
  const [currentTab, setCurrentTab] = useState('Expenses');
  
  // State for Modal Visibility (Open/Close)
  const [isModalVisible, setModalVisible] = useState(false);

  // Helper: Open the Modal
  const handleAddNewPress = () => {
    setModalVisible(true);
  };

  // Helper: Close the Modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Helper: Decide which screen to show
  const renderContent = () => {
    switch (currentTab) {
      case 'Expenses': return <Expenses />;
      case 'Dues': return <Dues />;
      case 'Trips': return <Trips />;
      default: return <Expenses />;
    }
  };

  return (
    <View style={styles.mainWrapper}>
      
      {/* Top Navigation Bar */}
      <NavBar 
        activeTab={currentTab} 
        onTabChange={setCurrentTab} 
      />

      {/* Main Page Content */}
      <View style={styles.container}>
        {renderContent()}
      </View>

      {/* Floating Button (Triggers the open action) */}
      <FloatingButton 
        title="Add New Entry" 
        onPress={handleAddNewPress} 
      />

      {/* --- DYNAMIC MODALS SECTION --- */}
      {/* The logic below checks TWO things: 
          1. Is the modal supposed to be open? (isModalVisible)
          2. Which tab are we on? (currentTab)
      */}

      <AddNewExpense 
        visible={isModalVisible && currentTab === 'Expenses'} 
        onClose={handleCloseModal} 
      />

      <AddNewDue 
        visible={isModalVisible && currentTab === 'Dues'} 
        onClose={handleCloseModal} 
      />

      <AddNewTrip 
        visible={isModalVisible && currentTab === 'Trips'} 
        onClose={handleCloseModal} 
      />

    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1, 
    backgroundColor: '#fff',
    position: 'relative', // Necessary for absolute positioning of the button
  },
  container: {
    flex: 1, 
    // We set padding to 0 here because your individual pages (Expenses.js, etc.) 
    // likely handle their own padding. This prevents double spacing.
    paddingHorizontal: 20, 
    paddingVertical: 10,
  },
});