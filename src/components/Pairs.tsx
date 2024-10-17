import { useEffect, useState } from 'react';
import { Card } from './Card';
import { CardStatus } from '../types';
import { getPairsList } from '../utils/getPairsList.function';
import { shuffleArray } from '../utils/shuffleArray.function';

type PairSelected = { emoji: number | null; name: number | null };

export function Pairs(): JSX.Element {
	const [items, setItems] = useState(getPairsList(5));
	const [itemsEmojiList, setItemsEmojiList] = useState(getPairsList(5));
	const [itemsNameList, setItemsNameList] = useState(getPairsList(5));
	const [selected, setSelected] = useState<PairSelected>({
		emoji: null,
		name: null,
	});

	useEffect(() => {
		setItemsEmojiList(shuffleArray(items));
		setItemsNameList(shuffleArray(items));
	}, []);

	const handleSelect = (
		selection: Partial<{ emoji: number; name: number }>
	): void => {
		if (selection.emoji) {
			if (selected.emoji === selection.emoji) {
				setSelected((prev) => ({ ...prev, emoji: null }));
				changeStatus({
					id: selection.emoji,
					status: CardStatus.UNSELECTED,
					key: 'emojiStatus',
				});
			} else {
				setSelected((prev) => ({ ...prev, emoji: selection.emoji! }));
				changeStatus({
					id: selection.emoji,
					status: CardStatus.SELECTED,
					key: 'emojiStatus',
				});
			}
		} else if (selection.name) {
			if (selected.name === selection.name) {
				setSelected((prev) => ({ ...prev, name: null }));
				changeStatus({
					id: selection.name,
					status: CardStatus.UNSELECTED,
					key: 'nameStatus',
				});
			} else {
				setSelected((prev) => ({ ...prev, name: selection.name! }));
				changeStatus({
					id: selection.name,
					status: CardStatus.SELECTED,
					key: 'nameStatus',
				});
			}
		}

		if (selected.emoji && selection.name) {
			checkMatch({ emoji: selected.emoji, name: selection.name });
		} else if (selected.name && selection.emoji) {
			checkMatch({ emoji: selection.emoji, name: selected.name });
		}
	};

	const checkMatch = ({
		emoji,
		name,
	}: {
		emoji: number;
		name: number;
	}): void => {
		const matchStatus =
			emoji === name ? CardStatus.CORRECT : CardStatus.INCORRECT;

		changeStatus({ id: emoji, status: matchStatus, key: 'emojiStatus' });
		changeStatus({ id: name, status: matchStatus, key: 'nameStatus' });

		setSelected({
			emoji: null,
			name: null,
		});
	};

	const changeStatus = ({
		key,
		id,
		status,
	}: {
		key: 'emojiStatus' | 'nameStatus';
		id: number;
		status: CardStatus;
	}): void => {
		const itemList = [...items];

		const index = itemList.findIndex((item) => item.id === id);

		itemList[index][key] = status;

		setItems(itemList);
	};

	return (
		<div className='flex justify-evenly'>
			<div className='flex flex-col gap-2'>
				{itemsEmojiList.map((item) => (
					<Card
						label={item.emoji}
						status={item.emojiStatus}
						handleSelect={() => handleSelect({ emoji: item.id })}
					/>
				))}
			</div>
			<div className='flex flex-col gap-2'>
				{itemsNameList.map((item) => (
					<Card
						label={item.name}
						status={item.nameStatus}
						handleSelect={() => handleSelect({ name: item.id })}
					/>
				))}
			</div>
		</div>
	);
}
