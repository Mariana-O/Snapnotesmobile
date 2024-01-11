import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { addDoc, collection, getFirestore } from 'firebase/firestore'; // Adicione a importação do getFirestore
import { useNavigation } from '@react-navigation/native';
import firebaseApp from '../../axios/config'; // Importe o firebaseApp

interface NoteListProps {
  addNote: (content: string) => void;
  onNoteAdded: () => void;
}

const NoteList: React.FC<NoteListProps> = ({ addNote, onNoteAdded }) => {
  const [newNote, setNewNote] = useState('');
  const db = getFirestore(firebaseApp);
  const navigation = useNavigation();

  const handleAddNote = async () => {
    try {
      const docRef = await addDoc(collection(db, 'notes'), { content: newNote });
      const addedNote = { id: docRef.id, content: newNote };
      addNote(addedNote);
      setNewNote('');
      onNoteAdded(); // Notify that a note has been added
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <View style={styles.addNote}>
      <TextInput
        style={styles.input}
        placeholder="Nova anotação:"
        value={newNote}
        onChangeText={(text) => setNewNote(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddNote}>
        <Text>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addNote: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
  button: {
    padding: 10,
    fontSize: 16,
    cursor: 'pointer',
  },
});

export default NoteList;
