import type { StylesConfig } from "react-select";

export type OptionType = {
  value: string;
  label: string;
};

const customSelectStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '40px',
    height: '40px',
    borderRadius: '8px',
    border: '1px solid #2b6cb0',
    background: '#fff', 
    boxShadow: 'none',
    fontWeight: 500,
    fontSize: '0.85rem',
    cursor: 'pointer',
    width: '100%',
    minWidth: '200px',
    transition: 'border-color 0.2s',

    '&:hover': {
        borderColor: '#2b6cb0', 
        background: '#f2f4f5',
        color: '#fff'    
    },

    ...(state.isFocused && {
        borderColor: '#2b6cb0',
    }),
    }),
    valueContainer: (provided) => ({
    ...provided,
    height: '40px',
    padding: '0 16px',
    }),
    indicatorsContainer: (provided) => ({
    ...provided,
    height: '40px',
    }),
  singleValue: (provided, state: any) => ({
    ...provided,
    color: state.isFocused ? '#fff' : '#2b6cb0',
    fontWeight: 500,
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected
      ? '#2b6cb0'
      : state.isFocused
      ? '#e3eafc'
      : '#fff',
    color: state.isSelected ? '#fff' : '#2b6cb0',
    fontWeight: 500,
    cursor: 'pointer',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#2b6cb0',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 20,
  }),
  input: (provided) => ({
    ...provided,
    color: '#2b6cb0',
  }),
};

export default customSelectStyles;