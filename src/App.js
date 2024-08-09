import React, { useState, useEffect, useCallback } from 'react';

export default function App() {
	const questions = [
		{
			questionText: 'Which sentence is grammatically correct?',
			answerOptions: [
				{ answerText: 'She don\'t like pizza.', isCorrect: false },
				{ answerText: 'She doesn\'t like pizza.', isCorrect: true },
				{ answerText: 'She doesn\'t likes pizza.', isCorrect: false },
				{ answerText: 'She don\'t likes pizza.', isCorrect: false },
			],
		},
		{
			questionText: 'Choose the correct past tense form of the verb "go":',
			answerOptions: [
				{ answerText: 'Goed', isCorrect: false },
				{ answerText: 'Going', isCorrect: false },
				{ answerText: 'Went', isCorrect: true },
				{ answerText: 'Goes', isCorrect: false },
			],
		},
		{
			questionText: 'Which of the following sentences uses the correct subject-verb agreement?',
			answerOptions: [
				{ answerText: 'The cats runs fast.', isCorrect: false },
				{ answerText: 'The cat run fast.', isCorrect: false },
				{ answerText: 'The cat runs fast.', isCorrect: true },
				{ answerText: 'The cats run fast.', isCorrect: true },
			],
		},
		{
			questionText: 'Identify the correct use of a comma:',
			answerOptions: [
				{ answerText: 'I like pizza, and ice cream.', isCorrect: true },
				{ answerText: 'I like pizza and, ice cream.', isCorrect: false },
				{ answerText: 'I like, pizza and ice cream.', isCorrect: false },
				{ answerText: 'I, like pizza and ice cream.', isCorrect: false },
			],
		},
		{
			questionText: 'Which sentence is correctly punctuated?',
			answerOptions: [
				{ answerText: 'It’s raining today, but I don’t have an umbrella.', isCorrect: true },
				{ answerText: 'It’s raining today but, I don’t have an umbrella.', isCorrect: false },
				{ answerText: 'It’s raining today but I don’t have an umbrella.', isCorrect: false },
				{ answerText: 'It’s raining today; but I don’t have an umbrella.', isCorrect: false },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [timeLeft, setTimeLeft] = useState(10);

	const handleAnswerOptionClick = useCallback((isCorrect) => {
		if (isCorrect) {
			setScore(score => score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
			setTimeLeft(10);
		} else {
			setShowScore(true);
		}
	}, [currentQuestion, questions.length]);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTimeLeft) => {
				if (prevTimeLeft === 1) {
					clearInterval(timer);
					handleAnswerOptionClick(false);
					return 10;
				}
				return prevTimeLeft - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [handleAnswerOptionClick]);

	const getRating = (score) => {
		const percentage = (score / questions.length) * 100;
		if (percentage >= 80) return 'Excellent';
		if (percentage >= 60) return 'Good';
		if (percentage >= 40) return 'Average';
		return 'Needs Improvement';
	};

	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}. <br />
					Rating: {getRating(score)}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='timer-section'>
						Time left: {timeLeft} seconds
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption, index) => (
							<button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
