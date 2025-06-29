import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { DecisionNodeData, PROPERTY_OPTIONS, ACTION_TEMPLATES } from '@/types/decision-tree';
import { X, Save } from 'lucide-react';

interface PropertyPanelProps {
	selectedNode: { id: string; data: DecisionNodeData } | null;
	onUpdateNode: (nodeId: string, data: DecisionNodeData) => void;
	onClose: () => void;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({ selectedNode, onUpdateNode, onClose }) => {
	const [formData, setFormData] = React.useState<DecisionNodeData | null>(null);

	React.useEffect(() => {
		if (selectedNode) {
			setFormData({ ...selectedNode.data });
		}
	}, [selectedNode]);

	if (!selectedNode || !formData) {
		return (
			<Card className='w-80 h-fit'>
				<CardHeader>
					<CardTitle className='text-sm'>Node Properties</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-sm text-muted-foreground'>Select a node to edit its properties</p>
				</CardContent>
			</Card>
		);
	}

	const handleSave = () => {
		onUpdateNode(selectedNode.id, formData);
	};

	const updateFormData = (updates: Partial<DecisionNodeData>) => {
		setFormData((prev) => (prev ? { ...prev, ...updates } : null));
	};

	const updateCondition = (updates: Partial<typeof formData.condition>) => {
		setFormData((prev) =>
			prev
				? {
						...prev,
						condition: { ...prev.condition, ...updates } as any,
				  }
				: null
		);
	};

	const updateAction = (updates: Partial<typeof formData.action>) => {
		setFormData((prev) =>
			prev
				? {
						...prev,
						action: { ...prev.action, ...updates } as any,
				  }
				: null
		);
	};

	return (
		<Card className='w-80 h-fit max-h-[80vh] overflow-y-auto'>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<CardTitle className='text-sm'>Node Properties</CardTitle>
					<div className='flex gap-2'>
						<button
							onClick={handleSave}
							className='p-1 hover:bg-muted rounded'
							title='Save changes'>
							<Save className='h-4 w-4' />
						</button>
						<button
							onClick={onClose}
							className='p-1 hover:bg-muted rounded'
							title='Close panel'>
							<X className='h-4 w-4' />
						</button>
					</div>
				</div>
			</CardHeader>

			<CardContent className='space-y-4'>
				{/* Basic Properties */}
				<div className='space-y-2'>
					<label className='text-sm font-medium'>Node Type</label>
					<Select
						value={formData.nodeType}
						onChange={(e) => updateFormData({ nodeType: e.target.value as any })}>
						<option value='start'>Start</option>
						<option value='decision'>Decision</option>
						<option value='action'>Action</option>
					</Select>
				</div>

				<div className='space-y-2'>
					<label className='text-sm font-medium'>Node Name</label>
					<Input
						value={formData.nodeName}
						onChange={(e) => updateFormData({ nodeName: e.target.value })}
						placeholder='Enter node name'
					/>
				</div>

				<div className='space-y-2'>
					<label className='text-sm font-medium'>Description</label>
					<Input
						value={formData.description || ''}
						onChange={(e) => updateFormData({ description: e.target.value })}
						placeholder='Enter description'
					/>
				</div>

				<div className='space-y-2'>
					<label className='text-sm font-medium'>Priority</label>
					<Select
						value={formData.priority || ''}
						onChange={(e) => updateFormData({ priority: e.target.value as any })}>
						<option value=''>Select priority</option>
						<option value='high'>High</option>
						<option value='medium'>Medium</option>
						<option value='low'>Low</option>
					</Select>
				</div>

				{/* Decision-specific properties */}
				{formData.nodeType === 'decision' && (
					<>
						<div className='space-y-2'>
							<label className='text-sm font-medium'>Decision Type</label>
							<Select
								value={formData.decisionType || ''}
								onChange={(e) => updateFormData({ decisionType: e.target.value as any })}>
								<option value=''>Select decision type</option>
								<option value='customer_property'>Customer Property</option>
								<option value='cart_property'>Cart Property</option>
								<option value='event_occurred'>Event Occurred</option>
								<option value='custom_condition'>Custom Condition</option>
							</Select>
						</div>

						{formData.decisionType && formData.decisionType !== 'custom_condition' && (
							<div className='space-y-2'>
								<label className='text-sm font-medium'>Property</label>
								<Select
									value={formData.condition?.property || ''}
									onChange={(e) => updateCondition({ property: e.target.value })}>
									<option value=''>Select property</option>
									{PROPERTY_OPTIONS[formData.decisionType]?.map((option) => (
										<option
											key={option.value}
											value={option.value}>
											{option.label}
										</option>
									))}
								</Select>
							</div>
						)}

						<div className='space-y-2'>
							<label className='text-sm font-medium'>Condition</label>
							<div className='flex gap-2'>
								<Select
									value={formData.condition?.operator || ''}
									onChange={(e) => updateCondition({ operator: e.target.value as any })}
									className='w-20'>
									<option value=''>Op</option>
									<option value='>='>≥</option>
									<option value='<='>≤</option>
									<option value='>'>&gt;</option>
									<option value='<'>&lt;</option>
									<option value='='>=</option>
									<option value='!='>≠</option>
								</Select>
								<Input
									value={formData.condition?.value || ''}
									onChange={(e) => updateCondition({ value: e.target.value })}
									placeholder='Value'
									className='flex-1'
								/>
							</div>
						</div>
					</>
				)}

				{/* Action-specific properties */}
				{formData.nodeType === 'action' && (
					<>
						<div className='space-y-2'>
							<label className='text-sm font-medium'>Action Type</label>
							<Select
								value={formData.action?.type || ''}
								onChange={(e) => updateAction({ type: e.target.value as any })}>
								<option value=''>Select action type</option>
								<option value='email'>Email</option>
								<option value='sms'>SMS</option>
								<option value='push'>Push Notification</option>
								<option value='retargeting'>Retargeting</option>
								<option value='custom'>Custom</option>
							</Select>
						</div>

						{formData.action?.type && ACTION_TEMPLATES[formData.action.type as keyof typeof ACTION_TEMPLATES] && (
							<div className='space-y-2'>
								<label className='text-sm font-medium'>Template</label>
								<Select
									value={formData.action?.template || ''}
									onChange={(e) => updateAction({ template: e.target.value })}>
									<option value=''>Select template</option>
									{ACTION_TEMPLATES[formData.action.type as keyof typeof ACTION_TEMPLATES]?.map((template) => (
										<option
											key={template.value}
											value={template.value}>
											{template.label}
										</option>
									))}
								</Select>
							</div>
						)}

						<div className='space-y-2'>
							<label className='text-sm font-medium'>Discount (%)</label>
							<Input
								type='number'
								value={formData.action?.discount || ''}
								onChange={(e) => updateAction({ discount: parseInt(e.target.value) || 0 })}
								placeholder='0'
								min='0'
								max='100'
							/>
						</div>

						<div className='space-y-2'>
							<label className='text-sm font-medium'>Frequency</label>
							<Select
								value={formData.action?.frequency || ''}
								onChange={(e) => updateAction({ frequency: e.target.value as any })}>
								<option value=''>Select frequency</option>
								<option value='immediate'>Immediate</option>
								<option value='after_1h'>After 1 hour</option>
								<option value='after_24h'>After 24 hours</option>
								<option value='after_72h'>After 72 hours</option>
							</Select>
						</div>

						<div className='space-y-2'>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={formData.action?.checkResponse || false}
									onChange={(e) => updateAction({ checkResponse: e.target.checked })}
									className='rounded'
								/>
								<span className='text-sm font-medium'>Check Response</span>
							</label>
						</div>

						{formData.action?.checkResponse && (
							<div className='space-y-2'>
								<label className='text-sm font-medium'>Response Timeout (hours)</label>
								<Input
									type='number'
									value={formData.action?.responseTimeout || ''}
									onChange={(e) => updateAction({ responseTimeout: parseInt(e.target.value) || 24 })}
									placeholder='24'
									min='1'
								/>
							</div>
						)}
					</>
				)}

				<div className='pt-4 border-t'>
					<div className='flex gap-2'>
						<button
							onClick={handleSave}
							className='flex-1 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm hover:bg-primary/90'>
							Save Changes
						</button>
						<button
							onClick={onClose}
							className='px-3 py-2 border rounded-md text-sm hover:bg-muted'>
							Cancel
						</button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
