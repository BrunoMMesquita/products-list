import { ISuggestion } from './../interfaces/suggestion';
import axios from 'axios';
import { IProduct } from '../interfaces/product';

const url = 'https://mystique-v2-americanas.juno.b2w.io/autocomplete?';

export const getProducts = async (content: string) => {
    try {
        const res = await axios.get(`${url}content=${content}&source=nanook`);

        if (res && res.data) {
            const products: IProduct[] = res.data.products;
            const suggestions: ISuggestion[] = res.data.suggestions;
    
            return {
                products,
                suggestions
            };
        }

        return [];     
    }
    catch (err) {}
};