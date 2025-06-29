import * as React from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => {
	return (
		<div className='relative'>
			<select
				className={cn(
					'cursor-pointer flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none',
					className
				)}
				ref={ref}
				{...props}>
				{children}
			</select>
			<ChevronDown className='absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none' />
		</div>
	);
});
Select.displayName = 'Select';

export { Select };
