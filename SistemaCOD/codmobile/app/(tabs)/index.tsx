import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';  
import { ThemedView } from '@/components/ThemedView';  
import { useRouter } from 'expo-router';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

export default function HomeScreen() {
  const router = useRouter();  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataCollected, setDataCollected] = useState<any>(null);  

  const armazenarUsuario = async () => {
    console.log('Armazenando os dados coletados:', dataCollected);
    try {
      await AsyncStorage.setItem('dataCollected', JSON.stringify(dataCollected));
      router.push('/explore'); 
      toast.success('Login realizado com sucesso!', {
        position: 'top-right', 
        autoClose: 3000, 
      });
    } catch (error) {
      console.error('Erro ao armazenar no AsyncStorage:', error);
      toast.error('Erro ao armazenar dados no dispositivo!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (dataCollected) {
      console.log('Dados coletados:', dataCollected);
      armazenarUsuario(); 
    }
  }, [dataCollected]);

  const logar = () => {
    if (!email || !senha) {
      toast.warn('Por favor, preencha todos os campos.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    fetch(`http://localhost:8080/usuarios/login?email=${email}&senha=${senha}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }

        if (response.status === 204) {
          return null;
        }

        return response.json();
      })
      .then(data => {
        if (data) {
          console.log('Dados recebidos do login:', data);
          setDataCollected(data); 
        } else {
          alert('Usuário ou senha inválidos');
          toast.error('Usuário ou senha inválidos!', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        toast.error('Erro ao tentar realizar login!', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.bemVindo}>SISTEMA COD</ThemedText>
      <ThemedText>EMAIL</ThemedText>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Digite seu e-mail"
      />

      <ThemedText>SENHA</ThemedText>
      <TextInput
        style={styles.input}
        onChangeText={setSenha}
        value={senha}
        secureTextEntry
        placeholder="Digite sua senha"
      />

      <TouchableOpacity onPress={logar}>
        <ThemedText style={styles.botao}>LOGAR</ThemedText>
      </TouchableOpacity>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,  
  },
  bemVindo: {
    fontSize: 32,  
    fontWeight: 'bold',
    color: 'black', 
    marginBottom: 70,  
    marginTop: -40,  
  },
  botao: {
    color: 'white',
    backgroundColor: 'blue',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    width: 150,
    marginTop: 20,
  },
  input: {
    height: 40,
    width: 285,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});
