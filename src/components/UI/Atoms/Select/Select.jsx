import React, { useState } from 'react';
import styles from './SelectStyle.module.css';
import Button from "../Button/Button";
import ItemButton from "../ItemButton/ItemButton";

const Select = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className={styles.dropdown}>
            <div className={styles.btn}>
                <Button onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption || 'Select an option'}
                </Button>

            </div>
             {isOpen && (
                <ul className={styles.dropdownList}>
                    {options.map((option, index) => (
                        <li key={index} className={styles.dropdownListItem} onClick={() => handleSelect(option)}>
                            <ItemButton>
                                {option}
                            </ItemButton>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;