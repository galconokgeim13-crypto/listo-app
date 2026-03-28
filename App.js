import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, TextInput, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

const Tab = createBottomTabNavigator();

// База рецептов
const recipesDB = [
  { id: '1', name: '🍳 Яичница', ingredients: ['яйца', 'масло'], calories: 250, price: 80 },
  { id: '2', name: '🥪 Бутерброд', ingredients: ['хлеб', 'масло', 'сыр'], calories: 320, price: 95 },
  { id: '3', name: '🥗 Салат', ingredients: ['помидоры', 'огурцы', 'сыр'], calories: 180, price: 150 },
  { id: '4', name: '🥔 Пюре', ingredients: ['картошка', 'молоко', 'масло'], calories: 210, price: 70 },
  { id: '5', name: '🍲 Омлет', ingredients: ['яйца', 'молоко', 'масло'], calories: 280, price: 85 }
];

const caloriesDB = { 'яйца': 155, 'хлеб': 265, 'масло': 717, 'сыр': 350, 'помидоры': 18, 'огурцы': 15, 'картошка': 77, 'молоко': 60 };
const priceDB = { 'яйца': 12, 'хлеб': 50, 'масло': 120, 'сыр': 80, 'помидоры': 40, 'огурцы': 35, 'картошка': 15, 'молоко': 70 };

// ЭКРАН ПРОДУКТОВ
function ProductsScreen({ products, setProducts, recipes, setSelectedRecipe }) {
  const [text, setText] = useState('');

  const addProduct = () => {
    if (!text.trim()) return;
    setProducts([...products, { id: Date.now().toString(), name: text.toLowerCase().trim() }]);
    setText('');
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>🍳 Мои продукты</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput value={text} onChangeText={setText} placeholder="Продукт" style={{ flex: 1, borderWidth: 1, padding: 10, borderRadius: 8, marginRight: 10, backgroundColor: 'white' }} />
        <Button title="+" onPress={addProduct} />
      </View>
      <Text style={{ marginTop: 20, fontSize: 18 }}>📋 Список ({products.length}):</Text>
      {products.map(p => <View key={p.id} style={{ padding: 10, backgroundColor: 'white', marginTop: 5, borderRadius: 8 }}><Text>• {p.name}</Text></View>)}
      <Text style={{ marginTop: 20, fontSize: 18 }}>👨‍🍳 Рецепты:</Text>
      {recipes.map(r => (
        <TouchableOpacity key={r.id} onPress={() => setSelectedRecipe(r)} style={{ padding: 15, backgroundColor: 'white', marginTop: 10, borderRadius: 10 }}>
          <Text>{r.name}</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>{r.ingredients.join(', ')}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// КАЛОРИИ
function CaloriesScreen({ products, recipes }) {
  const calc = (r) => r.ingredients.reduce((sum, i) => sum + (caloriesDB[i] || 0), 0);
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>📊 Калории</Text>
      {products.map(p => <Text key={p.id}>• {p.name}: {caloriesDB[p.name] || 0} ккал/100г</Text>)}
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Блюда:</Text>
      {recipes.map(r => <Text key={r.id}>{r.name}: {calc(r)} ккал</Text>)}
    </View>
  );
}

// ЦЕНЫ
function PriceScreen({ products, recipes }) {
  const calc = (r) => r.ingredients.reduce((sum, i) => sum + (priceDB[i] || 0), 0);
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>💰 Цены</Text>
      {products.map(p => <Text key={p.id}>• {p.name}: {priceDB[p.name] || 0} ₽</Text>)}
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Блюда:</Text>
      {recipes.map(r => <Text key={r.id}>{r.name}: {calc(r)} ₽</Text>)}
    </View>
  );
}

// ГЛАВНЫЙ КОМПОНЕНТ
export default function App() {
  const [products, setProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const available = recipesDB.filter(r => r.ingredients.every(i => products.some(p => p.name.includes(i))));
    setRecipes(available);
  }, [products]);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Продукты">{() => <ProductsScreen products={products} setProducts={setProducts} recipes={recipes} setSelectedRecipe={setSelectedRecipe} />}</Tab.Screen>
        <Tab.Screen name="Калории">{() => <CaloriesScreen products={products} recipes={recipes} />}</Tab.Screen>
        <Tab.Screen name="Цены">{() => <PriceScreen products={products} recipes={recipes} />}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
