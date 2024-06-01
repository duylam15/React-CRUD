import React, { PureComponent } from 'react'
import { get } from '../utils/request'

const getListCategory = async () => {
	const result = await get('category')
	return result
}

export { getListCategory }