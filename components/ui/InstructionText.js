import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/colors';

const InstructionText = ({ children, style }) => {
	return (
		// 2nd style override the default style
		<Text style={style ? [styles.instructions, style] : styles.instructions}>
			{children}
		</Text>
	);
};

export default InstructionText;

const styles = StyleSheet.create({
	instructions: {
		color: Colors.accent500,
		fontSize: 24,
		fontFamily: 'open-sans',
	},
});
