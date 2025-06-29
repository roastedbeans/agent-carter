export type NetworkRole = 'home' | 'visited' | 'roaming';

export type ProtocolType =
	| 'N1'
	| 'N2'
	| 'N3'
	| 'N4'
	| 'N6'
	| 'N8'
	| 'N9'
	| 'N10'
	| 'N11'
	| 'N12'
	| 'N13'
	| 'N14'
	| 'N15'
	| 'N27'
	| 'N32'
	| 'SBI';

export interface NetworkFunction {
	id: string;
	name: string;
	type: string;
	status: 'active' | 'inactive' | 'error';
	slug: string;
	plmn?: {
		id: string;
		role: NetworkRole;
		name: string;
	};
	ipAddress?: string;
	protocols?: string[];
	position?: { x: number; y: number };
}

export interface Connection {
	id: string;
	source: string;
	target: string;
	protocol?: ProtocolType;
	type?: string;
	data?: Record<string, any>;
}

export interface Message {
	id: string;
	timestamp: string;
	source: string;
	target: string;
	type: string;
	content: string;
	protocol?: ProtocolType;
}
