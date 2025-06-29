'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BarChart3, Bot, Menu, X } from 'lucide-react';
import Image from 'next/image';

interface SidebarProps {
	children: React.ReactNode;
}

const navigation = [
	{
		name: 'Dashboard',
		href: '/',
		icon: BarChart3,
	},
	{
		name: 'AI Decision Tree',
		href: '/ai-decision-tree',
		icon: Bot,
	},
];

export function Sidebar({ children }: SidebarProps) {
	const [sidebarOpen, setSidebarOpen] = React.useState(false);
	const pathname = usePathname();

	return (
		<div className='flex h-screen bg-background'>
			{/* Mobile sidebar overlay */}
			{sidebarOpen && (
				<div
					className='fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden'
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={cn(
					'fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0',
					sidebarOpen ? 'translate-x-0' : '-translate-x-full'
				)}>
				<div className='flex h-full flex-col'>
					{/* Logo/Header */}
					<div className='flex h-16 items-center justify-between px-6 border-b border-sidebar-border'>
						<div className='flex items-center w-full space-x-2'>
							<Image
								src='/agent-carter-logo.svg'
								alt='Agent Carter'
								width={100}
								height={100}
								className='w-full h-fit'
							/>
						</div>
						<button
							onClick={() => setSidebarOpen(false)}
							className='lg:hidden text-sidebar-foreground hover:text-sidebar-accent-foreground'>
							<X className='h-5 w-5' />
						</button>
					</div>

					{/* Navigation */}
					<nav className='flex-1 space-y-1 px-3 py-4'>
						{navigation.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
										isActive
											? 'bg-sidebar-accent text-sidebar-accent-foreground'
											: 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
									)}
									onClick={() => setSidebarOpen(false)}>
									<item.icon
										className={cn(
											'mr-3 h-5 w-5 flex-shrink-0',
											isActive
												? 'text-sidebar-accent-foreground'
												: 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground'
										)}
									/>
									{item.name}
								</Link>
							);
						})}
					</nav>

					{/* Footer */}
					<div className='border-t border-sidebar-border p-4'>
						<div className='text-xs text-muted-foreground text-center'>v1.0.0 - SaaS Prototype</div>
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className='flex flex-1 flex-col overflow-hidden'>
				{/* Mobile header */}
				<div className='flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:hidden'>
					<button
						onClick={() => setSidebarOpen(true)}
						className='text-foreground hover:text-muted-foreground'>
						<Menu className='h-6 w-6' />
					</button>
					<div className='flex items-center space-x-2'>
						<BarChart3 className='h-6 w-6 text-primary' />
						<span className='text-lg font-semibold'>CartAnalytics</span>
					</div>
					<div className='w-6' /> {/* Spacer for alignment */}
				</div>

				{/* Page content */}
				<main className='flex-1 overflow-auto'>
					<div className='container mx-auto p-6'>{children}</div>
				</main>
			</div>
		</div>
	);
}
