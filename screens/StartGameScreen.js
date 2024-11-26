import React, { useState } from 'react';
import {
	Alert,
	StyleSheet,
	TextInput,
	View,
	useWindowDimensions,
	KeyboardAvoidingView,
	ScrollView,
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { Colors } from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({ onPickNumber }) {
	const [enteredNumber, setEnteredNumber] = useState('');
	const { width, height } = useWindowDimensions();

	function enteredNumberHandler(num) {
		setEnteredNumber(num);
	}

	function resetEnteredNumber() {
		setEnteredNumber('');
	}

	function confirmInputHandler() {
		const chosenNum = parseInt(enteredNumber);
		if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
			Alert.alert('Invalid Number', 'number has to be between 1 and 99', [
				{
					text: 'Okay',
					style: 'destructive',
					onPress: resetEnteredNumber,
				},
			]);
			return;
		}
		onPickNumber(chosenNum);
	}

	const marginTop = height < 380 ? 30 : 100;

	return (
		<ScrollView style={styles.screen}>
			<KeyboardAvoidingView style={styles.screen} behavior='position'>
				<View style={[styles.rootContainer, { marginTop }]}>
					<Title>Guess My Number</Title>
					<Card>
						<InstructionText>Enter a number</InstructionText>
						<TextInput
							style={styles.numberInput}
							maxLength={2}
							keyboardType='number-pad'
							autoCapitalize='none'
							autoCorrect={false}
							value={enteredNumber}
							onChangeText={enteredNumberHandler}
						/>
						<View style={styles.buttonsContainer}>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={resetEnteredNumber}>
									Reset
								</PrimaryButton>
							</View>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={confirmInputHandler}>
									Confirm
								</PrimaryButton>
							</View>
						</View>
					</Card>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

export default StartGameScreen;

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	rootContainer: {
		flex: 1,
		// marginTop: deviceHeight < 380 ? 30 : 100,
		alignItems: 'center',
	},
	numberInput: {
		height: 55,
		width: 50,
		fontSize: 32,
		borderBottomColor: Colors.accent500,
		borderBottomWidth: 2,
		color: Colors.accent500,
		marginVertical: 8,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1,
	},
});
