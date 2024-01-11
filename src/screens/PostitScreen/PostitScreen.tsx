import React from 'react';
import { View, Text } from 'react-native';
import PostIt from '../../components/postit/PostIt';
interface PostItScreenProps {
  route: {
    params: {
      notes: { id: string; content: string }[];
      updateNotes: () => void;
    };
  };
}

const PostItScreen: React.FC<PostItScreenProps> = ({ route }) => {
  const { notes, updateNotes } = route.params;

  return (
    <View>
      <Text>PostIt Screen</Text>
      <PostIt notes={notes} updateNotes={updateNotes} />
    </View>
  );
};

export default PostItScreen;