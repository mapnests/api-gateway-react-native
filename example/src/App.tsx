import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGetAuthCasbinTestQuery } from './services/api';
import { useState, useEffect } from 'react';
import ApiGatway from 'api-gateway-react-native';
import { NativeModules } from 'react-native';

export default function App() {
  const [headers, setHeaders] = useState<Record<string, any> | null>(null);

  // RTK Query hook for your custom GET request
  const { data, error, isLoading, refetch } = useGetAuthCasbinTestQuery();

  const handleGetHeaders = async () => {
    try {
      const nativeHeaders = await ApiGatway.getHeaders();
      console.log(headers);
      setHeaders(nativeHeaders);
    } catch (e: any) {
      console.error('Error fetching native headers:', e.message || e);
      setHeaders({ error: e.message || String(e) || 'Failed to get headers' });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Auth Casbin Success Plugin Test</Text>

      <View style={styles.buttonContainer}>
        <Button title="Get Headers from Native" onPress={handleGetHeaders} />
      </View>

      {headers && (
        <View style={styles.resultContainer}>
          <Text style={styles.subtitle}>Native Headers:</Text>
          <Text style={styles.resultText}>{JSON.stringify(headers, null, 2)}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Fetch Auth Test" onPress={refetch} disabled={isLoading} />
      </View>

      {isLoading && <Text>Loading...</Text>}

      {error && (
        <View style={styles.resultContainer}>
          <Text style={styles.subtitle}>Error:</Text>
          <Text style={styles.errorText}>{JSON.stringify(error, null, 2)}</Text>
        </View>
      )}

      {data && (
        <View style={styles.resultContainer}>
          <Text style={styles.subtitle}>Response Data:</Text>
          <Text style={styles.resultText}>{JSON.stringify(data, null, 2)}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  buttonContainer: { marginVertical: 10, width: '80%' },
  resultContainer: { marginTop: 20, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5, width: '100%' },
  resultText: { fontFamily: 'monospace' },
  errorText: { fontFamily: 'monospace', color: 'red' },
});
