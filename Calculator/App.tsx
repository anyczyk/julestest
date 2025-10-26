import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Button = ({label, onPress, style}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => onPress(label)}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

function App(): React.JSX.Element {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumberInput = (num: string) => {
    if (displayValue === 'Error') {
      setDisplayValue(num);
      setOperator(null);
      setFirstValue('');
      setWaitingForOperand(false);
      return;
    }
    if (waitingForOperand) {
      setDisplayValue(num);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
  };

  const handleDecimalInput = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperatorInput = (op: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstValue === '') {
      setFirstValue(inputValue.toString());
    } else if (operator) {
      const result = calculate(parseFloat(firstValue), inputValue, operator);
      setFirstValue(result.toString());
      setDisplayValue(result.toString());
    }

    setWaitingForOperand(true);
    setOperator(op);
  };

  const calculate = (first, second, op) => {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '*') return first * second;
    if (op === '/') {
      if (second === 0) {
        return 'Error';
      }
      return first / second;
    }
    return second;
  };

  const handleEqual = () => {
    const inputValue = parseFloat(displayValue);
    if (operator && firstValue !== '') {
      const result = calculate(parseFloat(firstValue), inputValue, operator);
      setDisplayValue(result.toString());
      setFirstValue('');
      setOperator(null);
    }
  };

  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
    setWaitingForOperand(false);
  };

  const handleToggleSign = () => {
    if (displayValue !== 'Error') {
      setDisplayValue((parseFloat(displayValue) * -1).toString());
    }
  };

  const handlePercentage = () => {
    if (displayValue !== 'Error') {
      setDisplayValue((parseFloat(displayValue) / 100).toString());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.row}>
          <Button label="C" onPress={handleClear} />
          <Button label="+/-" onPress={handleToggleSign} />
          <Button label="%" onPress={handlePercentage} />
          <Button label="/" onPress={() => handleOperatorInput('/')} />
        </View>
        <View style={styles.row}>
          <Button label="7" onPress={() => handleNumberInput('7')} />
          <Button label="8" onPress={() => handleNumberInput('8')} />
          <Button label="9" onPress={() => handleNumberInput('9')} />
          <Button label="x" onPress={() => handleOperatorInput('*')} />
        </View>
        <View style={styles.row}>
          <Button label="4" onPress={() => handleNumberInput('4')} />
          <Button label="5" onPress={() => handleNumberInput('5')} />
          <Button label="6" onPress={() => handleNumberInput('6')} />
          <Button label="-" onPress={() => handleOperatorInput('-')} />
        </View>
        <View style={styles.row}>
          <Button label="1" onPress={() => handleNumberInput('1')} />
          <Button label="2" onPress={() => handleNumberInput('2')} />
          <Button label="3" onPress={() => handleNumberInput('3')} />
          <Button label="+" onPress={() => handleOperatorInput('+')} />
        </View>
        <View style={styles.row}>
          <Button
            label="0"
            onPress={() => handleNumberInput('0')}
            style={{flex: 2}}
          />
          <Button label="." onPress={handleDecimalInput} />
          <Button label="=" onPress={handleEqual} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: '#fff',
    fontSize: 60,
  },
  buttons: {
    flex: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
});

export default App;
