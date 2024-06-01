import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { getListCategory } from "../services/categoryService"
import { createProduct } from "../services/productService"


function CreateProduct(props) {
	const { onReload } = props

	const [showModal, setShowModal] = useState(false)
	const [data, setData] = useState({})

	const [dataCategory, setDataCategory] = useState([]);

	useEffect(() => {
		const fetchApi = async () => {
			const result = await getListCategory()
			setDataCategory(result)
		};

		fetchApi()
	}, []);

	function openModal() {
		setShowModal(true);
	}
	function closeModal() {
		setShowModal(false);
	}

	const handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value
		setData({
			...data,
			[name]: value
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await createProduct(data)
		if (result) {
			setShowModal(false)
			onReload();
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Tạo sản phẩm thành công",
				showConfirmButton: false,
				timer: 1500
			});
		}
	}

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	return <><div><button onClick={openModal}> + Tạo sản phẩm</button>
		<Modal
			isOpen={showModal}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<form action="" onSubmit={handleSubmit}>
				<table>
					<tbody>
						<tr>
							<td>Tiêu đề</td>
							<td>
								<input onChange={handleChange} type="text" name="title" />
							</td>
						</tr>
						<tr>
							<td>Danh mục</td>
							<td >
								<select name="category" onChange={handleChange}>
									{dataCategory.map((item, index) => ((
										<option key={index} value={item}>{item}</option>

									)))}
								</select>
							</td>
						</tr>
						<tr>
							<td>Giá</td>
							<td>
								<input onChange={handleChange} type="text" name="price" />
							</td>
						</tr>
						<tr>
							<td>Giảm giá</td>
							<td>
								<input onChange={handleChange} type="text" name="discountPercentage" />
							</td>
						</tr>
						<tr>
							<td>Số lượng còn lại</td>
							<td>
								<input onChange={handleChange} type="text" name="stock" />
							</td>
						</tr>
						<tr>
							<td>Đường dẫn ảnh</td>
							<td>
								<input onChange={handleChange} type="text" name="thumbnail" />
							</td>
						</tr>
						<tr>
							<td>Mô tả</td>
							<td>
								<input onChange={handleChange} type="text" name="availabilityStatus" />
							</td>
						</tr>
						<tr>
							<td>
								<button onClick={closeModal}>Hủy</button>
							</td>
							<td>
								<button type="submit">Tạo mới</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</Modal></div></>
}

export default CreateProduct