'use client';

import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
	ReactFlow,
	Node,
	Edge,
	addEdge,
	useNodesState,
	useEdgesState,
	Connection,
	Background,
	Controls,
	MiniMap,
	NodeTypes,
	useReactFlow,
	BackgroundVariant,
	MarkerType,
	ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DecisionNode } from './DecisionNode';
import { ActionNode } from './ActionNode';
import { StartNode } from './StartNode';
import { PropertyPanel } from './PropertyPanel';
import { DecisionTreeForm } from './DecisionTreeForm';
import { DecisionNodeData, FlowNode, FlowEdge } from '@/types/decision-tree';
import { Plus, GitBranch, Play, Settings, Download, Upload, Workflow, FormInput } from 'lucide-react';

interface DecisionRule {
	id: string;
	nodeName: string;
	decisionType: 'customer_property' | 'cart_property' | 'event_occurred' | 'custom_condition';
	property: string;
	operator: '>=' | '<=' | '>' | '<' | '=' | '!=';
	value: string | number;
	priority: 'high' | 'medium' | 'low';
	description?: string;
	trueAction: {
		type: 'email' | 'sms' | 'push' | 'retargeting' | 'custom';
		template?: string;
		discount?: number;
		frequency: 'immediate' | 'after_1h' | 'after_24h' | 'after_72h';
		checkResponse: boolean;
		responseTimeout?: number;
		description?: string;
	};
	falseAction: {
		type: 'email' | 'sms' | 'push' | 'retargeting' | 'custom';
		template?: string;
		discount?: number;
		frequency: 'immediate' | 'after_1h' | 'after_24h' | 'after_72h';
		checkResponse: boolean;
		responseTimeout?: number;
		description?: string;
	};
}

// Define our custom Node type with DecisionNodeData
type CustomNode = Node<DecisionNodeData>;

const nodeTypes: NodeTypes = {
	decision: DecisionNode,
	action: ActionNode,
	start: StartNode,
};

// Node type color map for visual consistency
const nodeTypeColorMap: Record<string, string> = {
	start: '#22c55e',
	decision: '#3b82f6',
	action: '#f59e0b',
	DEFAULT: '#6b7280',
};

// Priority color map
const priorityColorMap: Record<string, string> = {
	high: '#ef4444',
	medium: '#f59e0b',
	low: '#22c55e',
	DEFAULT: '#6b7280',
};

const initialNodes: CustomNode[] = [
	{
		id: 'start-1',
		type: 'start',
		position: { x: 600, y: 100 }, // Centered and more space from top
		data: {
			nodeType: 'start',
			nodeName: 'Cart Abandoned',
			description: 'A customer has abandoned their cart',
		},
	},
];

const initialEdges: Edge[] = [];

// Simplified auto layout function for decision tree nodes with expanded spacing
const calculateDecisionTreeLayout = (
	nodes: CustomNode[],
	edges: Edge[],
	existingPositions: Record<string, { x: number; y: number }> = {},
	forceLayout = false
): Record<string, { x: number; y: number }> => {
	if (!forceLayout && Object.keys(existingPositions).length > 0) {
		return existingPositions;
	}

	const newPositions: Record<string, { x: number; y: number }> = {};
	const visited = new Set<string>();

	// Find start node
	const startNode = nodes.find((node) => node.data.nodeType === 'start');
	if (!startNode) return existingPositions;

	// Breadth-first layout with simplified positioning
	const queue: Array<{ id: string; level: number }> = [{ id: startNode.id, level: 0 }];
	const levelNodes: Record<number, string[]> = {};

	// Group nodes by level
	while (queue.length > 0) {
		const { id, level } = queue.shift()!;

		if (visited.has(id)) continue;
		visited.add(id);

		if (!levelNodes[level]) levelNodes[level] = [];
		levelNodes[level].push(id);

		// Find child nodes
		const childEdges = edges.filter((edge) => edge.source === id);
		childEdges.forEach((edge) => {
			if (!visited.has(edge.target)) {
				queue.push({
					id: edge.target,
					level: level + 1,
				});
			}
		});
	}

	// Position nodes with expanded spacing
	Object.entries(levelNodes).forEach(([levelStr, nodeIds]) => {
		const level = parseInt(levelStr);
		// Increased vertical spacing from 200 to 350
		const y = 150 + level * 350;

		nodeIds.forEach((nodeId, index) => {
			const totalNodes = nodeIds.length;
			const centerX = 600; // Moved center slightly right
			// Increased minimum horizontal spacing from 250 to 400
			const minSpacing = 400;
			const maxSpacing = 800;

			let x: number;
			if (totalNodes === 1) {
				x = centerX;
			} else if (totalNodes === 2) {
				// For two nodes, place them wider apart
				x = centerX + (index === 0 ? -maxSpacing / 2 : maxSpacing / 2);
			} else {
				// For multiple nodes, distribute evenly with generous spacing
				const totalWidth = Math.max(minSpacing * (totalNodes - 1), maxSpacing);
				x = centerX - totalWidth / 2 + (totalWidth / (totalNodes - 1)) * index;
			}

			newPositions[nodeId] = { x, y };
		});
	});

	return newPositions;
};

// Separate component that uses useReactFlow
const DecisionTreeFlow: React.FC<{
	mode: 'visual' | 'form';
	onGenerateTree: (rules: DecisionRule[]) => void;
}> = ({ mode, onGenerateTree }) => {
	const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
	const [selectedNode, setSelectedNode] = useState<{ id: string; data: DecisionNodeData } | null>(null);
	const [showPropertyPanel, setShowPropertyPanel] = useState(false);
	const [hasAppliedLayout, setHasAppliedLayout] = useState(false);
	const [isClient, setIsClient] = useState(false);

	const reactFlowWrapper = useRef<HTMLDivElement>(null);
	const { zoomIn, zoomOut, fitView } = useReactFlow();

	// Client-side rendering check
	useEffect(() => {
		setIsClient(true);
	}, []);

	// Process nodes with enhanced visual properties
	useEffect(() => {
		// Preserve existing node positions
		const nodePositions: Record<string, { x: number; y: number }> = {};
		nodes.forEach((node) => {
			nodePositions[node.id] = {
				x: node.position?.x ?? 0,
				y: node.position?.y ?? 0,
			};
		});

		// Calculate layout if needed
		const shouldApplyLayout = nodes.length > 1 && !hasAppliedLayout;
		const calculatedPositions = calculateDecisionTreeLayout(nodes, edges, nodePositions, shouldApplyLayout);

		if (shouldApplyLayout) {
			setHasAppliedLayout(true);
		}

		// Enhance nodes with visual properties
		const enhancedNodes = nodes.map((node) => {
			const nodeType = node.data.nodeType || 'DEFAULT';
			const priority = node.data.priority || 'medium';

			// Use calculated position or preserve existing position
			const position = calculatedPositions[node.id] || node.position || { x: 0, y: 0 };

			return {
				...node,
				position,
				data: {
					...node.data,
					typeColor: nodeTypeColorMap[nodeType] || nodeTypeColorMap.DEFAULT,
					priorityColor: priorityColorMap[priority] || priorityColorMap.DEFAULT,
					isSelected: selectedNodeId === node.id,
				},
			};
		});

		setNodes(enhancedNodes);
	}, [nodes.length, edges.length, hasAppliedLayout]);

	// Handle selection styling separately to avoid position resets
	useEffect(() => {
		setNodes((currentNodes) =>
			currentNodes.map((node) => ({
				...node,
				data: {
					...node.data,
					isSelected: selectedNodeId === node.id,
				},
			}))
		);
	}, [selectedNodeId, setNodes]);

	// Enhanced edge processing with better visual styling
	useEffect(() => {
		if (nodes.length === 0) return;

		const enhancedEdges = edges.map((edge) => {
			const isConnectedToSelected =
				selectedNodeId && (edge.source === selectedNodeId || edge.target === selectedNodeId);

			return {
				...edge,
				style: {
					...edge.style,
					opacity: selectedNodeId && !isConnectedToSelected ? 0.3 : 1,
					strokeWidth: isConnectedToSelected ? 3 : 2,
					zIndex: isConnectedToSelected ? 5 : 0,
				},
				markerEnd: {
					type: MarkerType.ArrowClosed,
					color: isConnectedToSelected ? undefined : 'rgba(0,0,0,0.3)',
				},
				animated: Boolean(isConnectedToSelected),
			};
		});

		setEdges(enhancedEdges);
	}, [nodes.length, selectedNodeId, edges.length]);

	// Enhanced connection handler
	const onConnect = useCallback(
		(params: Connection) => {
			const newEdge = {
				...params,
				label: params.sourceHandle === 'true' ? 'Yes' : params.sourceHandle === 'false' ? 'No' : '',
				style: {
					stroke: params.sourceHandle === 'true' ? '#22c55e' : params.sourceHandle === 'false' ? '#ef4444' : '#6b7280',
				},
				markerEnd: {
					type: MarkerType.ArrowClosed,
				},
			};
			setEdges((eds) => addEdge(newEdge, eds));
		},
		[setEdges]
	);

	// Enhanced node click handler with selection toggle
	const onNodeClick = useCallback(
		(event: React.MouseEvent, node: CustomNode) => {
			// Toggle selection
			const newSelectedId = selectedNodeId === node.id ? null : node.id;
			setSelectedNodeId(newSelectedId);

			if (newSelectedId) {
				setSelectedNode({ id: node.id, data: node.data });
				setShowPropertyPanel(true);
			} else {
				setSelectedNode(null);
				setShowPropertyPanel(false);
			}
		},
		[selectedNodeId]
	);

	// Clear selection when clicking on background
	const onPaneClick = useCallback(() => {
		setSelectedNodeId(null);
		setSelectedNode(null);
		setShowPropertyPanel(false);
	}, []);

	// Handle node drag to preserve positions
	const onNodeDragStop = useCallback(
		(event: React.MouseEvent, node: Node, nodes: Node[]) => {
			setNodes((prevNodes) => {
				return prevNodes.map((prevNode) => {
					if (prevNode.id === node.id) {
						return {
							...prevNode,
							position: node.position,
						};
					}
					const draggedNode = nodes.find((n) => n.id === prevNode.id);
					if (draggedNode) {
						return {
							...prevNode,
							position: draggedNode.position,
						};
					}
					return prevNode;
				});
			});
		},
		[setNodes]
	);

	// Auto layout handler
	const applyAutoLayout = useCallback(() => {
		setHasAppliedLayout(false);
	}, []);

	// Reset view
	const resetView = useCallback(() => {
		fitView({ padding: 0.2, duration: 300 });
	}, [fitView]);

	// Fit view on initial load
	useEffect(() => {
		if (nodes.length > 0) {
			const timer = setTimeout(() => {
				fitView({ padding: 0.2, duration: 500 });
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [nodes.length, fitView]);

	const addNode = (nodeType: 'decision' | 'action') => {
		const newNode: CustomNode = {
			id: `${nodeType}-${Date.now()}`,
			type: nodeType,
			position: {
				x: Math.random() * 800 + 200, // Wider spread: 200-1000
				y: Math.random() * 600 + 300, // More vertical space: 300-900
			},
			data: {
				nodeType,
				nodeName: nodeType === 'decision' ? 'New Decision' : 'New Action',
				description: '',
				priority: 'medium',
				...(nodeType === 'decision' && {
					decisionType: 'cart_property',
					condition: {
						property: 'cart_value',
						operator: '>=',
						value: 100,
					},
				}),
				...(nodeType === 'action' && {
					action: {
						type: 'email',
						template: 'high_value_cart',
						discount: 15,
						frequency: 'immediate',
						checkResponse: true,
						responseTimeout: 24,
					},
				}),
			} as DecisionNodeData,
		};

		setNodes((nds) => [...nds, newNode]);
	};

	const updateNode = (nodeId: string, data: DecisionNodeData) => {
		setNodes((nds) =>
			nds.map((node) => (node.id === nodeId ? ({ ...node, data, type: data.nodeType } as CustomNode) : node))
		);
		setSelectedNode({ id: nodeId, data });
	};

	const deleteSelectedNode = () => {
		if (selectedNode) {
			setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
			setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
			setSelectedNode(null);
			setSelectedNodeId(null);
			setShowPropertyPanel(false);
		}
	};

	const exportFlow = () => {
		const flowData = {
			nodes,
			edges,
			timestamp: new Date().toISOString(),
		};
		const blob = new Blob([JSON.stringify(flowData, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'decision-tree.json';
		a.click();
		URL.revokeObjectURL(url);
	};

	const importFlow = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const flowData = JSON.parse(e.target?.result as string);
					setNodes(flowData.nodes || []);
					setEdges(flowData.edges || []);
					setHasAppliedLayout(false); // Trigger layout recalculation
				} catch (error) {
					console.error('Error importing flow:', error);
				}
			};
			reader.readAsText(file);
		}
	};

	const generateTreeFromForm = (rules: DecisionRule[]) => {
		// Clear existing nodes except start node
		const startNode = initialNodes[0];
		const newNodes: CustomNode[] = [startNode];
		const newEdges: Edge[] = [];

		let yPosition = 500; // Start lower to give more space
		let previousNodeId = startNode.id;

		rules.forEach((rule, index) => {
			const decisionNodeId = `decision-${rule.id}`;
			const trueActionId = `action-true-${rule.id}`;
			const falseActionId = `action-false-${rule.id}`;

			// Create decision node (centered)
			const decisionNode: CustomNode = {
				id: decisionNodeId,
				type: 'decision',
				position: { x: 600, y: yPosition }, // Centered at 600
				data: {
					nodeType: 'decision',
					nodeName: rule.nodeName,
					description: rule.description || '',
					priority: rule.priority,
					decisionType: rule.decisionType,
					condition: {
						property: rule.property,
						operator: rule.operator,
						value: rule.value,
					},
				} as DecisionNodeData,
			};

			// Create true action node (left side, more spacing)
			const trueActionNode: CustomNode = {
				id: trueActionId,
				type: 'action',
				position: { x: 200, y: yPosition + 250 }, // Increased vertical gap to 250
				data: {
					nodeType: 'action',
					nodeName: `${rule.trueAction.description || 'True Action'}`,
					description: rule.trueAction.description || '',
					priority: 'medium',
					action: rule.trueAction,
				} as DecisionNodeData,
			};

			// Create false action node (right side, more spacing)
			const falseActionNode: CustomNode = {
				id: falseActionId,
				type: 'action',
				position: { x: 1000, y: yPosition + 250 }, // Moved further right, increased vertical gap
				data: {
					nodeType: 'action',
					nodeName: `${rule.falseAction.description || 'False Action'}`,
					description: rule.falseAction.description || '',
					priority: 'medium',
					action: rule.falseAction,
				} as DecisionNodeData,
			};

			newNodes.push(decisionNode, trueActionNode, falseActionNode);

			// Create edges
			// Connect previous node to decision node
			newEdges.push({
				id: `edge-${previousNodeId}-${decisionNodeId}`,
				source: previousNodeId,
				target: decisionNodeId,
				markerEnd: { type: MarkerType.ArrowClosed },
			});

			// Connect decision to actions
			newEdges.push({
				id: `edge-${decisionNodeId}-${trueActionId}`,
				source: decisionNodeId,
				target: trueActionId,
				sourceHandle: 'true',
				label: 'Yes',
				style: { stroke: '#22c55e' },
				markerEnd: { type: MarkerType.ArrowClosed },
			});

			newEdges.push({
				id: `edge-${decisionNodeId}-${falseActionId}`,
				source: decisionNodeId,
				target: falseActionId,
				sourceHandle: 'false',
				label: 'No',
				style: { stroke: '#ef4444' },
				markerEnd: { type: MarkerType.ArrowClosed },
			});

			yPosition += 450; // Increased from 300 to 450 for more vertical space
		});

		setNodes(newNodes);
		setEdges(newEdges);
		setHasAppliedLayout(false);

		// Call parent callback to switch mode
		onGenerateTree(rules);
	};

	if (!isClient) return null;

	if (mode === 'form') {
		return (
			<div className='flex-1 overflow-y-auto'>
				<DecisionTreeForm onGenerateTree={generateTreeFromForm} />
			</div>
		);
	}

	return (
		<div className='flex h-[80vh] gap-4'>
			{/* Main Flow Area */}
			<div className='flex-1 bg-background border border-border rounded-lg overflow-hidden'>
				<div
					className='h-full w-full relative'
					ref={reactFlowWrapper}>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						onNodeClick={onNodeClick}
						onNodeDragStop={onNodeDragStop}
						onPaneClick={onPaneClick}
						nodeTypes={nodeTypes}
						fitView
						minZoom={0.2}
						maxZoom={2}
						nodesDraggable={true}
						nodesConnectable={true}
						elementsSelectable={true}
						className='bg-background'>
						<Background
							variant={'dots' as BackgroundVariant}
							gap={16}
							size={0.5}
						/>
						<Controls />
						<MiniMap />
					</ReactFlow>

					{/* Enhanced Controls */}
					<div className='absolute top-3 left-3 z-10 flex space-x-1.5 bg-white dark:bg-gray-700 p-1.5 rounded shadow'>
						<Button
							onClick={resetView}
							title='Fit view'
							size='sm'
							variant='ghost'>
							Fit View
						</Button>
						<Button
							onClick={() => zoomIn()}
							title='Zoom In'
							size='sm'
							variant='ghost'>
							+
						</Button>
						<Button
							onClick={() => zoomOut()}
							title='Zoom Out'
							size='sm'
							variant='ghost'>
							-
						</Button>
						<Button
							onClick={applyAutoLayout}
							title='Auto Layout'
							size='sm'
							variant='ghost'>
							Auto Layout
						</Button>
					</div>

					{/* Toolbar */}
					<div className='absolute top-4 right-4 flex flex-col gap-2'>
						<Card className='p-2'>
							<div className='flex flex-col gap-2'>
								<button
									onClick={() => addNode('decision')}
									className='flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90'
									title='Add Decision Node'>
									<GitBranch className='h-4 w-4' />
									Decision
								</button>
								<button
									onClick={() => addNode('action')}
									className='flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-md text-sm hover:bg-secondary/90'
									title='Add Action Node'>
									<Play className='h-4 w-4' />
									Action
								</button>
								<div className='border-t pt-2'>
									<button
										onClick={exportFlow}
										className='flex items-center gap-2 px-3 py-2 bg-muted text-muted-foreground rounded-md text-sm hover:bg-muted/80 w-full'
										title='Export Flow'>
										<Download className='h-4 w-4' />
										Export
									</button>
									<label className='flex items-center gap-2 px-3 py-2 bg-muted text-muted-foreground rounded-md text-sm hover:bg-muted/80 w-full cursor-pointer mt-1'>
										<Upload className='h-4 w-4' />
										Import
										<input
											type='file'
											accept='.json'
											onChange={importFlow}
											className='hidden'
										/>
									</label>
								</div>
							</div>
						</Card>
					</div>

					{/* Selected Node Info */}
					{selectedNode && (
						<div className='absolute bottom-4 left-4'>
							<Card className='p-3 min-w-[200px]'>
								<div className='flex items-center justify-between mb-2'>
									<h3 className='font-medium text-sm'>{selectedNode.data.nodeName}</h3>
									<button
										onClick={() => setShowPropertyPanel(!showPropertyPanel)}
										className='p-1 hover:bg-muted rounded'
										title='Toggle Properties'>
										<Settings className='h-4 w-4' />
									</button>
								</div>
								<p className='text-xs text-muted-foreground mb-2'>{selectedNode.data.description}</p>
								<div className='flex gap-2'>
									<button
										onClick={deleteSelectedNode}
										className='px-2 py-1 bg-destructive text-destructive-foreground rounded text-xs hover:bg-destructive/90'>
										Delete
									</button>
								</div>
							</Card>
						</div>
					)}
				</div>
			</div>

			{/* Property Panel */}
			{showPropertyPanel && (
				<div className='w-80 flex-shrink-0'>
					<PropertyPanel
						selectedNode={selectedNode}
						onUpdateNode={updateNode}
						onClose={() => setShowPropertyPanel(false)}
					/>
				</div>
			)}
		</div>
	);
};

export const DecisionTreeBuilder: React.FC = () => {
	const [mode, setMode] = useState<'visual' | 'form'>('visual');

	const handleGenerateTreeFromForm = (rules: DecisionRule[]) => {
		setMode('visual');
	};

	return (
		<ReactFlowProvider>
			<div className='flex flex-col h-full gap-4'>
				{/* Mode Toggle */}
				<div className='flex justify-center'>
					<div className='flex bg-muted rounded-lg p-1'>
						<button
							onClick={() => setMode('form')}
							className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
								mode === 'form'
									? 'bg-background text-foreground shadow-sm'
									: 'text-muted-foreground hover:text-foreground'
							}`}>
							<FormInput className='h-4 w-4' />
							Form Builder
						</button>
						<button
							onClick={() => setMode('visual')}
							className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
								mode === 'visual'
									? 'bg-background text-foreground shadow-sm'
									: 'text-muted-foreground hover:text-foreground'
							}`}>
							<Workflow className='h-4 w-4' />
							Visual Builder
						</button>
					</div>
				</div>

				{/* Content Area */}
				<DecisionTreeFlow
					mode={mode}
					onGenerateTree={handleGenerateTreeFromForm}
				/>
			</div>
		</ReactFlowProvider>
	);
};
