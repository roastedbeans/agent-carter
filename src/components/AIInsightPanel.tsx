'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Brain,
	Lightbulb,
	TrendingUp,
	Clock,
	Users,
	Target,
	MessageSquare,
	Sparkles,
	ChevronRight,
	RefreshCw,
} from 'lucide-react';

interface InsightRecommendation {
	id: string;
	title: string;
	reasoning: string;
	actions: string[];
	expectedImpact: string;
	confidence: number;
	category: 'timing' | 'segmentation' | 'messaging' | 'channel';
}

const mockInsights: InsightRecommendation[] = [
	{
		id: '1',
		title: 'High-Value Cart Recovery Strategy',
		reasoning:
			'Analysis shows carts >$200 have 34% higher recovery rates when contacted within 2 hours. Customer data indicates these buyers are typically price-conscious but committed purchasers.',
		actions: [
			'Send immediate email within 30 minutes for carts >$200',
			'Offer 10% discount for purchases completed within 24 hours',
			'Follow up with SMS after 6 hours if email unopened',
		],
		expectedImpact: '+28% recovery rate for high-value carts',
		confidence: 92,
		category: 'timing',
	},
	{
		id: '2',
		title: 'Mobile-First User Engagement',
		reasoning:
			'Mobile users represent 68% of abandonments but only 23% of email opens. However, they show 45% higher SMS engagement rates and respond well to push notifications.',
		actions: [
			'Prioritize SMS for mobile-detected abandonments',
			'Use push notifications for app users within 1 hour',
			'Send mobile-optimized emails with clear CTAs',
		],
		expectedImpact: '+41% engagement from mobile users',
		confidence: 87,
		category: 'channel',
	},
	{
		id: '3',
		title: 'Behavioral Segmentation Approach',
		reasoning:
			'First-time visitors abandon 73% more often than returning customers but show higher conversion when offered social proof. Returning customers respond better to personalized product recommendations.',
		actions: [
			'Show customer reviews and testimonials to new visitors',
			'Highlight "customers also bought" for returning users',
			'Create separate email templates for each segment',
		],
		expectedImpact: '+19% overall conversion improvement',
		confidence: 89,
		category: 'segmentation',
	},
	{
		id: '4',
		title: 'Weekend Recovery Optimization',
		reasoning:
			'Weekend abandonments have 67% lower immediate recovery but 52% higher delayed recovery rates. Users prefer browsing on weekends but purchasing on weekdays.',
		actions: [
			'Delay weekend campaigns until Monday morning',
			'Focus on product browsing and wishlist building',
			'Send "Monday motivation" purchase reminders',
		],
		expectedImpact: '+15% weekend cart recovery',
		confidence: 84,
		category: 'timing',
	},
];

const categoryConfig = {
	timing: { icon: Clock, color: 'bg-blue-100 text-blue-700', label: 'Timing Strategy' },
	segmentation: { icon: Users, color: 'bg-green-100 text-green-700', label: 'Segmentation' },
	messaging: { icon: MessageSquare, color: 'bg-purple-100 text-purple-700', label: 'Messaging' },
	channel: { icon: Target, color: 'bg-orange-100 text-orange-700', label: 'Channel Mix' },
};

export const AIInsightPanel = () => {
	const [selectedInsight, setSelectedInsight] = useState<InsightRecommendation | null>(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const [insights, setInsights] = useState<InsightRecommendation[]>(mockInsights);

	const generateNewInsights = async () => {
		setIsGenerating(true);
		// Simulate AI processing
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Shuffle insights to simulate new AI reasoning
		const shuffled = [...mockInsights].sort(() => Math.random() - 0.5);
		setInsights(shuffled);
		setSelectedInsight(null);
		setIsGenerating(false);
	};

	useEffect(() => {
		// Auto-select first insight on mount
		if (insights.length > 0) {
			setSelectedInsight(insights[0]);
		}
	}, [insights]);

	return (
		<div className='space-y-4'>
			<Card
				data-tour='ai-insights'
				className='border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-lg'>
						<Brain className='h-5 w-5 text-blue-600' />
						AI Campaign Strategist
						<Badge
							variant='secondary'
							className='ml-auto'>
							<Sparkles className='h-3 w-3 mr-1' />
							Beta
						</Badge>
					</CardTitle>
					<p className='text-sm text-muted-foreground'>
						AI-powered insights and recommendations for optimizing your abandoned cart recovery campaigns
					</p>
				</CardHeader>
				<CardContent>
					<div className='flex items-center justify-between mb-4'>
						<div className='flex items-center gap-2'>
							<Lightbulb className='h-4 w-4 text-yellow-500' />
							<span className='text-sm font-medium'>Strategic Recommendations</span>
						</div>
						<Button
							variant='outline'
							size='sm'
							onClick={generateNewInsights}
							disabled={isGenerating}
							className='flex items-center gap-2'>
							<RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
							{isGenerating ? 'Analyzing...' : 'Refresh Insights'}
						</Button>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
						{/* Insights List */}
						<div className='lg:col-span-1 space-y-2'>
							{insights.map((insight) => {
								const categoryInfo = categoryConfig[insight.category];
								const IconComponent = categoryInfo.icon;

								return (
									<div
										key={insight.id}
										className={`p-3 rounded-lg border cursor-pointer transition-all ${
											selectedInsight?.id === insight.id
												? 'border-blue-500 bg-blue-50'
												: 'border-gray-200 hover:border-gray-300 bg-white'
										}`}
										onClick={() => setSelectedInsight(insight)}>
										<div className='flex items-start gap-2'>
											<IconComponent className='h-4 w-4 mt-0.5 text-gray-600' />
											<div className='flex-1'>
												<h4 className='text-sm font-medium mb-1'>{insight.title}</h4>
												<div className='flex items-center gap-2'>
													<Badge
														variant='outline'
														className={`text-xs ${categoryInfo.color}`}>
														{categoryInfo.label}
													</Badge>
													<span className='text-xs text-gray-500'>{insight.confidence}% confidence</span>
												</div>
											</div>
											<ChevronRight className='h-4 w-4 text-gray-400' />
										</div>
									</div>
								);
							})}
						</div>

						{/* Detailed Insight */}
						<div className='lg:col-span-2'>
							{selectedInsight ? (
								<div className='bg-white rounded-lg border p-4 h-full'>
									<div className='flex items-start justify-between mb-3'>
										<h3 className='font-semibold text-lg'>{selectedInsight.title}</h3>
										<div className='flex items-center gap-2'>
											<TrendingUp className='h-4 w-4 text-green-500' />
											<span className='text-sm font-medium text-green-600'>{selectedInsight.expectedImpact}</span>
										</div>
									</div>

									<div className='space-y-4'>
										<div>
											<h4 className='font-medium text-sm mb-2 flex items-center gap-2'>
												<Brain className='h-4 w-4 text-blue-500' />
												AI Reasoning
											</h4>
											<p className='text-sm text-gray-700 leading-relaxed'>{selectedInsight.reasoning}</p>
										</div>

										<div>
											<h4 className='font-medium text-sm mb-2 flex items-center gap-2'>
												<Target className='h-4 w-4 text-orange-500' />
												Recommended Actions
											</h4>
											<ul className='space-y-2'>
												{selectedInsight.actions.map((action, index) => (
													<li
														key={index}
														className='flex items-start gap-2 text-sm'>
														<div className='w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mt-0.5'>
															{index + 1}
														</div>
														<span className='text-gray-700'>{action}</span>
													</li>
												))}
											</ul>
										</div>

										<div className='flex items-center gap-4 pt-2 border-t'>
											<div className='flex items-center gap-2'>
												<div className='w-2 h-2 rounded-full bg-green-500'></div>
												<span className='text-xs text-gray-600'>Confidence: {selectedInsight.confidence}%</span>
											</div>
											<Badge
												variant='outline'
												className={categoryConfig[selectedInsight.category].color}>
												{categoryConfig[selectedInsight.category].label}
											</Badge>
										</div>
									</div>
								</div>
							) : (
								<div className='bg-gray-50 rounded-lg border border-dashed p-8 text-center'>
									<Brain className='h-12 w-12 text-gray-400 mx-auto mb-3' />
									<p className='text-gray-500'>Select an insight to view detailed recommendations</p>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
