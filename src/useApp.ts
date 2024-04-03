import { useQuery } from 'react-query';

export const useApp = () => {
	const apiKey = '56l8a1131TLA1fLJTL*xLw((';

	const getData = async () => {
		const response = await fetch(
			`https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow&key=${apiKey}`
		);
		const data = await response.json();

		return data.items.map((item: any) => ({
			name: item.name,
			count: item.count,
		}));
	};

	const { data: tags, isLoading, error } = useQuery('tags', getData);

	return { tags, isLoading, error };
};
