import React from 'react';
import { View, Text } from 'react-native';
import NoteList from '../../components/notelist/NoteList'

interface NewNoteScreenProps {
  addNote: (content: string) => void;
  onNoteAdded: () => void;
}

const NewNoteScreen: React.FC<NewNoteScreenProps> = ({ addNote, onNoteAdded }) => {
  return (
    <View>
      <Text>New Note Screen</Text>
      <NoteList addNote={addNote} onNoteAdded={onNoteAdded} />
    </View>
  );
};

export default NewNoteScreen;