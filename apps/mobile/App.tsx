import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon École</Text>
      <Text style={styles.subtitle}>Cours, exercices et corrections, partout.</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Accueil" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", color: "#0369a1" },
  subtitle: { fontSize: 16, color: "#555", marginTop: 8, textAlign: "center" },
});
