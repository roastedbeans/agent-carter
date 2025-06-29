import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DecisionNodeData } from '@/types/decision-tree';
import { PlayCircle } from 'lucide-react';

interface StartNodeProps {
	data: DecisionNodeData;
	selected?: boolean;
	id: string;
}

export const StartNode: React.FC<StartNodeProps> = ({ data, selected, id }) => {
	const { nodeName, description } = data;

	return (
		<Card
			className={`min-w-[200px] cursor-pointer transition-all duration-200 bg-green-50 border-green-200 ${
				selected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
			}`}>
			<CardHeader className='pb-2'>
				<CardTitle className='text-sm flex items-center gap-2'>
					<PlayCircle className='h-4 w-4 text-green-600' />
					{nodeName || 'Start'}
				</CardTitle>
			</CardHeader>

			<CardContent>
				<div className='text-xs text-muted-foreground'>{description || 'Decision tree starting point'}</div>
			</CardContent>

			<Handle
				type='source'
				position={Position.Bottom}
				className='!bg-green-600 !border-green-600 !w-3 !h-3'
			/>
		</Card>
	);
};
