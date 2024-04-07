import { Logo } from '../Logo';
import { Navbar } from '../Navbar';

interface LayoutProps {
	children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
	return (
		<div className='gridLayout'>
			<header className='border-b-3 sticky top-0 border-b-violet-400 bg-stone-800 px-3'>
				<div className='flex h-full items-center justify-between'>
					<Logo />
					<Navbar />
				</div>
			</header>
			{children}
		</div>
	);
}
