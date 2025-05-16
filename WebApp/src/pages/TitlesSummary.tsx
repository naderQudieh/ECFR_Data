import React, { useEffect, useState } from 'react'
import { api_CRFs } from "../shared/lib/apiCRFs";
import type { Observable } from 'rxjs/internal/Observable';
import type { CRFTitleMain } from '../shared/lib/models';
import DataTable, { createTheme } from 'react-data-table-component';
import styled from 'styled-components';
import Button from '../shared/Button';
import { FilterComponent } from '../shared/common';
import { customStyles, TextField, ClearButton } from '../shared/common';
 
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
  
export default function TitlesSummary() {

    const columns = [

        {
            name: 'Node Ref',
            selector: row => row.node, sortable: true,
            width: "90px"
        },
        {
            name: 'Title',
            selector: row => row.title,
            width: "500px"
        },
        {
            name: 'Total Sections',
            selector: row => row.no_of_sections 
            
        }
        ,
        {
            name: 'Total Paragraphs',
            selector: row => row.no_of_paragraphs 
             
        }
        ,
        {
            name: 'Total Parts',
            selector: row => row.no_of_parts
        },
        {
            name: 'Total Words',
            selector: row => row.no_of_words
        }
    ];
    const [selectedRows, setSelectedRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)
    const [crfTitls, setCrfTitls] = useState<CRFTitleMain[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadData = async () => {
            try {
                const _titles = await api_CRFs.get_main_titles();
                setCrfTitls(_titles)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load data')
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])
    const handleClick = (r: CRFTitleMain) => {
        // clickedData(r);
    };
    const filteredItems = crfTitls.filter(
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
                    <h5 className="text-lg font-bold"> Titles Summary</h5>
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