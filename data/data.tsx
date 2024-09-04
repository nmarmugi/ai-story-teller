const arrayInputLabel = [
	{
		input: {
			type: 'text',
			placeholder: 'Insert protagonist name...',
			id: 'protagonist',
			name: 'protagonist'
		},
		label: {
			label: 'Protagonist',
			htmlFor: 'protagonist'
		}
	},
	{
		input: {
			type: 'text',
			placeholder: 'Insert antagonist name...',
			id: 'antagonist',
			name: 'antagonist'
		},
		label: {
			label: 'Antagonist',
			htmlFor: 'antagonist'
		}
	}
]

const objSelectGenre = {
	label: 'Genre',
	options: [
		{ label: 'Fantasy', value: 'fantasy' },
		{ label: 'Science Fiction', value: 'science-fiction' },
		{ label: 'Mystery', value: 'mystery' },
		{ label: 'Thriller', value: 'thriller' },
		{ label: 'Romance', value: 'romance' },
		{ label: 'Historical Fiction', value: 'historical-fiction' },
		{ label: 'Horror', value: 'horror' },
		{ label: 'Adventure', value: 'adventure' },
		{ label: 'Children\'s Fiction', value: 'childrens-fiction' },
		{ label: 'Dystopian', value: 'dystopian' },
		{ label: 'Contemporary Fiction', value: 'contemporary-fiction' },
		{ label: 'Crime', value: 'crime' },
		{ label: 'Magical Realism', value: 'magical-realism' },
		{ label: 'Graphic Novel', value: 'graphic-novel' },
		{ label: 'Non-Fiction', value: 'non-fiction' },
		{ label: 'Biography', value: 'biography' },
		{ label: 'Memoir', value: 'memoir' },
		{ label: 'Self-Help', value: 'self-help' },
		{ label: 'Historical Non-Fiction', value: 'historical-non-fiction' },
		{ label: 'Travel', value: 'travel' },
		{ label: 'Humor', value: 'humor' },
		{ label: 'Poetry', value: 'poetry' },
		{ label: 'Drama', value: 'drama' },
		{ label: 'Paranormal', value: 'paranormal' },
		{ label: 'Urban Fantasy', value: 'urban-fantasy' },
		{ label: 'Chick Lit', value: 'chick-lit' },
		{ label: 'Political Fiction', value: 'political-fiction' },
		{ label: 'Steampunk', value: 'steampunk' }
	]
}

const objSelectLanguage = {
	label: 'Language',
	options: [
		{ label: 'English', value: 'english' },
		{ label: 'French', value: 'french' },
		{ label: 'Spanish', value: 'spanish' },
		{ label: 'German', value: 'german' },
		{ label: 'Italian', value: 'italian' }
	]
}

export {arrayInputLabel, objSelectGenre, objSelectLanguage}