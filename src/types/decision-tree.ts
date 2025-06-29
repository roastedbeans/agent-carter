export type NodeType = 'decision' | 'action' | 'start';

export type DecisionType = 'customer_property' | 'cart_property' | 'event_occurred' | 'custom_condition';

export type ConditionOperator = '>=' | '<=' | '>' | '<' | '=' | '!=';

export interface DecisionCondition {
	property: string; // e.g., 'cart_value', 'item_count', 'cart_count', 'customer_tier'
	operator: ConditionOperator;
	value: string | number;
}

export interface ActionConfig {
	type: 'email' | 'sms' | 'push' | 'retargeting' | 'custom';
	template?: string;
	discount?: number;
	frequency?: 'immediate' | 'after_1h' | 'after_24h' | 'after_72h';
	checkResponse?: boolean;
	responseTimeout?: number; // hours
}

export interface DecisionNodeData extends Record<string, unknown> {
	nodeType: NodeType;
	nodeName: string;
	decisionType?: DecisionType;
	condition?: DecisionCondition;
	trueBranch?: string;
	falseBranch?: string;
	action?: ActionConfig;
	description?: string;
	priority?: 'high' | 'medium' | 'low';
}

export interface FlowNode {
	id: string;
	type: string;
	position: { x: number; y: number };
	data: DecisionNodeData;
}

export interface FlowEdge {
	id: string;
	source: string;
	target: string;
	label?: string;
	type?: string;
}

export const PROPERTY_OPTIONS = {
	customer_property: [
		{ value: 'customer_tier', label: 'Customer Tier' },
		{ value: 'purchase_history', label: 'Purchase History' },
		{ value: 'email_subscribed', label: 'Email Subscribed' },
		{ value: 'sms_subscribed', label: 'SMS Subscribed' },
		{ value: 'marketing_segment', label: 'Marketing Segment' },
		{ value: 'last_engagement', label: 'Last Engagement' },
	],
	cart_property: [
		{ value: 'cart_value', label: 'Cart Value ($)' },
		{ value: 'abandoned_duration', label: 'Time Since Abandoned (minutes)' },
		{ value: 'item_count', label: 'Item Count' },
		{ value: 'cart_count', label: 'Cart Count' },
		{ value: 'product_category', label: 'Product Category' },
		{ value: 'high_value_items', label: 'Contains High-Value Items' },
	],
	event_occurred: [
		{ value: 'email_opened', label: 'Email Opened' },
		{ value: 'email_clicked', label: 'Email Clicked' },
		{ value: 'sms_delivered', label: 'SMS Delivered' },
		{ value: 'push_opened', label: 'Push Notification Opened' },
		{ value: 'website_visited', label: 'Website Visited' },
	],
	custom_condition: [
		{ value: 'custom_rule', label: 'Custom Rule' },
		{ value: 'complex_logic', label: 'Complex Logic' },
		{ value: 'external_data', label: 'External Data Source' },
	],
};

export const ACTION_TEMPLATES = {
	email: [
		{ value: 'gentle_reminder', label: 'Gentle Reminder (1-6 hours)' },
		{ value: 'urgent_reminder', label: 'Urgent Reminder (24+ hours)' },
		{ value: 'high_value_cart', label: 'High Value Cart Recovery' },
		{ value: 'first_time_buyer', label: 'First Time Buyer' },
		{ value: 'loyalty_customer', label: 'Loyalty Customer' },
		{ value: 'seasonal_offer', label: 'Seasonal Offer' },
		{ value: 'last_chance', label: 'Last Chance Email' },
	],
	sms: [
		{ value: 'urgent_reminder', label: 'Urgent Reminder' },
		{ value: 'last_chance', label: 'Last Chance SMS (72+ hours)' },
		{ value: 'flash_sale', label: 'Flash Sale Alert' },
		{ value: 'back_in_stock', label: 'Back in Stock' },
	],
	push: [
		{ value: 'cart_reminder', label: 'Cart Reminder' },
		{ value: 'price_drop', label: 'Price Drop Alert' },
		{ value: 'limited_time', label: 'Limited Time Offer' },
	],
	retargeting: [
		{ value: 'facebook_ads', label: 'Facebook Retargeting' },
		{ value: 'google_ads', label: 'Google Ads Retargeting' },
		{ value: 'display_banner', label: 'Display Banner Campaign' },
	],
	custom: [
		{ value: 'no_action', label: 'No Action (Skip)' },
		{ value: 'webhook', label: 'Webhook Integration' },
		{ value: 'api_call', label: 'API Call' },
		{ value: 'custom_script', label: 'Custom Script' },
	],
};
