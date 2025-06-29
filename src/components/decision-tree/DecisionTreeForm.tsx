'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DecisionNodeData,
	PROPERTY_OPTIONS,
	ACTION_TEMPLATES,
	DecisionType,
	NodeType,
	ConditionOperator,
} from '@/types/decision-tree';
import { Plus, Trash2, Download, Play, GitBranch, Settings } from 'lucide-react';

interface DecisionRule {
	id: string;
	nodeName: string;
	decisionType: DecisionType;
	property: string;
	operator: ConditionOperator;
	value: string | number;
	priority: 'high' | 'medium' | 'low';
	description?: string;
	trueAction: ActionConfig;
	falseAction: ActionConfig;
}

interface ActionConfig {
	type: 'email' | 'sms' | 'push' | 'retargeting' | 'custom';
	template?: string;
	discount?: number;
	frequency: 'immediate' | 'after_1h' | 'after_24h' | 'after_72h';
	checkResponse: boolean;
	responseTimeout?: number;
	description?: string;
}

interface DecisionTreeFormProps {
	onGenerateTree: (rules: DecisionRule[]) => void;
}

const defaultActions = {
	firstHour: {
		type: 'email' as const,
		template: 'gentle_reminder',
		discount: 10,
		frequency: 'immediate' as const,
		checkResponse: true,
		responseTimeout: 6,
		description: 'Gentle reminder email with small discount',
	},
	twentyFourHours: {
		type: 'email' as const,
		template: 'urgent_reminder',
		discount: 15,
		frequency: 'immediate' as const,
		checkResponse: true,
		responseTimeout: 12,
		description: 'Urgent reminder with increased discount',
	},
	seventyTwoHours: {
		type: 'sms' as const,
		template: 'last_chance',
		discount: 20,
		frequency: 'immediate' as const,
		checkResponse: true,
		responseTimeout: 24,
		description: 'Last chance SMS with maximum discount',
	},
	noAction: {
		type: 'custom' as const,
		template: 'no_action',
		frequency: 'immediate' as const,
		checkResponse: false,
		description: 'No action - too early or too late',
	},
};

const defaultRules: DecisionRule[] = [
	// {
	// 	id: '1',
	// 	nodeName: 'Check Cart Value First',
	// 	decisionType: 'cart_property',
	// 	property: 'cart_value',
	// 	operator: '>=',
	// 	value: 50,
	// 	priority: 'high',
	// 	description: 'Only target carts worth $50 or more',
	// 	trueAction: { ...defaultActions.firstHour, description: 'Continue to time-based flow' },
	// 	falseAction: { ...defaultActions.noAction, description: 'Skip low-value carts' },
	// },
	// {
	// 	id: '2',
	// 	nodeName: '1 Hour After Abandonment',
	// 	decisionType: 'cart_property',
	// 	property: 'abandoned_duration',
	// 	operator: '>=',
	// 	value: 60,
	// 	priority: 'high',
	// 	description: 'Check if cart abandoned for at least 1 hour',
	// 	trueAction: { ...defaultActions.firstHour },
	// 	falseAction: { ...defaultActions.noAction, description: 'Wait longer before contacting' },
	// },
	{
		id: '3',
		nodeName: '24 Hours After Abandonment',
		decisionType: 'cart_property',
		property: 'abandoned_duration',
		operator: '>=',
		value: 1440,
		priority: 'medium',
		description: 'Check if cart abandoned for 24+ hours',
		trueAction: { ...defaultActions.twentyFourHours },
		falseAction: { ...defaultActions.noAction, description: 'Still in first day window' },
	},
	// {
	// 	id: '4',
	// 	nodeName: '72 Hours After Abandonment',
	// 	decisionType: 'cart_property',
	// 	property: 'abandoned_duration',
	// 	operator: '>=',
	// 	value: 4320,
	// 	priority: 'low',
	// 	description: 'Final attempt after 72+ hours',
	// 	trueAction: { ...defaultActions.seventyTwoHours },
	// 	falseAction: { ...defaultActions.noAction, description: 'Still within 72 hour window' },
	// },
];

export const DecisionTreeForm: React.FC<DecisionTreeFormProps> = ({ onGenerateTree }) => {
	const [rules, setRules] = useState<DecisionRule[]>(defaultRules);
	const [formTitle, setFormTitle] = useState('Abandoned Cart Recovery Flow');
	const [formDescription, setFormDescription] = useState(
		'Time-based automated cart recovery campaign with escalating incentives'
	);

	const addRule = () => {
		const newRule: DecisionRule = {
			...defaultRules[0],
			id: Date.now().toString(),
			nodeName: `Decision ${rules.length + 1}`,
			description: 'New decision rule',
		};
		setRules([...rules, newRule]);
	};

	const removeRule = (id: string) => {
		setRules(rules.filter((rule) => rule.id !== id));
	};

	const updateRule = (id: string, updates: Partial<DecisionRule>) => {
		setRules(rules.map((rule) => (rule.id === id ? { ...rule, ...updates } : rule)));
	};

	const updateAction = (ruleId: string, actionType: 'trueAction' | 'falseAction', updates: Partial<ActionConfig>) => {
		setRules(
			rules.map((rule) => (rule.id === ruleId ? { ...rule, [actionType]: { ...rule[actionType], ...updates } } : rule))
		);
	};

	const exportFormData = () => {
		const formData = {
			title: formTitle,
			description: formDescription,
			rules,
			timestamp: new Date().toISOString(),
		};
		const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'decision-tree-form.json';
		a.click();
		URL.revokeObjectURL(url);
	};

	const generateTree = () => {
		onGenerateTree(rules);
	};

	const ActionForm = ({
		action,
		onUpdate,
		title,
	}: {
		action: ActionConfig;
		onUpdate: (updates: Partial<ActionConfig>) => void;
		title: string;
	}) => (
		<div className='space-y-3 p-3 border rounded-lg bg-muted/30'>
			<h4 className='text-sm font-medium text-muted-foreground'>{title}</h4>

			<div className='grid grid-cols-2 gap-3'>
				<div>
					<label className='text-xs font-medium'>Action Type</label>
					<Select
						value={action.type}
						onChange={(e) => onUpdate({ type: e.target.value as any })}>
						<option value='email'>Email</option>
						<option value='sms'>SMS</option>
						<option value='push'>Push Notification</option>
						<option value='retargeting'>Retargeting</option>
						<option value='custom'>Custom</option>
					</Select>
				</div>

				<div>
					<label className='text-xs font-medium'>Template</label>
					<Select
						value={action.template || ''}
						onChange={(e) => onUpdate({ template: e.target.value })}>
						<option value=''>Select template</option>
						{ACTION_TEMPLATES[action.type]?.map((template) => (
							<option
								key={template.value}
								value={template.value}>
								{template.label}
							</option>
						))}
					</Select>
				</div>

				<div>
					<label className='text-xs font-medium'>Discount (%)</label>
					<Input
						type='number'
						value={action.discount || ''}
						onChange={(e) => onUpdate({ discount: parseInt(e.target.value) || 0 })}
						placeholder='0'
						min='0'
						max='100'
					/>
				</div>

				<div>
					<label className='text-xs font-medium'>Frequency</label>
					<Select
						value={action.frequency}
						onChange={(e) => onUpdate({ frequency: e.target.value as any })}>
						<option value='immediate'>Immediate</option>
						<option value='after_1h'>After 1 hour</option>
						<option value='after_24h'>After 24 hours</option>
						<option value='after_72h'>After 72 hours</option>
					</Select>
				</div>
			</div>

			<div className='flex items-center gap-3'>
				<label className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={action.checkResponse}
						onChange={(e) => onUpdate({ checkResponse: e.target.checked })}
						className='rounded'
					/>
					<span className='text-xs font-medium'>Check Response</span>
				</label>

				{action.checkResponse && (
					<div className='flex-1'>
						<Input
							type='number'
							value={action.responseTimeout || ''}
							onChange={(e) => onUpdate({ responseTimeout: parseInt(e.target.value) || 24 })}
							placeholder='24'
							min='1'
							className='text-xs'
						/>
						<span className='text-xs text-muted-foreground ml-1'>hours</span>
					</div>
				)}
			</div>

			<div>
				<label className='text-xs font-medium'>Description</label>
				<Input
					value={action.description || ''}
					onChange={(e) => onUpdate({ description: e.target.value })}
					placeholder='Action description...'
					className='text-xs'
				/>
			</div>
		</div>
	);

	return (
		<div className='space-y-6'>
			{/* Header */}
			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<Settings className='h-5 w-5' />
						Decision Tree Configuration
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div>
						<label className='text-sm font-medium'>Flow Title</label>
						<Input
							value={formTitle}
							onChange={(e) => setFormTitle(e.target.value)}
							placeholder='Enter flow title...'
						/>
					</div>
					<div>
						<label className='text-sm font-medium'>Description</label>
						<Input
							value={formDescription}
							onChange={(e) => setFormDescription(e.target.value)}
							placeholder='Enter flow description...'
						/>
					</div>
				</CardContent>
			</Card>

			{/* Decision Rules */}
			<div className='space-y-4'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold'>Decision Rules</h3>
					<div className='flex gap-2'>
						<Button
							onClick={addRule}
							size='sm'
							variant='outline'>
							<Plus className='h-4 w-4 mr-1' />
							Add Rule
						</Button>
						<Button
							onClick={exportFormData}
							size='sm'
							variant='outline'>
							<Download className='h-4 w-4 mr-1' />
							Export
						</Button>
					</div>
				</div>

				{rules.map((rule, index) => (
					<Card
						key={rule.id}
						className='border-l-4 border-l-primary'>
						<CardHeader className='pb-3'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-2'>
									<GitBranch className='h-4 w-4 text-primary' />
									<CardTitle className='text-base'>Rule {index + 1}</CardTitle>
									<Badge variant='outline'>{rule.priority}</Badge>
								</div>
								<Button
									onClick={() => removeRule(rule.id)}
									size='sm'
									variant='ghost'
									className='text-destructive hover:text-destructive'>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>
						</CardHeader>

						<CardContent className='space-y-4'>
							{/* Basic Properties */}
							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='text-sm font-medium'>Node Name</label>
									<Input
										value={rule.nodeName}
										onChange={(e) => updateRule(rule.id, { nodeName: e.target.value })}
										placeholder='Enter node name...'
									/>
								</div>

								<div>
									<label className='text-sm font-medium'>Priority</label>
									<Select
										value={rule.priority}
										onChange={(e) => updateRule(rule.id, { priority: e.target.value as any })}>
										<option value='high'>High</option>
										<option value='medium'>Medium</option>
										<option value='low'>Low</option>
									</Select>
								</div>

								<div>
									<label className='text-sm font-medium'>Decision Type</label>
									<Select
										value={rule.decisionType}
										onChange={(e) => updateRule(rule.id, { decisionType: e.target.value as DecisionType })}>
										<option value='customer_property'>Customer Property</option>
										<option value='cart_property'>Cart Property</option>
										<option value='event_occurred'>Event Occurred</option>
										<option value='custom_condition'>Custom Condition</option>
									</Select>
								</div>

								<div>
									<label className='text-sm font-medium'>Property</label>
									<Select
										value={rule.property}
										onChange={(e) => updateRule(rule.id, { property: e.target.value })}>
										<option value=''>Select property</option>
										{PROPERTY_OPTIONS[rule.decisionType]?.map((option) => (
											<option
												key={option.value}
												value={option.value}>
												{option.label}
											</option>
										))}
									</Select>
								</div>
							</div>

							{/* Condition */}
							<div className='grid grid-cols-3 gap-4'>
								<div>
									<label className='text-sm font-medium'>Operator</label>
									<Select
										value={rule.operator}
										onChange={(e) => updateRule(rule.id, { operator: e.target.value as ConditionOperator })}>
										<option value='>='>&gt;=</option>
										<option value='<='>&lt;=</option>
										<option value='>'>&gt;</option>
										<option value='<'>&lt;</option>
										<option value='='>=</option>
										<option value='!='>!=</option>
									</Select>
								</div>

								<div>
									<label className='text-sm font-medium'>Value</label>
									<Input
										value={rule.value}
										onChange={(e) => updateRule(rule.id, { value: e.target.value })}
										placeholder='Condition value...'
									/>
								</div>

								<div>
									<label className='text-sm font-medium'>Description</label>
									<Input
										value={rule.description || ''}
										onChange={(e) => updateRule(rule.id, { description: e.target.value })}
										placeholder='Rule description...'
									/>
								</div>
							</div>

							{/* Actions */}
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
								<ActionForm
									action={rule.trueAction}
									onUpdate={(updates) => updateAction(rule.id, 'trueAction', updates)}
									title='✅ True Branch Action'
								/>
								<ActionForm
									action={rule.falseAction}
									onUpdate={(updates) => updateAction(rule.id, 'falseAction', updates)}
									title='❌ False Branch Action'
								/>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Generate Button */}
			<div className='flex justify-center pt-6'>
				<Button
					onClick={generateTree}
					size='lg'
					className='min-w-[200px]'>
					<Play className='h-5 w-5 mr-2' />
					Generate Decision Tree
				</Button>
			</div>
		</div>
	);
};
