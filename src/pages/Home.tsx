import { Pairs } from '../components/Pairs';

export function Home(): JSX.Element {
	return (
		<>
			<main className='flex flex-col gap-y-12'>
				<h2 className='text-4xl text-violet-700'>Pairs Game</h2>
				<Pairs />
			</main>
		</>
	);
}
