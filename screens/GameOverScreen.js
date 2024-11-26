import React from 'react';
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import Title from '../components/ui/Title';
import { Colors } from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

function GameOverScreen({ rounds, number, userNumber, onRestart }) {
	const { width, height } = useWindowDimensions();
	let imageSize = width < 380 ? 150 : height < 400 ? 80 : 300;
	const imageStyle = {
		width: imageSize,
		height: imageSize,
		borderRadius: imageSize / 2,
	};

	return (
		<ScrollView style={styles.screen}>
			<View style={styles.rootContainer}>
				<Title>GAME OVER!</Title>
				<View style={[styles.imageContainer, imageStyle]}>
					<Image
						source={require('../assets/images/success.png')}
						style={styles.image}
					/>
				</View>

				<Text style={styles.summary}>
					Your phone needed <Text style={styles.highlight}>{rounds}</Text>{' '}
					rounds to guess the number{' '}
					<Text style={styles.highlight}>{userNumber}</Text>.
				</Text>

				<PrimaryButton onPress={onRestart}>Start New Game</PrimaryButton>
			</View>
		</ScrollView>
	);
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get('window').width;
// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	rootContainer: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		backgroundColor: '#ffffff',
		alignItems: 'center',
	},
	imageContainer: {
		// width: deviceWidth < 380 ? 150 : 300,
		// height: deviceWidth < 380 ? 150 : 300,
		// borderRadius: deviceWidth < 380 ? 75 : 150,
		borderWidth: 3,
		borderColor: Colors.primary800,
		overflow: 'hidden',
		margin: 36,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	summary: {
		fontFamily: 'open-sans',
		fontSize: 24,
		textAlign: 'center',
		marginBottom: 24,
	},
	highlight: {
		color: Colors.primary600,
		fontFamily: 'open-sans-bold',
	},
});
