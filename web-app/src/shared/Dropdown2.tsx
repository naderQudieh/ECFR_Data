import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
 
interface Option {
    value: string;
    label: string;
}

interface Props {
    options: Option[];
    selectedValue :string
    onChange: (value: string) => void;
}

const Dropdown2: React.FC<Props> = ({ options, selectedValue, onChange }) => {
    
    const [selectedOps, setSelectedOps] = useState<Option>();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useMemo(() => {
        if (selectedValue !== undefined) {
            const selvaue = options.find(p => p.value === selectedValue);
            if (selvaue) {
                setSelectedOps(selvaue);
                console.log("selectedValue", selectedOps);
            }
        }
       
    }, [selectedValue]);

  
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

     
    const handleItemClick = (event: any, selOps: Option) => {
        event.preventDefault();
        onChange(selOps.value) 
        setSelectedOps(selOps);
        setIsOpen(false); 
       
    };
    
     
    return (
        <div className="relative dropdown-wrapper" ref={dropdownRef}>
            
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="dropdown-btn flex items-center justify-between w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
               
                <div className="flex items-center justify-between w-full">
                    <span className="truncate"> {selectedOps?.label || "- Select -"} </span>
                    {/* Arrow icon */}
                    <svg
                        className={`w-5 h-5 ml-2 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                            }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </button>
              
            <ul
                className={`absolute w-full mt-2 dropdown-container origin-top bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out ${isOpen
                        ? 'opacity-100 scale-y-100 translate-y-0'
                        : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                    }`}
            >
                
                    {
                    options.map((option) => (
                        <li
                            onClick={(e) => {
                                e.stopPropagation();
                                handleItemClick(e, option)
                            }}
                            key={option.value} >
                                {option.label}
                            </li>
                        ))
                    } 
                
            </ul>
        </div>
      
  );
};
export default Dropdown2 ;
 