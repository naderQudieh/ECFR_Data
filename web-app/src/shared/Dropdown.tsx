import React, { useState } from 'react';


interface Option {
    value: string;
    label: string;
}

interface Props {
    options: Option[];
    onChange: (value: string) => void;
}

const Dropdown: React.FC<Props> = ({ options, onChange }) => {
    const [selectedValue, setSelectedValue] = useState<string>(options[0]?.value || "");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        onChange(event.target.value);
    };

    return (
        < div className="select-wrapper" >
            <select   value={selectedValue} onChange={handleChange} >
                {
                    options.map((option) => (
                        <option key={option.value} value={option.value} >
                            {option.label}
                        </option>
                    ))
                }
            </select>
        </div>
      
  );
};

export default Dropdown;