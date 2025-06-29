'use client';

import React from 'react';
import { HelpCircle, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTour } from '@/hooks/useTour';
import { usePathname } from 'next/navigation';

export const TourButton = () => {
	const { startTour } = useTour();
	const pathname = usePathname();

	const handleStartTour = () => {
		if (pathname === '/ai-decision-tree') {
			startTour('decision-tree');
		} else if (pathname === '/') {
			startTour('dashboard');
		} else {
			startTour('complete');
		}
	};

	const getTourButtonText = () => {
		if (pathname === '/ai-decision-tree') {
			return 'Tour: Decision Tree';
		} else if (pathname === '/') {
			return 'Tour: Dashboard';
		}
		return 'Start Tour';
	};

	return (
		<div className='fixed bottom-6 right-6 z-50'>
			<Button
				onClick={handleStartTour}
				className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full px-6 py-3 flex items-center gap-2 font-medium'
				size='lg'>
				<Sparkles className='h-5 w-5' />
				{getTourButtonText()}
			</Button>
		</div>
	);
};

// Welcome modal for first-time users
export const WelcomeModal = ({ onStartTour, onSkip }: { onStartTour: () => void; onSkip: () => void }) => {
	return (
		<div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
			<div className='bg-white rounded-lg shadow-2xl max-w-md w-full p-6 space-y-4'>
				<div className='text-center'>
					<div className='w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
						<Sparkles className='h-8 w-8 text-white' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-2'>Welcome to CartAnalytics!</h2>
					<p className='text-gray-600 mb-6'>
						Ready to explore our powerful cart recovery platform? Take a quick guided tour to discover all the features.
					</p>
				</div>

				<div className='flex gap-3'>
					<Button
						variant='outline'
						onClick={onSkip}
						className='flex-1'>
						Skip Tour
					</Button>
					<Button
						onClick={onStartTour}
						className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'>
						<Play className='h-4 w-4 mr-2' />
						Start Tour
					</Button>
				</div>
			</div>
		</div>
	);
};
