'use client';

import { DecisionTreeBuilder } from '@/components/decision-tree/DecisionTreeBuilder';
import { Bot, Info, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AIDecisionTree() {
	return (
		<div className='space-y-6 h-full flex flex-col'>
			{/* Header */}
			<div className='space-y-2'>
				<h1 className='text-3xl font-bold tracking-tight flex items-center gap-3'>
					<Bot className='h-8 w-8 text-primary' />
					AI Decision Tree Builder
				</h1>
				<p className='text-muted-foreground'>
					Create and customize intelligent decision flows for automated cart recovery campaigns.
				</p>
			</div>

			{/* Quick Guide */}
			<Card className='border-blue-200 bg-blue-50/50'>
				<CardHeader className='pb-3'>
					<CardTitle className='text-sm flex items-center gap-2 text-blue-700'>
						<Lightbulb className='h-4 w-4' />
						Quick Guide
					</CardTitle>
				</CardHeader>
				<CardContent className='text-sm space-y-2'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div>
							<p className='font-medium text-blue-700'>Add Nodes</p>
							<p className='text-blue-600'>Use the toolbar to add Decision and Action nodes to your flow.</p>
						</div>
						<div>
							<p className='font-medium text-blue-700'>Configure Properties</p>
							<p className='text-blue-600'>Click any node to edit its properties, conditions, and actions.</p>
						</div>
						<div>
							<p className='font-medium text-blue-700'>Connect Flows</p>
							<p className='text-blue-600'>Drag from node handles to create conditional branches (Yes/No).</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Decision Tree Builder */}
			<div className='flex-1 min-h-[600px]'>
				<DecisionTreeBuilder />
			</div>

			{/* Feature Information */}
			<div className='grid gap-4 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle className='text-sm flex items-center gap-2'>
							<Info className='h-4 w-4 text-blue-500' />
							Decision Node Features
						</CardTitle>
					</CardHeader>
					<CardContent className='text-sm space-y-2'>
						<ul className='list-disc list-inside space-y-1 text-muted-foreground'>
							<li>
								<strong>Customer Properties:</strong> Target by tier, purchase history, subscriptions
							</li>
							<li>
								<strong>Cart Properties:</strong> Filter by value, item count, product categories
							</li>
							<li>
								<strong>Event Triggers:</strong> React to opens, clicks, deliveries
							</li>
							<li>
								<strong>Custom Conditions:</strong> Create complex logic rules
							</li>
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='text-sm flex items-center gap-2'>
							<Info className='h-4 w-4 text-green-500' />
							Action Node Features
						</CardTitle>
					</CardHeader>
					<CardContent className='text-sm space-y-2'>
						<ul className='list-disc list-inside space-y-1 text-muted-foreground'>
							<li>
								<strong>Multi-Channel:</strong> Email, SMS, Push, Retargeting campaigns
							</li>
							<li>
								<strong>Templates:</strong> Pre-built messages for different scenarios
							</li>
							<li>
								<strong>Timing Control:</strong> Immediate or delayed execution
							</li>
							<li>
								<strong>Response Tracking:</strong> Monitor engagement and optimize
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
