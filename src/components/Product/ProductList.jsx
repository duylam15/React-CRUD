import { useEffect, useState } from 'react';
import EditProduct from '../EditProduct';
import DeleteProduct from '../DeleteProduct';
import getProductList from '../../services/productService';


function ProductList(props) {
	const { reload } = props
	const [data, setData] = useState([]);
	const [editReload, setEditReload] = useState(false);

	const handleReload = () => {
		setEditReload(!editReload)
	}

	useEffect(() => {
		const fetchApi = async () => {
			const result = await getProductList()
			setData(result.reverse())
		};

		fetchApi()
	}, [reload, editReload]);

	return <>
		<div className="product__list">
			{data.map(item => (
				<div className="product__item" key={item.id}>
					<img className='product__img' src={item.thumbnail} alt={item.title} />
					<h4>{item.title}</h4>
					<p>Giá {item.price}$</p>
					<p>{item.availabilityStatus}</p>
					<EditProduct item={item} onReload={handleReload} />
					<DeleteProduct item={item} onReload={handleReload} />
				</div>
			))}
		</div>
	</>;
}

export default ProductList;
