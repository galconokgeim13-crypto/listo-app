import { Text, View, TextInput, Button, FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!text.trim()) return;
    setItems([{ id: Date.now().toString(), name: text }, ...items]);
    setText('');
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 50 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>
        🛒 Список продуктов
      </Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Введите продукт"
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          marginBottom: 10
        }}
      />

      <Button title="Добавить" onPress={addItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18, marginTop: 10 }}>
            • {item.name}
          </Text>
        )}
      />
    </View>
  );
}