import styled from 'styled-components';
import Button from './Button';

export const customStyles = {
    rows: {
        style: {
            minHeight: '65px', // override the row height
        },
    },
    headCells: {
        style: {
            fontSize: '1.2rem',
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            "text-transform": 'Capitalize',
            fontWeight: 'bold',
            backgroundColor: '#bebebe',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            fontSize: '1.2rem',
        },
    },
};

export const TextField = styled.input` 
	width: 200px; 
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 10px!important;
    
    background-color: #f8fbff !important;
	&:hover {
		cursor: pointer;
	}
`;

export const ClearButton = styled(Button)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height:42px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;


export const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField
            id="search"
            type="text"
            placeholder="Filter By Name"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        <ClearButton   type="button" onClick={onClear}>
            X
        </ClearButton> 
    </>
);