export enum CardStatus {
	UNSELECTED,
	CORRECT,
	INCORRECT,
	SELECTED,
}

export type PairListItem = {
	emoji: string;
	name: string;
	id: number;
	emojiStatus: CardStatus;
	nameStatus: CardStatus;
};
