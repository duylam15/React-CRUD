import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { deleteProduct } from '../services/productService'

function DeleteProduct(props) {
	const { item, onReload } = props

	const deleteItem = async () => {

		const result = await deleteProduct(item.id)
		if (result) {
			onReload()
			Swal.fire({
				title: "Đã xóa!",
				text: "Bạn đã xóa thành công.",
				icon: "success"
			});
		}
	}
	const handleDelete = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "Bạn có muốn xóa không",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Xóa",
			cancelButtonText: "Hủy"
		}).then((result) => {
			if (result.isConfirmed) {
				deleteItem()
			}
		});
	}

	return (
		<> <button onClick={handleDelete}>Xóa</button></>
	)
}

export default DeleteProduct