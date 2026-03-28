import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, TextInput, Button, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import * as Speech from 'expo-speech';
import * as Voice from 'expo-speech-recognition';

const Tab = createBottomTabNavigator();

// ========== БАЗА ДАННЫХ ==========
const recipesDB = [
  {
    id: '1',
    name: '🍳 Яичница',
    ingredients: ['яйца', 'масло', 'соль'],
    description: 'Разбейте яйца на сковороду, жарьте 3 минуты.',
    calories: 250,
    price: 80
  },
  {
    id: '2',
    name: '🥪 Бутерброд',
    ingredients: ['хлеб', 'масло', 'сыр', 'колбаса'],
    description: 'Намажьте масло на хлеб, добавьте сыр и колбасу.',
    calories: 320,
    price: 95
  },
  {
    id: '3',
    name: '🥗 Греческий салат',
    ingredients: ['помидоры', 'огурцы', 'сыр', 'оливки', 'масло'],
    description: 'Нарежьте овощи, добавьте сыр и заправьте маслом.',
    calories: 180,
    price: 150
  },
  {
    id: '4',
    name: '🥔 Картофельное пюре',
    ingredients: ['картошка', 'молоко', 'масло', 'соль'],
    description: 'Сварите картошку, разомните с молоком и маслом.',
    calories: 210,
    price: 70
  },
  {
    id: '5',
    name: '🍲 Омлет',
    ingredients: ['яйца', 'молоко', 'соль', 'масло'],
    description: 'Взбейте яйца с молоком, жарьте 5 минут.',
    calories: 280,
    price: 85
  }
];

// База калорийности продуктов (на 100г)
const caloriesDB = {
  'яйца': 155,
  'хлеб': 265,
  'масло': 717,
  'сыр': 350,
  'колбаса': 300,
  'помидоры': 18,
  'огурцы': 15,
  'оливки': 115,
  'картошка': 77,
  'молоко': 60,
  'соль': 0
};

// База цен продуктов (за 1 шт или 100г)
const priceDB = {
  'яйца': 12,
  'хлеб': 50,
  'масло': 120,
  'сыр': 80,
  'колбаса': 150,
  'помидоры': 40,
  'огурцы': 35,
  'оливки': 90,
  'картошка': 15,
  'молоко': 70,
  'соль': 10
};

// ========== ЭКРАН ПРОДУКТОВ И РЕЦЕПТОВ ==========
function ProductsScreen({ products, setProducts, recipes, setRecipes, findAvailableRecipes, addProduct, startListening, isListening, setSelectedRecipe, selectedRecipe, speakRecipe }) {
  const [inputText, setInputText] = useState('');

  const handleAddProduct = () => {
    addProduct(inputText);
    setInputText('');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
          🍳 Готовим из того, что есть
        </Text>

        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 10 }}>📝 Что у вас есть?</Text>
        
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Напишите продукт..."
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#ddd',
              padding: 12,
              borderRadius: 10,
              marginRight: 10,
              backgroundColor: 'white'
            }}
          />
          <Button title="➕" onPress={handleAddProduct} />
        </View>

        <TouchableOpacity
          onPress={startListening}
          style={{
            backgroundColor: isListening ? '#ff6b6b' : '#4ecdc4',
            padding: 12,
            borderRadius: 10,
            marginBottom: 20,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            {isListening ? '🎤 Слушаю...' : '🎙️ Добавить голосом'}
          </Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 10 }}>🛒 Ваши продукты ({products.length}):</Text>
        
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => setProducts(products.filter(p => p.id !== product.id))}
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 8,
              marginBottom: 5,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text>• {product.name}</Text>
            <Text style={{ color: '#ff6b6b' }}>✖️</Text>
          </TouchableOpacity>
        ))}

        <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 20, marginBottom: 10 }}>👨‍🍳 Что можно приготовить:</Text>

        {recipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            onPress={() => {
              setSelectedRecipe(recipe);
              speakRecipe(recipe);
            }}
            style={{
              backgroundColor: 'white',
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '500' }}>{recipe.name}</Text>
            <Text style={{ color: '#666' }}>Нужно: {recipe.ingredients.join(', ')}</Text>
          </TouchableOpacity>
        ))}

        {selectedRecipe && (
          <View style={{ marginTop: 20, padding: 15, backgroundColor: '#fff3e0', borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>📖 {selectedRecipe.name}</Text>
            <Text style={{ marginTop: 10 }}>{selectedRecipe.description}</Text>
            <Button title="🔊 Озвучить" onPress={() => speakRecipe(selectedRecipe)} />
            <Button title="✖️ Закрыть" onPress={() => setSelectedRecipe(null)} color="#999" />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// ========== ЭКРАН КАЛОРИЙ ==========
function CaloriesScreen({ products, recipes }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const calculateCalories = (recipe) => {
    let total = 0;
    recipe.ingredients.forEach(ing => {
      const baseIng = ing.split(' ')[0];
      total += caloriesDB[baseIng] || 0;
    });
    return total;
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
          📊 КАЛОРИЙНОСТЬ
        </Text>

        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 10 }}>Ваши продукты:</Text>
        {products.map(p => (
          <View key={p.id} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'white', marginBottom: 5, borderRadius: 8 }}>
            <Text>• {p.name}</Text>
            <Text>🔥 {caloriesDB[p.name] || 0} ккал / 100г</Text>
          </View>
        ))}

        <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 20, marginBottom: 10 }}>Блюда:</Text>
        {recipes.map(recipe => (
          <TouchableOpacity key={recipe.id} onPress={() => setSelectedRecipe(recipe)} style={{ padding: 15, backgroundColor: 'white', marginBottom: 10, borderRadius: 10 }}>
            <Text style={{ fontSize: 16 }}>{recipe.name}</Text>
            <Text>🔥 {calculateCalories(recipe)} ккал (примерно)</Text>
          </TouchableOpacity>
        ))}

        {selectedRecipe && (
          <View style={{ marginTop: 20, padding: 15, backgroundColor: '#e0f7fa', borderRadius: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{selectedRecipe.name}</Text>
            <Text>Калорий: {calculateCalories(selectedRecipe)} ккал</Text>
            <Text>Состав: {selectedRecipe.ingredients.join(', ')}</Text>
            <Button title="Закрыть" onPress={() => setSelectedRecipe(null)} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// ========== ЭКРАН СЕБЕСТОИМОСТИ ==========
function PriceScreen({ products, recipes }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const calculatePrice = (recipe) => {
    let total = 0;
    recipe.ingredients.forEach(ing => {
      const baseIng = ing.split(' ')[0];
      total += priceDB[baseIng] || 0;
    });
    return total;
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
          💰 СЕБЕСТОИМОСТЬ
        </Text>

        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 10 }}>Цены на продукты (за 100г/шт):</Text>
        {products.map(p => (
          <View key={p.id} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'white', marginBottom: 5, borderRadius: 8 }}>
            <Text>• {p.name}</Text>
            <Text>💵 {priceDB[p.name] || 0} ₽</Text>
          </View>
        ))}

        <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 20, marginBottom: 10 }}>Стоимость блюд:</Text>
        {recipes.map(recipe => (
          <TouchableOpacity key={recipe.id} onPress={() => setSelectedRecipe(recipe)} style={{ padding: 15, backgroundColor: 'white', marginBottom: 10, borderRadius: 10 }}>
            <Text style={{ fontSize: 16 }}>{recipe.name}</Text>
            <Text>💰 {calculatePrice(recipe)} ₽ (примерно)</Text>
          </TouchableOpacity>
        ))}

        {selectedRecipe && (
          <View style={{ marginTop: 20, padding: 15, backgroundColor: '#e8f5e9', borderRadius: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{selectedRecipe.name}</Text>
            <Text>Себестоимость: {calculatePrice(selectedRecipe)} ₽</Text>
            <Text>Ингредиенты: {selectedRecipe.ingredients.join(', ')}</Text>
            <Button title="Закрыть" onPress={() => setSelectedRecipe(null)} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// ========== ГЛАВНЫЙ КОМПОНЕНТ ==========
export default function App() {
  const [products, setProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const addProduct = (name) => {
    if (!name.trim()) return;
    setProducts([...products, { id: Date.now().toString(), name: name.toLowerCase().trim() }]);
  };

  const findAvailableRecipes = () => {
    const available = recipesDB.filter(recipe =>
      recipe.ingredients.every(ing => products.some(p => p.name.includes(ing)))
    );
    setRecipes(available);
  };

  const startListening = async () => {
    try {
      const { available } = await Voice.getAvailabilityAsync();
      if (!available) {
        Alert.alert('Ошибка', 'Голосовой ввод не поддерживается');
        return;
      }
      setIsListening(true);
      const result = await Voice.startListeningAsync();
      if (result && result.text) addProduct(result.text);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось распознать голос');
    } finally {
      setIsListening(false);
    }
  };

  const speakRecipe = (recipe) => {
    Speech.speak(recipe.description, { language: 'ru' });
  };

  useEffect(() => {
    findAvailableRecipes();
  }, [products]);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Продукты">
          {() => <ProductsScreen 
            products={products} setProducts={setProducts}
            recipes={recipes} setRecipes={setRecipes}
            findAvailableRecipes={findAvailableRecipes}
            addProduct={addProduct} startListening={startListening}
            isListening={isListening} setSelectedRecipe={setSelectedRecipe}
            selectedRecipe={selectedRecipe} speakRecipe={speakRecipe}
          />}
        </Tab.Screen>
        <Tab.Screen name="Калории">
          {() => <CaloriesScreen products={products} recipes={recipes} />}
        </Tab.Screen>
        <Tab.Screen name="Цены">
          {() => <PriceScreen products={products} recipes={recipes} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
