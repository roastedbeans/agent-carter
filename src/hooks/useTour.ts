import { useCallback, useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

type TourType = 'dashboard' | 'decision-tree' | 'complete';

const dashboardSteps = [
	{
		element: '[data-tour="sidebar"]',
		popover: {
			title: 'Navigation Sidebar',
			description:
				'Use this sidebar to navigate between the Dashboard and AI Decision Tree builder. Access all main features from here.',
			side: 'right' as const,
			align: 'start' as const,
		},
	},
	{
		element: '[data-tour="metrics-grid"]',
		popover: {
			title: 'Key Performance Metrics',
			description:
				'Monitor your abandoned cart statistics including total carts, recovery rate, revenue recovered, and average cart value.',
			side: 'bottom' as const,
			align: 'center' as const,
		},
	},
	{
		element: '[data-tour="marketing-metrics"]',
		popover: {
			title: 'Marketing Channel Performance',
			description:
				'Track subscription rates and engagement across different marketing channels like email, SMS, push notifications, and retargeting.',
			side: 'bottom' as const,
			align: 'center' as const,
		},
	},
	{
		element: '[data-tour="abandoned-carts-table"]',
		popover: {
			title: 'Abandoned Carts Details',
			description:
				'View detailed information about each abandoned cart including customer data, cart value, status, and marketing preferences.',
			side: 'top' as const,
			align: 'center' as const,
		},
	},
	{
		element: '[data-tour="ai-decision-tree-nav"]',
		popover: {
			title: 'AI Decision Tree Builder',
			description:
				'Click here to access the AI Decision Tree Builder where you can create automated recovery campaigns.',
			side: 'right' as const,
			align: 'center' as const,
		},
	},
];

const decisionTreeSteps = [
	{
		element: '[data-tour="decision-tree-header"]',
		popover: {
			title: 'AI Decision Tree Builder',
			description:
				'Create intelligent decision flows to automate your cart recovery campaigns based on customer behavior and cart properties.',
			side: 'bottom' as const,
			align: 'start' as const,
		},
	},
	{
		element: '[data-tour="ai-insights"]',
		popover: {
			title: 'AI Campaign Strategist',
			description:
				'Get intelligent recommendations from our AI about the best strategies for abandoned cart recovery. Use these insights to inform your decision tree design.',
			side: 'bottom' as const,
			align: 'center' as const,
		},
	},
	{
		element: '[data-tour="quick-guide"]',
		popover: {
			title: 'Quick Start Guide',
			description:
				'Follow these steps to quickly get started: Add nodes, configure properties, and connect flows to create your decision tree.',
			side: 'bottom' as const,
			align: 'center' as const,
		},
	},
	{
		element: '[data-tour="decision-tree-canvas"]',
		popover: {
			title: 'Visual Decision Tree Canvas',
			description:
				'This is where you build your decision tree. Add nodes, connect them, and configure the logic for your automated campaigns.',
			side: 'top' as const,
			align: 'center' as const,
		},
	},
	{
		element: '[data-tour="decision-features"]',
		popover: {
			title: 'Decision Node Capabilities',
			description:
				'Learn about the powerful targeting options available in decision nodes including customer properties, cart properties, and event triggers.',
			side: 'top' as const,
			align: 'start' as const,
		},
	},
	{
		element: '[data-tour="action-features"]',
		popover: {
			title: 'Action Node Options',
			description:
				'Discover the various action types you can trigger including multi-channel campaigns, template messages, and timing controls.',
			side: 'top' as const,
			align: 'end' as const,
		},
	},
];

const completeAppSteps = [
	...dashboardSteps,
	{
		element: '[data-tour="ai-decision-tree-nav"]',
		popover: {
			title: 'Next: Explore AI Decision Trees',
			description: 'Ready to create automated campaigns? Click here to explore the AI Decision Tree Builder!',
			side: 'right' as const,
			align: 'center' as const,
		},
	},
];

export const useTour = () => {
	const createDriver = useCallback(() => {
		return driver({
			showProgress: true,
			allowClose: true,
			showButtons: ['next', 'previous', 'close'],
			disableActiveInteraction: false,
			popoverClass: 'driverjs-theme',
			progressText: 'Step {{current}} of {{total}}',
			nextBtnText: 'Next →',
			prevBtnText: '← Previous',
			doneBtnText: 'Finish Tour ✨',
		});
	}, []);

	const startTour = useCallback(
		(tourType: TourType = 'dashboard') => {
			const driverObj = createDriver();

			let steps;
			switch (tourType) {
				case 'dashboard':
					steps = dashboardSteps;
					break;
				case 'decision-tree':
					steps = decisionTreeSteps;
					break;
				case 'complete':
					steps = completeAppSteps;
					break;
				default:
					steps = dashboardSteps;
			}

			driverObj.setSteps(steps);
			driverObj.drive();
		},
		[createDriver]
	);

	const highlightElement = useCallback(
		(selector: string, options?: any) => {
			const driverObj = createDriver();
			driverObj.highlight({
				element: selector,
				popover: options,
			});
		},
		[createDriver]
	);

	return {
		startTour,
		highlightElement,
	};
};
