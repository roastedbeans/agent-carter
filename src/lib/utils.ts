import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Position, Node } from '@xyflow/react';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Utility function to get edge connection parameters
export function getEdgeParams(source: Node, target: Node) {
	const sourceIntersectionPoint = getNodeIntersection(source, target);
	const targetIntersectionPoint = getNodeIntersection(target, source);

	const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
	const targetPos = getEdgePosition(target, targetIntersectionPoint);

	return {
		sx: sourceIntersectionPoint.x,
		sy: sourceIntersectionPoint.y,
		tx: targetIntersectionPoint.x,
		ty: targetIntersectionPoint.y,
		sourcePos,
		targetPos,
	};
}

// Get the intersection point on the node's edge
function getNodeIntersection(intersectionNode: Node, targetNode: Node) {
	const {
		width: intersectionNodeWidth,
		height: intersectionNodeHeight,
		positionAbsolute: intersectionNodePosition,
	} = intersectionNode;
	const targetPosition = targetNode.positionAbsolute;

	const w = (intersectionNodeWidth ?? 0) / 2;
	const h = (intersectionNodeHeight ?? 0) / 2;

	const x2 = (intersectionNodePosition?.x ?? 0) + w;
	const y2 = (intersectionNodePosition?.y ?? 0) + h;
	const x1 = (targetPosition?.x ?? 0) + (targetNode.width ?? 0) / 2;
	const y1 = (targetPosition?.y ?? 0) + (targetNode.height ?? 0) / 2;

	const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
	const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
	const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
	const xx3 = a * xx1;
	const yy3 = a * yy1;
	const x = w * (xx3 + yy3) + x2;
	const y = h * (-xx3 + yy3) + y2;

	return { x, y };
}

// Get the position (side) where the edge should connect
function getEdgePosition(node: Node, intersectionPoint: { x: number; y: number }) {
	const n = { ...node.positionAbsolute, ...node };
	const nx = (n.x ?? 0) + (n.width ?? 0) / 2;
	const ny = (n.y ?? 0) + (n.height ?? 0) / 2;
	const px = intersectionPoint.x;
	const py = intersectionPoint.y;

	const dx = Math.abs(px - nx);
	const dy = Math.abs(py - ny);

	if (dx > dy) {
		return px < nx ? Position.Left : Position.Right;
	}

	return py < ny ? Position.Top : Position.Bottom;
}
