type ConditionalClass = [boolean, string];

export function conditionalClasses(...conditions: ConditionalClass[]): string {
	return conditions
		.filter(([condition, _]) => condition)
		.map(([_, classes]) => classes)
		.join(' ');
}
