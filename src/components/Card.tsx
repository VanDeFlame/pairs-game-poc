import { CardStatus } from '../types';
import { conditionalClasses } from '../utils/conditionalClasses.function';

type CardProps = {
	status: CardStatus;
	label: string;
	handleSelect: () => void;
};

export function Card({
	label,
	status,
	handleSelect,
}: Readonly<CardProps>): JSX.Element {
	const onClick = (): void => {
		if (status === CardStatus.UNSELECTED || status === CardStatus.SELECTED) {
			handleSelect();
		}
	};

	return (
		<button
			onClick={onClick}
			className={`h-16 w-48 rounded border-4 p-2 ${conditionalClasses(
				[
					status === CardStatus.CORRECT,
					'cursor-default border-green-600 bg-green-400',
				],
				[
					status === CardStatus.INCORRECT,
					'cursor-default border-red-600 bg-red-400',
				],
				[
					status === CardStatus.UNSELECTED,
					'cursor-pointer border-gray-600 bg-slate-400',
				],
				[
					status === CardStatus.SELECTED,
					'cursor-pointer border-blue-600 bg-slate-400',
				]
			)}`}
		>
			{label}
		</button>
	);
}
