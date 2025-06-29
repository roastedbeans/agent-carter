import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DecisionNodeData } from '@/types/decision-tree';
import { Play, Mail, MessageSquare, Bell, Target, Settings } from 'lucide-react';

interface ActionNodeProps {
	data: DecisionNodeData;
	selected?: boolean;
	id: string;
}

export const ActionNode: React.FC<ActionNodeProps> = ({ data, selected, id }) => {
	const { nodeName, action, priority, description } = data;

	const getActionIcon = (type?: string) => {
		switch (type) {
			case 'email':
				return <Mail className='h-4 w-4' />;
			case 'sms':
				return <MessageSquare className='h-4 w-4' />;
			case 'push':
				return <Bell className='h-4 w-4' />;
			case 'retargeting':
				return <Target className='h-4 w-4' />;
			default:
				return <Play className='h-4 w-4' />;
		}
	};

	const getActionColor = (type?: string) => {
		switch (type) {
			case 'email':
				return 'bg-blue-50 border-blue-200';
			case 'sms':
				return 'bg-green-50 border-green-200';
			case 'push':
				return 'bg-purple-50 border-purple-200';
			case 'retargeting':
				return 'bg-orange-50 border-orange-200';
			default:
				return 'bg-gray-50 border-gray-200';
		}
	};

	const getPriorityColor = (priority?: string) => {
		switch (priority) {
			case 'high':
				return 'destructive';
			case 'medium':
				return 'secondary';
			case 'low':
				return 'outline';
			default:
				return 'outline';
		}
	};

	const formatFrequency = (frequency?: string) => {
		switch (frequency) {
			case 'immediate':
				return 'Immediate';
			case 'after_1h':
				return 'After 1 hour';
			case 'after_24h':
				return 'After 24 hours';
			case 'after_72h':
				return 'After 72 hours';
			default:
				return 'Not set';
		}
	};

	return (
		<Card
			className={`min-w-[250px] cursor-pointer transition-all duration-200 ${getActionColor(action?.type)} ${
				selected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
			}`}>
			<Handle
				type='target'
				position={Position.Top}
				className='!bg-primary !border-primary !w-3 !h-3'
			/>

			<CardHeader className='pb-2'>
				<div className='flex items-center justify-between'>
					<CardTitle className='text-sm flex items-center gap-2'>
						{getActionIcon(action?.type)}
						{nodeName || 'Untitled Action'}
					</CardTitle>
					<div className='flex gap-1'>
						{priority && (
							<Badge
								variant={getPriorityColor(priority) as any}
								className='text-xs'>
								{priority}
							</Badge>
						)}
						<Settings className='h-3 w-3 text-muted-foreground' />
					</div>
				</div>
			</CardHeader>

			<CardContent className='space-y-2'>
				{action && (
					<div className='space-y-2'>
						<div className='text-xs text-muted-foreground'>
							<span className='font-medium'>Action Type:</span> {action.type?.toUpperCase()}
						</div>

						{action.template && (
							<div className='text-xs'>
								<span className='font-medium'>Template:</span> {action.template}
							</div>
						)}

						{action.discount && (
							<div className='text-xs'>
								<span className='font-medium'>Discount:</span> {action.discount}%
							</div>
						)}

						<div className='text-xs'>
							<span className='font-medium'>Frequency:</span> {formatFrequency(action.frequency)}
						</div>

						{action.checkResponse && (
							<div className='text-xs'>
								<span className='font-medium'>Response Check:</span>
								<Badge
									variant='outline'
									className='ml-1 text-xs'>
									{action.responseTimeout}h timeout
								</Badge>
							</div>
						)}
					</div>
				)}

				{description && <div className='text-xs text-muted-foreground'>{description}</div>}
			</CardContent>

			<Handle
				type='source'
				position={Position.Bottom}
				className='!bg-primary !border-primary !w-3 !h-3'
			/>
		</Card>
	);
};
