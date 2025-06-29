'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { WelcomeModal } from './TourButton';
import { useTour } from '@/hooks/useTour';

interface TourContextType {
	showWelcome: boolean;
	setShowWelcome: (show: boolean) => void;
	hasSeenTour: boolean;
	markTourAsSeen: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTourContext = () => {
	const context = useContext(TourContext);
	if (!context) {
		throw new Error('useTourContext must be used within a TourProvider');
	}
	return context;
};

export const TourProvider = ({ children }: { children: React.ReactNode }) => {
	const [showWelcome, setShowWelcome] = useState(false);
	const [hasSeenTour, setHasSeenTour] = useState(true); // Default to true to prevent auto-showing
	const { startTour } = useTour();

	useEffect(() => {
		// Check if user has seen the tour before
		const tourSeen = localStorage.getItem('cartanalytics-tour-seen');
		if (!tourSeen) {
			setHasSeenTour(false);
			// Show welcome modal after a short delay
			const timer = setTimeout(() => {
				setShowWelcome(true);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, []);

	const markTourAsSeen = () => {
		localStorage.setItem('cartanalytics-tour-seen', 'true');
		setHasSeenTour(true);
		setShowWelcome(false);
	};

	const handleStartWelcomeTour = () => {
		setShowWelcome(false);
		markTourAsSeen();
		startTour('complete');
	};

	const handleSkipTour = () => {
		markTourAsSeen();
	};

	return (
		<TourContext.Provider
			value={{
				showWelcome,
				setShowWelcome,
				hasSeenTour,
				markTourAsSeen,
			}}>
			{children}
			{showWelcome && (
				<WelcomeModal
					onStartTour={handleStartWelcomeTour}
					onSkip={handleSkipTour}
				/>
			)}
		</TourContext.Provider>
	);
};
