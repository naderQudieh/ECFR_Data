import React, { useEffect, useState } from 'react'
import { api_CRFs } from "../shared/lib/apiCRFs";
import type { Observable } from 'rxjs/internal/Observable';
import type { CRFParagraph } from '../shared/lib/models';
import DataTable, { createTheme } from 'react-data-table-component';
import { FilterComponent } from '../shared/common';
import { customStyles, TextField, ClearButton } from '../shared/common';
import Button from '../shared/Button';

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

 
export default function TitelParagraphsApp() {
    
    const columns = [
        {
            name: 'title',
            selector: row => row.title, sortable: true,
            width: "150px"
        },
        {
            name: 'position',
            selector: row => row.position, sortable: true,
            width: "120px" 
        },
        {
            name: 'sectionNode',
            selector: row => row.sectionNode, sortable: true,
            width: "180px" 
        },
        {
            name: 'paragraphText',
            selector: row => row.paragraphText, sortable: true,
            wrap: true,
           
        }
    ];
  
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)
    const [crfParagraph, setCRFParagraph] = useState<CRFParagraph[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadData = async () => {
            try {
                const _titles = await api_CRFs.getCRFTitleParagraphs("Title1");
                setCRFParagraph(_titles.slice(0, 100))
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load data')
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])
    const handleClick = (r: CRFParagraph) => {
        // clickedData(r);
    };
    const filteredItems = crfParagraph.filter(
        item => item.paragraphText && item.paragraphText.toLowerCase().includes(filterText.toLowerCase()),
    );
    const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
        }
    };
    
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
                    <h5 className="text-lg font-bold"> Titles Sections</h5>
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
                    columns={columns}
                    data={filteredItems}
                    selectableRows
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