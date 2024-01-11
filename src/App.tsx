// App.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostItScreen from './screens/PostitScreen/PostitScreen';
import NewNoteScreen from './screens/NewNoteScreen/NewNoteScreen';
import Navbar from './components/navbar/Navbar';
import firebaseApp from './axios/config'; // Certifique-se de que o caminho esteja correto

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [notes, setNotes] = useState<{ id: string; content: string }[]>([]);

  const addNote = async (content: string) => {
    try {
      const response = await fetch('sua_api_de_notas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const updateNotes = async () => {
    try {
      const response = await fetch('sua_api_de_notas');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    updateNotes();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: () => <Navbar />,
        }}
      >
        <Stack.Screen
          name="Home"
          component={() => <PostItScreen notes={notes} updateNotes={updateNotes} />}
        />
        <Stack.Screen
          name="New"
          component={() => <NewNoteScreen addNote={addNote} onNoteAdded={updateNotes} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


