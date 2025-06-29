'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { abandonedCarts, getDashboardMetrics, getMarketingMetrics, type AbandonedCart } from '@/data/sample-data';
import {
	ShoppingCart,
	TrendingUp,
	DollarSign,
	BarChart3,
	Mail,
	MessageSquare,
	Bell,
	Target,
	Eye,
	MousePointer,
} from 'lucide-react';

interface StatusBadgeProps {
	status: AbandonedCart['status'];
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
	const variants = {
		abandoned: { variant: 'destructive' as const, text: 'Abandoned' },
		recovered: { variant: 'default' as const, text: 'Recovered' },
		in_progress: { variant: 'secondary' as const, text: 'In Progress' },
	};

	const { variant, text } = variants[status];
	return <Badge variant={variant}>{text}</Badge>;
};

interface MarketingBadgesProps {
	preferences: AbandonedCart['marketingPreferences'];
}

const MarketingBadges = ({ preferences }: MarketingBadgesProps) => {
	const badges = [];

	if (preferences.emailSubscribed) {
		badges.push(
			<Badge
				key='email'
				variant='outline'
				className='text-xs'>
				📧 Email
			</Badge>
		);
	}
	if (preferences.smsSubscribed) {
		badges.push(
			<Badge
				key='sms'
				variant='outline'
				className='text-xs'>
				📱 SMS
			</Badge>
		);
	}
	if (preferences.pushNotifications) {
		badges.push(
			<Badge
				key='push'
				variant='outline'
				className='text-xs'>
				🔔 Push
			</Badge>
		);
	}
	if (preferences.socialMediaRetargeting) {
		badges.push(
			<Badge
				key='retargeting'
				variant='outline'
				className='text-xs'>
				🎯 Retargeting
			</Badge>
		);
	}

	return (
		<div className='flex flex-wrap gap-1'>
			{badges.length > 0 ? badges : <span className='text-xs text-muted-foreground'>No subscriptions</span>}
		</div>
	);
};

const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
};

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};

export default function AbandonedCartDashboard() {
	const metrics = getDashboardMetrics();
	const marketingMetrics = getMarketingMetrics();

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='space-y-2'>
				<h1 className='text-3xl font-bold tracking-tight'>Cart Analytics Dashboard</h1>
				<p className='text-muted-foreground'>
					Monitor and analyze abandoned cart performance, recovery metrics, and marketing engagement.
				</p>
			</div>

			{/* Cart Metrics */}
			<div
				data-tour='metrics-grid'
				className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Total Abandoned Carts</CardTitle>
						<ShoppingCart className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{metrics.totalAbandoned}</div>
						<p className='text-xs text-muted-foreground'>Carts abandoned in the last 30 days</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Recovery Rate</CardTitle>
						<TrendingUp className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{metrics.recoveryRate}%</div>
						<p className='text-xs text-muted-foreground'>Percentage of carts successfully recovered</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Revenue Recovered</CardTitle>
						<DollarSign className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{formatCurrency(metrics.revenueRecovered)}</div>
						<p className='text-xs text-muted-foreground'>Total revenue recovered from abandoned carts</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Avg. Cart Value</CardTitle>
						<BarChart3 className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{formatCurrency(metrics.avgCartValue)}</div>
						<p className='text-xs text-muted-foreground'>Average value of abandoned carts</p>
					</CardContent>
				</Card>
			</div>

			{/* Marketing Metrics */}
			<div
				data-tour='marketing-metrics'
				className='grid gap-4 md:grid-cols-2 lg:grid-cols-6'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Email Subscribers</CardTitle>
						<Mail className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{marketingMetrics.emailSubscriptionRate}%</div>
						<p className='text-xs text-muted-foreground'>Customers subscribed to emails</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>SMS Subscribers</CardTitle>
						<MessageSquare className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{marketingMetrics.smsSubscriptionRate}%</div>
						<p className='text-xs text-muted-foreground'>Customers subscribed to SMS</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Push Enabled</CardTitle>
						<Bell className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{marketingMetrics.pushSubscriptionRate}%</div>
						<p className='text-xs text-muted-foreground'>Push notifications enabled</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Retargeting</CardTitle>
						<Target className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{marketingMetrics.retargetingEnabledRate}%</div>
						<p className='text-xs text-muted-foreground'>Social media retargeting enabled</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Email Open Rate</CardTitle>
						<Eye className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{marketingMetrics.emailOpenRate}%</div>
						<p className='text-xs text-muted-foreground'>
							{marketingMetrics.emailsOpened}/{marketingMetrics.emailsSent} emails opened
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Email Click Rate</CardTitle>
						<MousePointer className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{marketingMetrics.emailClickRate}%</div>
						<p className='text-xs text-muted-foreground'>{marketingMetrics.emailsClicked} clicks from opened emails</p>
					</CardContent>
				</Card>
			</div>

			{/* Abandoned Carts Table */}
			<Card data-tour='abandoned-carts-table'>
				<CardHeader>
					<CardTitle>Abandoned Carts</CardTitle>
					<CardDescription>
						A comprehensive view of all abandoned carts, customer marketing preferences, and recovery status.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Customer</TableHead>
								<TableHead>Products</TableHead>
								<TableHead>Cart Value</TableHead>
								<TableHead>Marketing Subscriptions</TableHead>
								<TableHead>Segment</TableHead>
								<TableHead>Abandoned Date</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{abandonedCarts.map((cart) => (
								<TableRow key={cart.id}>
									<TableCell>
										<div className='space-y-1'>
											<p className='font-medium'>{cart.customerName}</p>
											<p className='text-sm text-muted-foreground'>{cart.customerEmail}</p>
										</div>
									</TableCell>
									<TableCell>
										<div className='space-y-1'>
											{cart.products.map((item, index) => (
												<div
													key={index}
													className='text-sm'>
													<span className='font-medium'>{item.product.name}</span>
													<span className='text-muted-foreground'> x{item.quantity}</span>
												</div>
											))}
										</div>
									</TableCell>
									<TableCell className='font-medium'>{formatCurrency(cart.cartValue)}</TableCell>
									<TableCell>
										<MarketingBadges preferences={cart.marketingPreferences} />
									</TableCell>
									<TableCell>
										<Badge
											variant='outline'
											className='capitalize'>
											{cart.marketingPreferences.marketingSegment?.replace('_', ' ')}
										</Badge>
									</TableCell>
									<TableCell>{formatDate(cart.abandonedDate)}</TableCell>
									<TableCell>
										<StatusBadge status={cart.status} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
