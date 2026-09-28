// App.js
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput, Button } from "react-native";
import { API_BASE } from "./constants";
import CustomerCard from "./components/CustomerCard";
import { Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function App() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");


const handleAddCustomer = async () => {
  if (!firstName.trim() || !lastName.trim() || !email.trim()) {
    Alert.alert("Missing Information", "First name, last name, and email are all required.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone: "",
        status: "active",
        company: "",
        notes: "",
        tags: [],
      }),
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const newCustomer = await response.json();
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
    setFirstName("");
    setLastName("");
    setEmail("");
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Could not add customer. Please try again.");
  }
};


const handleDeleteCustomer = (customer) => {
  Alert.alert(
    "Delete Customer",
    `Are you sure you want to delete ${customer.firstName} ${customer.lastName}?`,
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteCustomer(customer.id),
      },
    ]
  );
};

const deleteCustomer = async (customerId) => {
  try {
    const response = await fetch(`${API_BASE}/customers/${customerId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== customerId)
    );
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Could not delete customer. Please try again.");
  }
};


  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/customers`);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
  <View style={styles.container}>
    <Text style={styles.header}>Customers</Text>
    <View style={styles.form}>
  <TextInput
    style={styles.input}
    placeholder="First name"
    value={firstName}
    onChangeText={setFirstName}
  />
  <TextInput
    style={styles.input}
    placeholder="Last name"
    value={lastName}
    onChangeText={setLastName}
  />
  <TextInput
    style={styles.input}
    placeholder="Email"
    value={email}
    onChangeText={setEmail}
    autoCapitalize="none"
    keyboardType="email-address"
  />
  <Button title="Add Customer" onPress={handleAddCustomer} />
</View>
    {isLoading ? (
      <ActivityIndicator size="large" />
    ) : (
<FlatList
  data={customers}
  keyExtractor={(customer) => customer.id}
  renderItem={({ item }) => (
    <CustomerCard
      customer={item}
      onDelete={() => handleDeleteCustomer(item)}
    />
  )}
  ListEmptyComponent={<Text>No customers yet.</Text>}
/>
    )}
    
  </View>
  </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },

  form: {
  marginBottom: 20,
  gap: 8,
},
input: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 6,
  paddingHorizontal: 12,
  paddingVertical: 8,
},
});