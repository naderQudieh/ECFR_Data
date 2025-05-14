import React, { useEffect, useState } from 'react'
import { api_CRFs } from "../shared/lib/apiCRFs";
import type { Observable } from 'rxjs/internal/Observable';
import type { RecChanges } from '../shared/lib/models';
import DataTable, { createTheme } from 'react-data-table-component';
import { FilterComponent } from '../shared/common';
import styled from 'styled-components';
import Button from '../shared/Button';
const customStyles = {
    rows: {
        style: {
            minHeight: '65px',


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
createTheme('solarized', {
    text: {
        primary: '#141414',
        secondary: '#2aa198',
        fontSzie: '2.9rem',
    },
    background: {
        default: '#e7e7e7cc',
    },
    context: {
        background: '#e7e7e7cc',
        text: '#FFFFFF',
    },
    divider: {
        default: '#073642',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
}, 'light');
const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const ClearButton = styled(Button)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;


export default function HomeApp() {

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Type',
            selector: row => row.type, sortable: true,
            width: "150px"
        },

        {
            name: 'Amendment Date',
            selector: row => row.amendment_date
        }
        ,
        {
            name: 'Name',
            selector: row => row.name
        },
        {
            name: 'Issue Date',
            selector: row => row.issue_date
        }
    ];
    const [selectedRows, setSelectedRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)
    const [crfRecChanges, setCrfRecChanges] = useState<RecChanges[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadData = async () => {
            try {
                const _items = await api_CRFs.get_recent_Changes(16);
                if (_items["content_versions"]) {
                    setCrfRecChanges(_items["content_versions"]);
                    console.log(crfRecChanges);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load data')
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])
    const handleClick = (r: RecChanges) => {
        // clickedData(r);
    };
    const filteredItems = crfRecChanges.filter(
        item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = React.useMemo(() => {

        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <div className="flex w-full">
                <div className="flex w-2/3">
                    <h5 className="text-lg font-bold"> Recent Changes</h5>
                </div>
                <div className="flex w-1/3">
                    <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
                </div>
            </div>
        );
    }, [filterText, resetPaginationToggle]);


    if (loading) {
        return <div className="loader">Loading...</div>
    }
    if (error) {
        return <div className="error">{error}</div>
    }

    return (
        <main>

            <div className="dashboard-container">

                <DataTable className="mainTable"
                    paginationPerPage={55}
                    columns={columns}
                    data={filteredItems}
                    highlightOnHover={true}
                    pointerOnHover={true}
                    pagination
                    responsive
                    persistTableHead
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    onRowClicked={handleClick}
                    theme="solarized"
                    selectableRowsHighlight={true}
                    customStyles={customStyles}
                    fixedHeader
                    fixedHeaderScrollHeight="300px"


                />

            </div>
        </main>
    )
}