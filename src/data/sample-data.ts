export interface Product {
	id: string;
	name: string;
	price: number;
	category: string;
}

export interface MarketingPreferences {
	emailSubscribed: boolean;
	smsSubscribed: boolean;
	pushNotifications: boolean;
	socialMediaRetargeting: boolean;
	directMail: boolean;
	subscriptionDate?: string;
	lastEngagement?: string;
	preferredContactTime?: 'morning' | 'afternoon' | 'evening';
	marketingSegment?: 'high_value' | 'frequent_buyer' | 'new_customer' | 'at_risk' | 'vip';
}

export interface AbandonedCart {
	id: string;
	customerName: string;
	customerEmail: string;
	products: Array<{
		product: Product;
		quantity: number;
	}>;
	cartValue: number;
	abandonedDate: string;
	status: 'abandoned' | 'recovered' | 'in_progress';
	recoveredDate?: string;
	recoveredAmount?: number;
	marketingPreferences: MarketingPreferences;
	recoveryAttempts?: {
		email?: { sent: boolean; opened?: boolean; clicked?: boolean; sentDate?: string };
		sms?: { sent: boolean; delivered?: boolean; replied?: boolean; sentDate?: string };
		push?: { sent: boolean; opened?: boolean; sentDate?: string };
		retargeting?: { active: boolean; impressions?: number; clicks?: number };
	};
}

// Sample product catalog
export const products: Product[] = [
	{ id: 'p1', name: 'Wireless Headphones', price: 89.99, category: 'Electronics' },
	{ id: 'p2', name: 'Bluetooth Speaker', price: 45.99, category: 'Electronics' },
	{ id: 'p3', name: 'Smart Watch', price: 199.99, category: 'Electronics' },
	{ id: 'p4', name: 'Phone Case', price: 19.99, category: 'Accessories' },
	{ id: 'p5', name: 'Laptop Stand', price: 34.99, category: 'Accessories' },
	{ id: 'p6', name: 'Gaming Mouse', price: 59.99, category: 'Electronics' },
	{ id: 'p7', name: 'Mechanical Keyboard', price: 129.99, category: 'Electronics' },
	{ id: 'p8', name: 'USB-C Cable', price: 12.99, category: 'Accessories' },
	{ id: 'p9', name: 'Portable Charger', price: 29.99, category: 'Electronics' },
	{ id: 'p10', name: 'Webcam', price: 79.99, category: 'Electronics' },
	{ id: 'p11', name: 'Desk Lamp', price: 39.99, category: 'Home' },
	{ id: 'p12', name: 'Coffee Mug', price: 14.99, category: 'Home' },
	{ id: 'p13', name: 'Notebook', price: 8.99, category: 'Stationery' },
	{ id: 'p14', name: 'Pen Set', price: 24.99, category: 'Stationery' },
	{ id: 'p15', name: 'Water Bottle', price: 22.99, category: 'Home' },
	{ id: 'p16', name: 'Yoga Mat', price: 49.99, category: 'Fitness' },
	{ id: 'p17', name: 'Resistance Bands', price: 19.99, category: 'Fitness' },
	{ id: 'p18', name: 'Protein Shaker', price: 16.99, category: 'Fitness' },
	{ id: 'p19', name: 'Backpack', price: 69.99, category: 'Accessories' },
	{ id: 'p20', name: 'Sunglasses', price: 89.99, category: 'Accessories' },
];

// Sample abandoned cart data with marketing preferences
export const abandonedCarts: AbandonedCart[] = [
	{
		id: 'cart1',
		customerName: 'John Smith',
		customerEmail: 'john.smith@email.com',
		products: [
			{ product: products[0], quantity: 1 },
			{ product: products[3], quantity: 2 },
		],
		cartValue: 129.97,
		abandonedDate: '2024-06-25',
		status: 'abandoned',
		marketingPreferences: {
			emailSubscribed: true,
			smsSubscribed: false,
			pushNotifications: true,
			socialMediaRetargeting: true,
			directMail: false,
			subscriptionDate: '2024-01-15',
			lastEngagement: '2024-06-20',
			preferredContactTime: 'evening',
			marketingSegment: 'frequent_buyer',
		},
		recoveryAttempts: {
			email: { sent: true, opened: true, clicked: false, sentDate: '2024-06-25' },
			push: { sent: true, opened: false, sentDate: '2024-06-26' },
			retargeting: { active: true, impressions: 45, clicks: 2 },
		},
	},
	{
		id: 'cart2',
		customerName: 'Sarah Johnson',
		customerEmail: 'sarah.j@email.com',
		products: [
			{ product: products[2], quantity: 1 },
			{ product: products[4], quantity: 1 },
		],
		cartValue: 234.98,
		abandonedDate: '2024-06-24',
		status: 'recovered',
		recoveredDate: '2024-06-26',
		recoveredAmount: 234.98,
		marketingPreferences: {
			emailSubscribed: true,
			smsSubscribed: true,
			pushNotifications: true,
			socialMediaRetargeting: true,
			directMail: true,
			subscriptionDate: '2023-11-08',
			lastEngagement: '2024-06-26',
			preferredContactTime: 'morning',
			marketingSegment: 'vip',
		},
		recoveryAttempts: {
			email: { sent: true, opened: true, clicked: true, sentDate: '2024-06-24' },
			sms: { sent: true, delivered: true, replied: false, sentDate: '2024-06-25' },
		},
	},
	{
		id: 'cart3',
		customerName: 'Mike Davis',
		customerEmail: 'mike.davis@email.com',
		products: [
			{ product: products[6], quantity: 1 },
			{ product: products[5], quantity: 1 },
		],
		cartValue: 189.98,
		abandonedDate: '2024-06-23',
		status: 'in_progress',
		marketingPreferences: {
			emailSubscribed: true,
			smsSubscribed: false,
			pushNotifications: false,
			socialMediaRetargeting: false,
			directMail: false,
			subscriptionDate: '2024-03-12',
			lastEngagement: '2024-06-23',
			preferredContactTime: 'afternoon',
			marketingSegment: 'high_value',
		},
		recoveryAttempts: {
			email: { sent: true, opened: true, clicked: true, sentDate: '2024-06-23' },
		},
	},
	{
		id: 'cart4',
		customerName: 'Emily Brown',
		customerEmail: 'emily.brown@email.com',
		products: [
			{ product: products[1], quantity: 2 },
			{ product: products[7], quantity: 3 },
		],
		cartValue: 130.95,
		abandonedDate: '2024-06-22',
		status: 'recovered',
		recoveredDate: '2024-06-24',
		recoveredAmount: 130.95,
		marketingPreferences: {
			emailSubscribed: true,
			smsSubscribed: true,
			pushNotifications: false,
			socialMediaRetargeting: true,
			directMail: false,
			subscriptionDate: '2024-02-28',
			lastEngagement: '2024-06-24',
			preferredContactTime: 'morning',
			marketingSegment: 'frequent_buyer',
		},
		recoveryAttempts: {
			email: { sent: true, opened: true, clicked: true, sentDate: '2024-06-22' },
			sms: { sent: true, delivered: true, replied: true, sentDate: '2024-06-23' },
			retargeting: { active: true, impressions: 32, clicks: 5 },
		},
	},
	{
		id: 'cart5',
		customerName: 'David Wilson',
		customerEmail: 'david.w@email.com',
		products: [
			{ product: products[9], quantity: 1 },
			{ product: products[10], quantity: 1 },
		],
		cartValue: 119.98,
		abandonedDate: '2024-06-21',
		status: 'abandoned',
		marketingPreferences: {
			emailSubscribed: false,
			smsSubscribed: false,
			pushNotifications: false,
			socialMediaRetargeting: false,
			directMail: false,
			subscriptionDate: '2024-04-10',
			lastEngagement: '2024-05-15',
			preferredContactTime: 'evening',
			marketingSegment: 'at_risk',
		},
		recoveryAttempts: {
			retargeting: { active: false, impressions: 0, clicks: 0 },
		},
	},
	{
		id: 'cart6',
		customerName: 'Lisa Garcia',
		customerEmail: 'lisa.garcia@email.com',
		products: [
			{ product: products[15], quantity: 1 },
			{ product: products[16], quantity: 2 },
		],
		cartValue: 89.97,
		abandonedDate: '2024-06-20',
		status: 'recovered',
		recoveredDate: '2024-06-22',
		recoveredAmount: 89.97,
		marketingPreferences: {
			emailSubscribed: true,
			smsSubscribed: false,
			pushNotifications: true,
			socialMediaRetargeting: true,
			directMail: true,
			subscriptionDate: '2023-09-14',
			lastEngagement: '2024-06-22',
			preferredContactTime: 'afternoon',
			marketingSegment: 'frequent_buyer',
		},
		recoveryAttempts: {
			email: { sent: true, opened: true, clicked: true, sentDate: '2024-06-20' },
			push: { sent: true, opened: true, sentDate: '2024-06-21' },
			retargeting: { active: true, impressions: 28, clicks: 3 },
		},
	},
	{
		id: 'cart7',
		customerName: 'Tom Anderson',
		customerEmail: 'tom.anderson@email.com',
		products: [
			{ product: products[18], quantity: 1 },
			{ product: products[19], quantity: 1 },
		],
		cartValue: 159.98,
		abandonedDate: '2024-06-19',
		status: 'abandoned',
		marketingPreferences: {
			emailSubscribed: true,
			smsSubscribed: true,
			pushNotifications: false,
			socialMediaRetargeting: false,
			directMail: false,
			subscriptionDate: '2024-01-22',
			lastEngagement: '2024-06-19',
			preferredContactTime: 'morning',
			marketingSegment: 'new_customer',
		},
		recoveryAttempts: {
			email: { sent: true, opened: false, clicked: false, sentDate: '2024-06-19' },
			sms: { sent: true, delivered: true, replied: false, sentDate: '2024-06-20' },
		},
	},
	{
		id: 'cart8',
		customerName: 'Jessica Lee',
		customerEmail: 'jessica.lee@email.com',
		products: [
			{ product: products[11], quantity: 3 },
			{ product: products[12], quantity: 2 },
		],
		cartValue: 62.95,
		abandonedDate: '2024-06-18',
		status: 'in_progress',
		marketingPreferences: {
			emailSubscribed: true,
			smsSubscribed: false,
			pushNotifications: true,
			socialMediaRetargeting: true,
			directMail: false,
			subscriptionDate: '2023-12-05',
			lastEngagement: '2024-06-18',
			preferredContactTime: 'evening',
			marketingSegment: 'frequent_buyer',
		},
		recoveryAttempts: {
			email: { sent: true, opened: true, clicked: false, sentDate: '2024-06-18' },
			push: { sent: true, opened: false, sentDate: '2024-06-19' },
			retargeting: { active: true, impressions: 22, clicks: 1 },
		},
	},
	{
		id: 'cart9',
		customerName: 'Robert Taylor',
		customerEmail: 'robert.taylor@email.com',
		products: [
			{ product: products[13], quantity: 1 },
			{ product: products[14], quantity: 1 },
		],
		cartValue: 47.98,
		abandonedDate: '2024-06-17',
		status: 'recovered',
		recoveredDate: '2024-06-19',
		recoveredAmount: 47.98,
		marketingPreferences: {
			emailSubscribed: true,
			smsSubscribed: true,
			pushNotifications: true,
			socialMediaRetargeting: false,
			directMail: true,
			subscriptionDate: '2023-08-30',
			lastEngagement: '2024-06-19',
			preferredContactTime: 'afternoon',
			marketingSegment: 'vip',
		},
		recoveryAttempts: {
			email: { sent: true, opened: true, clicked: true, sentDate: '2024-06-17' },
			sms: { sent: true, delivered: true, replied: true, sentDate: '2024-06-18' },
			push: { sent: true, opened: true, sentDate: '2024-06-18' },
		},
	},
	{
		id: 'cart10',
		customerName: 'Amanda White',
		customerEmail: 'amanda.white@email.com',
		products: [
			{ product: products[8], quantity: 2 },
			{ product: products[17], quantity: 1 },
		],
		cartValue: 76.97,
		abandonedDate: '2024-06-16',
		status: 'abandoned',
		marketingPreferences: {
			emailSubscribed: false,
			smsSubscribed: true,
			pushNotifications: false,
			socialMediaRetargeting: true,
			directMail: false,
			subscriptionDate: '2024-05-02',
			lastEngagement: '2024-06-10',
			preferredContactTime: 'morning',
			marketingSegment: 'at_risk',
		},
		recoveryAttempts: {
			sms: { sent: true, delivered: false, replied: false, sentDate: '2024-06-16' },
			retargeting: { active: true, impressions: 18, clicks: 0 },
		},
	},
	{
		id: 'cart11',
		customerName: 'Kevin Martinez',
		customerEmail: 'kevin.martinez@email.com',
		products: [
			{ product: products[0], quantity: 1 },
			{ product: products[1], quantity: 1 },
		],
		cartValue: 135.98,
		abandonedDate: '2024-06-15',
		status: 'recovered',
		recoveredDate: '2024-06-17',
		recoveredAmount: 135.98,
		marketingPreferences: {
			emailSubscribed: true,
			smsSubscribed: false,
			pushNotifications: true,
			socialMediaRetargeting: true,
			directMail: false,
			subscriptionDate: '2023-10-18',
			lastEngagement: '2024-06-17',
			preferredContactTime: 'evening',
			marketingSegment: 'high_value',
		},
		recoveryAttempts: {
			email: { sent: true, opened: true, clicked: true, sentDate: '2024-06-15' },
			push: { sent: true, opened: true, sentDate: '2024-06-16' },
			retargeting: { active: true, impressions: 35, clicks: 4 },
		},
	},
	{
		id: 'cart12',
		customerName: 'Michelle Clark',
		customerEmail: 'michelle.clark@email.com',
		products: [{ product: products[2], quantity: 1 }],
		cartValue: 199.99,
		abandonedDate: '2024-06-14',
		status: 'abandoned',
		marketingPreferences: {
			emailSubscribed: true,
			smsSubscribed: true,
			pushNotifications: false,
			socialMediaRetargeting: false,
			directMail: true,
			subscriptionDate: '2024-01-08',
			lastEngagement: '2024-06-14',
			preferredContactTime: 'morning',
			marketingSegment: 'new_customer',
		},
		recoveryAttempts: {
			email: { sent: true, opened: false, clicked: false, sentDate: '2024-06-14' },
			sms: { sent: true, delivered: true, replied: false, sentDate: '2024-06-15' },
		},
	},
	{
		id: 'cart13',
		customerName: 'James Rodriguez',
		customerEmail: 'james.rodriguez@email.com',
		products: [
			{ product: products[5], quantity: 1 },
			{ product: products[7], quantity: 2 },
		],
		cartValue: 85.97,
		abandonedDate: '2024-06-13',
		status: 'in_progress',
		marketingPreferences: {
			emailSubscribed: true,
			smsSubscribed: false,
			pushNotifications: true,
			socialMediaRetargeting: true,
			directMail: false,
			subscriptionDate: '2023-07-25',
			lastEngagement: '2024-06-13',
			preferredContactTime: 'afternoon',
			marketingSegment: 'frequent_buyer',
		},
		recoveryAttempts: {
			email: { sent: true, opened: true, clicked: false, sentDate: '2024-06-13' },
			push: { sent: true, opened: true, sentDate: '2024-06-14' },
			retargeting: { active: true, impressions: 26, clicks: 2 },
		},
	},
	{
		id: 'cart14',
		customerName: 'Nicole Thompson',
		customerEmail: 'nicole.thompson@email.com',
		products: [
			{ product: products[10], quantity: 1 },
			{ product: products[11], quantity: 2 },
		],
		cartValue: 69.97,
		abandonedDate: '2024-06-12',
		status: 'recovered',
		recoveredDate: '2024-06-14',
		recoveredAmount: 69.97,
		marketingPreferences: {
			emailSubscribed: true,
			smsSubscribed: true,
			pushNotifications: true,
			socialMediaRetargeting: false,
			directMail: false,
			subscriptionDate: '2023-11-30',
			lastEngagement: '2024-06-14',
			preferredContactTime: 'evening',
			marketingSegment: 'vip',
		},
		recoveryAttempts: {
			email: { sent: true, opened: true, clicked: true, sentDate: '2024-06-12' },
			sms: { sent: true, delivered: true, replied: false, sentDate: '2024-06-13' },
			push: { sent: true, opened: true, sentDate: '2024-06-13' },
		},
	},
	{
		id: 'cart15',
		customerName: 'Daniel Lewis',
		customerEmail: 'daniel.lewis@email.com',
		products: [
			{ product: products[15], quantity: 1 },
			{ product: products[17], quantity: 2 },
		],
		cartValue: 83.97,
		abandonedDate: '2024-06-11',
		status: 'abandoned',
		marketingPreferences: {
			emailSubscribed: false,
			smsSubscribed: false,
			pushNotifications: false,
			socialMediaRetargeting: true,
			directMail: false,
			subscriptionDate: '2024-06-01',
			lastEngagement: '2024-06-11',
			preferredContactTime: 'morning',
			marketingSegment: 'new_customer',
		},
		recoveryAttempts: {
			retargeting: { active: true, impressions: 12, clicks: 0 },
		},
	},
];

// Calculate dashboard metrics
export const getDashboardMetrics = () => {
	const totalAbandoned = abandonedCarts.length;
	const recovered = abandonedCarts.filter((cart) => cart.status === 'recovered').length;
	const recoveryRate = totalAbandoned > 0 ? (recovered / totalAbandoned) * 100 : 0;

	const revenueRecovered = abandonedCarts
		.filter((cart) => cart.status === 'recovered')
		.reduce((sum, cart) => sum + (cart.recoveredAmount || 0), 0);

	const avgCartValue =
		totalAbandoned > 0 ? abandonedCarts.reduce((sum, cart) => sum + cart.cartValue, 0) / totalAbandoned : 0;

	return {
		totalAbandoned,
		recoveryRate: Math.round(recoveryRate * 100) / 100,
		revenueRecovered,
		avgCartValue: Math.round(avgCartValue * 100) / 100,
	};
};

// Calculate marketing metrics
export const getMarketingMetrics = () => {
	const totalCustomers = abandonedCarts.length;
	const emailSubscribed = abandonedCarts.filter((cart) => cart.marketingPreferences.emailSubscribed).length;
	const smsSubscribed = abandonedCarts.filter((cart) => cart.marketingPreferences.smsSubscribed).length;
	const pushSubscribed = abandonedCarts.filter((cart) => cart.marketingPreferences.pushNotifications).length;
	const retargetingEnabled = abandonedCarts.filter((cart) => cart.marketingPreferences.socialMediaRetargeting).length;

	const emailSent = abandonedCarts.filter((cart) => cart.recoveryAttempts?.email?.sent).length;
	const emailOpened = abandonedCarts.filter((cart) => cart.recoveryAttempts?.email?.opened).length;
	const emailClicked = abandonedCarts.filter((cart) => cart.recoveryAttempts?.email?.clicked).length;

	const emailOpenRate = emailSent > 0 ? (emailOpened / emailSent) * 100 : 0;
	const emailClickRate = emailOpened > 0 ? (emailClicked / emailOpened) * 100 : 0;

	return {
		totalCustomers,
		emailSubscriptionRate: Math.round((emailSubscribed / totalCustomers) * 100),
		smsSubscriptionRate: Math.round((smsSubscribed / totalCustomers) * 100),
		pushSubscriptionRate: Math.round((pushSubscribed / totalCustomers) * 100),
		retargetingEnabledRate: Math.round((retargetingEnabled / totalCustomers) * 100),
		emailOpenRate: Math.round(emailOpenRate),
		emailClickRate: Math.round(emailClickRate),
		emailsSent: emailSent,
		emailsOpened: emailOpened,
		emailsClicked: emailClicked,
	};
};
