import { View, Text, Pressable, StyleSheet } from "react-native";

export default function CustomerCard({ customer, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {customer.firstName} {customer.lastName}
      </Text>
      <Text style={styles.email}>{customer.email}</Text>
      <Text>Phone: {customer.phone || "N/A"}</Text>
      <Text>Status: {customer.status}</Text>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  email: {
    color: "#555",
    marginBottom: 4,
  },
  deleteButton: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  deleteText: {
    color: "#e03131",
    fontWeight: "600",
  },
});