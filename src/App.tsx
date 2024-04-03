import { useState } from 'react';
import { DataTable } from 'primereact/datatable';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { Column } from 'primereact/column';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';

import { useApp } from './useApp';
import { ErrorResponse } from './types';

export default function App() {
	const [inputValue, setInputValue] = useState<number>(10);

	const { tags, isLoading, error } = useApp();

	const renderHeader = () => {
		return (
			<div className='flex justify-content-end'>
				<span className='p-input-icon-left'>
					<i className='pi pi-search' />
					<InputNumber
						value={inputValue}
						onChange={(e: InputNumberChangeEvent) => setInputValue(e.value || 0)}
						placeholder='number'
					/>
				</span>
			</div>
		);
	};

	if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center' }}>Loading...</div>;

	if (error)
		return <div style={{ display: 'flex', justifyContent: 'center' }}>Error: {(error as ErrorResponse).message}</div>;

	return (
		<div>
			<DataTable value={tags} tableStyle={{ minWidth: '50rem' }} paginator rows={inputValue} header={renderHeader()}>
				<Column field='name' header='Name' sortable style={{ width: '50%' }}></Column>
				<Column field='count' header='Count' sortable style={{ width: '50%' }}></Column>
			</DataTable>
		</div>
	);
}
