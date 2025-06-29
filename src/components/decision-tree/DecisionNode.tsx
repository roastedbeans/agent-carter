import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DecisionNodeData } from '@/types/decision-tree';
import { GitBranch, Settings } from 'lucide-react';

interface DecisionNodeProps {
	data: DecisionNodeData;
	selected?: boolean;
	id: string;
}

export const DecisionNode: React.FC<DecisionNodeProps> = ({ data, selected, id }) => {
	const { nodeName, decisionType, condition, priority, description } = data;

	const formatCondition = () => {
		if (!condition) return 'No condition set';
		return `${condition.property} ${condition.operator} ${condition.value}`;
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

	return (
		<Card
			className={`min-w-[250px] cursor-pointer transition-all duration-200 ${
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
						<GitBranch className='h-4 w-4 text-primary' />
						{nodeName || 'Untitled Decision'}
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
				{decisionType && (
					<div className='text-xs text-muted-foreground'>
						<span className='font-medium'>Type:</span> {decisionType.replace('_', ' ')}
					</div>
				)}

				<div className='text-xs'>
					<span className='font-medium'>Condition:</span>
					<div className='bg-muted p-2 rounded text-xs mt-1'>{formatCondition()}</div>
				</div>

				{description && <div className='text-xs text-muted-foreground'>{description}</div>}
			</CardContent>

			<Handle
				type='source'
				position={Position.Bottom}
				id='true'
				className='!bg-green-500 !border-green-500 !w-3 !h-3 !left-[25%]'
			/>
			<Handle
				type='source'
				position={Position.Bottom}
				id='false'
				className='!bg-red-500 !border-red-500 !w-3 !h-3 !left-[75%]'
			/>

			{/* Labels for true/false handles */}
			<div className='absolute -bottom-6 left-[25%] transform -translate-x-1/2 text-xs text-green-600 font-medium'>
				True
			</div>
			<div className='absolute -bottom-6 left-[75%] transform -translate-x-1/2 text-xs text-red-600 font-medium'>
				False
			</div>
		</Card>
	);
};
