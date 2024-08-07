import React, { useState, useEffect, useCallback } from 'react';

export default function App() {
	const questions = [
		{
			questionText: 'What does CPU stand for?',
			answerOptions: [
				{ answerText: 'Central Process Unit', isCorrect: false },
				{ answerText: 'Central Processing Unit', isCorrect: true },
				{ answerText: 'Computer Personal Unit', isCorrect: false },
				{ answerText: 'Central Processor Unit', isCorrect: false },
			],
		},
		{
			questionText: 'Which language is used for web apps?',
			answerOptions: [
				{ answerText: 'PHP', isCorrect: false },
				{ answerText: 'Python', isCorrect: false },
				{ answerText: 'JavaScript', isCorrect: true },
				{ answerText: 'All', isCorrect: true },
			],
		},
		{
			questionText: 'What does HTML stand for?',
			answerOptions: [
				{ answerText: 'Hyper Text Markup Language', isCorrect: true },
				{ answerText: 'Hyperlinks and Text Markup Language', isCorrect: false },
				{ answerText: 'Home Tool Markup Language', isCorrect: false },
				{ answerText: 'Hyper Tool Markup Language', isCorrect: false },
			],
		},
		{
			questionText: 'Which company developed the Java programming language?',
			answerOptions: [
				{ answerText: 'Microsoft', isCorrect: false },
				{ answerText: 'Apple', isCorrect: false },
				{ answerText: 'Sun Microsystems', isCorrect: true },
				{ answerText: 'IBM', isCorrect: false },
			],
		},
		{
			questionText: 'Which of the following is a NoSQL database?',
			answerOptions: [
				{ answerText: 'MySQL', isCorrect: false },
				{ answerText: 'PostgreSQL', isCorrect: false },
				{ answerText: 'MongoDB', isCorrect: true },
				{ answerText: 'Oracle', isCorrect: false },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [timeLeft, setTimeLeft] = useState(10); // Set the timer for each question

	const handleAnswerOptionClick = useCallback((isCorrect) => {
		if (isCorrect) {
			setScore(score => score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
			setTimeLeft(10); // Reset the timer for the next question
		} else {
			setShowScore(true);
		}
	}, [currentQuestion, questions.length]);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTimeLeft) => {
				if (prevTimeLeft === 1) {
					clearInterval(timer);
					handleAnswerOptionClick(false); // Move to the next question when the timer runs out
					return 10; // Reset the timer
				}
				return prevTimeLeft - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [handleAnswerOptionClick]);

	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
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
