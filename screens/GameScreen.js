import React, { useEffect, useState } from 'react';
import {
	Alert,
	FlatList,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
	const rndNum = Math.floor(Math.random() * (max - min)) + min;

	if (rndNum === exclude) return generateRandomBetween(min, max, exclude);
	else return rndNum;
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
	const initialGuess = generateRandomBetween(1, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [guessRounds, setGuessRounds] = useState([initialGuess]);
	const { width, height } = useWindowDimensions();

	function handleGuess(direction) {
		if (
			(direction === 'lower' && currentGuess < userNumber) ||
			(direction === 'greater' && currentGuess > userNumber)
		) {
			Alert.alert('Don"t lie', 'We know this is wrong', [
				{ text: 'Sorry!', styles: 'cancel' },
			]);
			return;
		}

		if (direction === 'lower') {
			maxBoundary = currentGuess - 1;
		} else {
			minBoundary = currentGuess + 1;
		}
		const newRand = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		);
		setCurrentGuess(newRand);
		setGuessRounds((prev) => [newRand, ...prev]);
	}

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver(guessRounds.length);
		}
	}, [currentGuess, userNumber, onGameOver]);

	useEffect(() => {
		minBoundary = 1;
		maxBoundary = 100;
	}, []);

	let content = (
		<>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<InstructionText style={styles.instruction}>
					Higher or Lower?
				</InstructionText>
				<View style={styles.buttonsContainerWide}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={handleGuess.bind(this, 'lower')}>
							<Ionicons name='remove' size={24} color='white' />
						</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={handleGuess.bind(this, 'greater')}>
							<Ionicons name='add' size={24} color='white' />
						</PrimaryButton>
					</View>
				</View>
			</Card>
		</>
	);

	if (width > 600) {
		content = (
			<>
				<View style={buttonsContainerWide}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={handleGuess.bind(this, 'lower')}>
							<Ionicons name='remove' size={24} color='white' />
						</PrimaryButton>
					</View>

					<NumberContainer>{currentGuess}</NumberContainer>

					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={handleGuess.bind(this, 'greater')}>
							<Ionicons name='add' size={24} color='white' />
						</PrimaryButton>
					</View>
				</View>
			</>
		);
	}

	return (
		<View style={styles.screen}>
			<Title>Opponent's Guess</Title>
			{content}
			<View style={styles.listContainer}>
				<FlatList
					data={guessRounds}
					renderItem={(itemData) => (
						<GuessLogItem
							round={guessRounds.length - itemData.index}
							guess={itemData.item}
						/>
					)}
					keyExtractor={(item) => item}
				/>
			</View>
		</View>
	);
}

export default GameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
		alignItems: 'center',
	},
	instruction: {
		marginBottom: 12,
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
		padding: 16,
	},
	buttonsContainerWide: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});
