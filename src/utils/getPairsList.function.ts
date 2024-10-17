import { shuffleArray } from './shuffleArray.function';
import { CardStatus, PairListItem } from '../types';

const emojiList = [
	{ emoji: '😀', name: 'grinning face' },
	{ emoji: '😂', name: 'face with tears of joy' },
	{ emoji: '😍', name: 'smiling face with heart-eyes' },
	{ emoji: '🤔', name: 'thinking face' },
	{ emoji: '😎', name: 'smiling face with sunglasses' },
	{ emoji: '😭', name: 'loudly crying face' },
	{ emoji: '😴', name: 'sleeping face' },
	{ emoji: '🤯', name: 'exploding head' },
	{ emoji: '🥳', name: 'partying face' },
	{ emoji: '😡', name: 'pouting face' },
	{ emoji: '🥺', name: 'pleading face' },
	{ emoji: '🤮', name: 'face vomiting' },
	{ emoji: '😷', name: 'face with medical mask' },
	{ emoji: '🤢', name: 'nauseated face' },
	{ emoji: '😜', name: 'winking face with tongue' },
	{ emoji: '👍', name: 'thumbs up' },
	{ emoji: '👎', name: 'thumbs down' },
	{ emoji: '👏', name: 'clapping hands' },
	{ emoji: '🙏', name: 'folded hands' },
	{ emoji: '🔥', name: 'fire' },
	{ emoji: '💧', name: 'droplet' },
	{ emoji: '🌈', name: 'rainbow' },
	{ emoji: '⚡', name: 'high voltage' },
	{ emoji: '⭐', name: 'star' },
	{ emoji: '🌙', name: 'crescent moon' },
	{ emoji: '☀️', name: 'sun' },
];

export function getPairsList(quantity: number): PairListItem[] {
	return shuffleArray(emojiList)
		.slice(0, quantity)
		.map((items, index) => ({
			...items,
			id: index + 1,
			emojiStatus: CardStatus.UNSELECTED,
			nameStatus: CardStatus.UNSELECTED,
		}));
}
