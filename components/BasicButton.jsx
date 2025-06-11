import { StyleSheet, Text, Pressable } from 'react-native';

//Konstanten
import { Colors } from '../constants/Colors';

const BasicButton = ({ onPress, title, style = {}, theme = 'pink', disabled = false }) => {
  const themeBtn = theme === 'white' ? styles.whiteBtn : styles.pinkBtn;
  const themeText = theme === 'white' ? styles.whiteBtnText : styles.pinkBtnText;

  return (
    <Pressable
      style={({ pressed }) => [themeBtn, pressed && styles.pressed, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[themeText]}>{title}</Text>
    </Pressable>
  );
};

export default BasicButton;

const styles = StyleSheet.create({
  pinkBtn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center'
  },
  pinkBtnText: {
    color: Colors.primaryText
  },
  whiteBtn: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.outline
  },
  whiteBtnText: {
    color: "black"
  },
  pressed: {
    opacity: 0.8
  }
});