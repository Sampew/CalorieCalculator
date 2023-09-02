import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const intensityOptions = [
  { label: 'Light', value: 1.3 },
  { label: 'Usual', value: 1.5 },
  { label: 'Moderate', value: 1.7 },
  { label: 'Hard', value: 2.0 },
  { label: 'Very Hard', value: 2.2 },
];

export default function App() {

  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState('male');
  const [intensity, setIntensity] = useState(intensityOptions[0].value);
  const [calories, setCalories] = useState('');

  const calculateCalories = () => {
    const m = parseFloat(weight);
    const k = intensity;

    let E;
    if (gender === 'male') {
      E = (879 + 10.2 * m) * k;
    } else {
      E = (795 + 7.18 * m) * k;
    }

    setCalories(E.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weight (kg)</Text>
      <TextInput style = {styles.field} value={weight} onChangeText={text => setWeight(text)} 
      keyboardType='decimal-pad'/>
      <Text style={styles.header}>Intensity</Text>
      <Picker style={styles.field} selectedValue={intensity} onValueChange={(itemValue) => setIntensity(itemValue)}>
        {intensityOptions.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
      <Text style={styles.header}>Gender</Text>
      <Picker
        style={styles.picker}
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      <Button title="Calculate" onPress={calculateCalories} />
      {calories !== '' && <Text style={styles.result}>Calories: {calories}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 10,
  },
  field: {
    marginBottom: 10,
  }
});

