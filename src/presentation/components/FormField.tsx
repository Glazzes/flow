import React from 'react';
import Box from './Box';
import {TextInput} from 'react-native';
import Text from './Text';

type FormFieldProps = {
  field: {
    name: string;
    value: string;
    onChange: (name: string) => (text: string) => void;
    onBlur: (name: string) => void;
  };
  form: {
    setFieldTouched: (name: string) => void;
    errors: {
      [id: string]: string;
    };
    touched: {
      [id: string]: boolean;
    };
  };
};

const FormField: React.FC<FormFieldProps> = props => {
  const {
    field: {name, value, onChange, onBlur},
    form: {errors, touched, setFieldTouched},
  } = props;

  const onChangeText = (text: string): void => {
    onChange(name)(text);
  };

  const onBlurInput = () => {
    setFieldTouched(name);
    onBlur(name);
  };

  return (
    <Box>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlurInput}
        {...props}
      />
      {errors[name] && touched[name] ? <Text>{errors[name]}</Text> : null}
    </Box>
  );
};

export default FormField;
