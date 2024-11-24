import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';  // Ajuste conforme sua estrutura
import { ThemedView } from '@/components/ThemedView';  // Ajuste conforme sua estrutura
import { useRouter } from 'expo-router';  // Hook do Expo Router para navegação
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastContainer, toast } from 'react-toastify';  // Importando o Toastify
import 'react-toastify/dist/ReactToastify.css';  // Estilos do Toastify

export default function HomeScreen() {
  const router = useRouter();  // Hook para navegação
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataCollected, setDataCollected] = useState<any>(null);  // Inicializando com null

  // Função para armazenar os dados no AsyncStorage
  const armazenarUsuario = async () => {
    console.log('Armazenando os dados coletados:', dataCollected);
    try {
      await AsyncStorage.setItem('dataCollected', JSON.stringify(dataCollected)); // Armazenando como string
      router.push('/explore'); // Navega para a tela Explore
      toast.success('Login realizado com sucesso!', {
        position: 'top-right', // Posição do toast
        autoClose: 3000, // Duração do toast
      });
    } catch (error) {
      console.error('Erro ao armazenar no AsyncStorage:', error);
      toast.error('Erro ao armazenar dados no dispositivo!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  // Efeito que será executado quando dataCollected mudar
  useEffect(() => {
    if (dataCollected) {
      console.log('Dados coletados:', dataCollected);
      armazenarUsuario();  // Chama a função para armazenar os dados
    }
  }, [dataCollected]);  // Dependência no estado dataCollected

  // Função de login que realiza a requisição ao backend
  const logar = () => {
    // Verifica se os campos estão vazios
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
          setDataCollected(data);  // Atualiza o estado dataCollected
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

      {/* Toastify container */}
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
