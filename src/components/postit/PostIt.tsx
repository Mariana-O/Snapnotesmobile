import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, PanResponder, Animated } from 'react-native';
import { updateDoc, doc, getFirestore, deleteDoc } from 'firebase/firestore';
import firebaseApp from '../../axios/config';

interface Note {
  id: string;
  content: string;
}

interface PostItProps {
  note: Note;
  updateNotes: () => void;
}

const PostIt: React.FC<PostItProps> = ({ note, updateNotes }) => {
  const [editedNoteContent, setEditedNoteContent] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [displayedContent, setDisplayedContent] = useState<string>(note.content);
  const [isClicked, setIsClicked] = useState(false);

  const db = getFirestore(firebaseApp);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: () => {},
      onPanResponderRelease: (_, gestureState) => handlePanResponderRelease(gestureState),
    })
  ).current;

  const position = useRef(new Animated.ValueXY()).current;

  const handlePanResponderRelease = (gestureState: any) => {
    const { dx, dy } = gestureState;

    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      // Verifique se o gesto é um toque, não um arrasto
      handlePress();
    }
  };

  const handlePress = () => {
    if (!isEditing) {
      setIsClicked(true);
    }
  };

  useEffect(() => {
    setDisplayedContent(note.content);
  }, [note.content]);

  async function updateNoteContent() {
    try {
      if (editedNoteContent !== null) {
        const updatedNote = { ...note, content: editedNoteContent };
        await updateDoc(doc(db, 'notes', note.id), updatedNote);
        updateNotes();
        setDisplayedContent(editedNoteContent);
        setEditedNoteContent(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }

  const handleDeleteNote = async () => {
    try {
      await deleteDoc(doc(db, 'notes', note.id));
      updateNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.postIt,
        { transform: [{ translateY: isClicked && isEditing ? -5 : 0 }] },
        position.getLayout(),
      ]}
    >
      <View style={styles.postItButtons}>
        {isEditing ? (
          <View style={styles.iconButtonsContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={updateNoteContent}>
              <Text>&#10003;</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setEditedNoteContent(note.content)}
            >
              <Text>&#10007;</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.iconButtonsContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => setIsEditing(true)}>
              <Text>✎</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleDeleteNote}>
              <Text>✖</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.postItTextarea}>
        <TextInput
          style={styles.textInput}
          value={isEditing ? editedNoteContent || '' : displayedContent}
          onChangeText={(text) => setEditedNoteContent(text)}
          onBlur={isEditing ? updateNoteContent : undefined}
          placeholder="Clique para editar..."
          editable={isEditing}
          multiline
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  postIt: {
    backgroundColor: '#f9f7ed',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    width: 150,
    height: 150,
    position: 'relative',
    overflow: 'hidden',
    borderColor: '#e0dcb4',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postItButtons: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  iconButtonsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 5,
    fontSize: 18,
    cursor: 'pointer',
  },
  postItTextarea: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%', // Ajuste conforme necessário
    padding: 10,
  },
  textInput: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PostIt;


