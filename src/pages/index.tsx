import { useState, useRef } from "react"
import { IProduct } from "../interfaces/product";
import { getProducts } from "../services/product";
import { Table } from "../components/Table";
import styles from '../styles/main.module.scss';
import { ISuggestion } from "../interfaces/suggestion";
import { Loader } from "../components/Loader";

const columns = [
  {
    key: "id",
    name: "Código",
  },
  {
    key: "name",
    name: "Produto",
  },
  {
    key: "type",
    name: "Tipo",
  }
]

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const inputEl = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = inputEl.current;
    const value = form[0].value;

    if (value === '') {
      return;
    }

    await onSearch(value);

    inputEl.current.reset();
  }

  const onSearch = async (productSearched: string) => {
    setLoading(true);

    const res: any = await getProducts(productSearched);

    if (res) {
      if (res.products && !!res.products.length)
        setProducts(res.products);

      if (res.suggestions && !!res.suggestions.length)
        setSuggestions(res.suggestions);
    }
    
    setLoading(false);
  };

  if (loading)
    return <Loader />

  return (
    <div className={styles.mainContainer}>
      <form ref={inputEl} onSubmit={(e) => onSubmit(e)}>
        <input type="text" placeholder="Produto" />
        <button>Buscar</button>
      </form>
      {
        !!products.length && <Table columns={columns} data={products} />
      }
      {
        !!suggestions.length &&
        <div className={styles.suggestions}>
          <h2>Sugestões</h2>
          {
            suggestions.map((suggestion: ISuggestion, index: number) =>
              <button
                onClick={() => onSearch(suggestion.term)}
                key={index}>{suggestion.term}</button>
            )
          }
        </div>
      }
    </div>
  )
}
