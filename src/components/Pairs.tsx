import { useState } from 'react';
import { Card } from './Card';
import { CardStatus } from '../types';
import { getPairsList } from '../utils/getPairsList.function';
import { shuffleArray } from '../utils/shuffleArray.function';

type PairSelected = { emoji: number | null; name: number | null };

export function Pairs(): JSX.Element {
	const [items, setItems] = useState(getPairsList(5));
	const [itemsEmojiList, setItemsEmojiList] = useState(shuffleArray(items));
	const [itemsNameList, setItemsNameList] = useState(shuffleArray(items));
	const [selected, setSelected] = useState<PairSelected>({
		emoji: null,
		name: null,
	});

	const updateSelected = (type: 'emoji' | 'name', id: number | null): void => {
		setSelected((prev) => ({ ...prev, [type]: id }));
	};

	const updateStatus = (
		id: number,
		status: CardStatus,
		key: 'emojiStatus' | 'nameStatus'
	): void => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id ? { ...item, [key]: status } : item
			)
		);
		if (key === 'emojiStatus') {
			setItemsEmojiList((prevItems) =>
				prevItems.map((item) =>
					item.id === id ? { ...item, [key]: status } : item
				)
			);
		} else if (key === 'nameStatus') {
			setItemsNameList((prevItems) =>
				prevItems.map((item) =>
					item.id === id ? { ...item, [key]: status } : item
				)
			);
		}
	};

	const handleSelect = (
		selection: Partial<{ emoji: number; name: number }>
	): void => {
		const { emoji, name } = selection;

		if (emoji !== undefined) {
			handleEmojiSelection(emoji);
		} else if (name !== undefined) {
			handleNameSelection(name);
		}

		if ((selected.emoji && name) || (selected.name && emoji)) {
			checkMatch({
				emoji: emoji ?? selected.emoji!,
				name: name ?? selected.name!,
			});
		}
	};

	const handleEmojiSelection = (emoji: number): void => {
		const isSelected = selected.emoji === emoji;
		updateSelected('emoji', isSelected ? null : emoji);
		updateStatus(
			emoji,
			isSelected ? CardStatus.UNSELECTED : CardStatus.SELECTED,
			'emojiStatus'
		);
	};

	const handleNameSelection = (name: number): void => {
		const isSelected = selected.name === name;
		updateSelected('name', isSelected ? null : name);
		updateStatus(
			name,
			isSelected ? CardStatus.UNSELECTED : CardStatus.SELECTED,
			'nameStatus'
		);
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

		updateStatus(emoji, matchStatus, 'emojiStatus');
		updateStatus(name, matchStatus, 'nameStatus');

		setSelected({
			emoji: null,
			name: null,
		});
	};

	return (
		<div className='flex justify-evenly'>
			<div className='flex flex-col gap-2'>
				{itemsEmojiList.map((item) => (
					<Card
						key={item.emoji}
						label={item.emoji}
						status={item.emojiStatus}
						handleSelect={() => handleSelect({ emoji: item.id })}
					/>
				))}
			</div>
			<div className='flex flex-col gap-2'>
				{itemsNameList.map((item) => (
					<Card
						key={item.name}
						label={item.name}
						status={item.nameStatus}
						handleSelect={() => handleSelect({ name: item.id })}
					/>
				))}
			</div>
		</div>
	);
}
