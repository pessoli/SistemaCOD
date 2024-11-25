import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { useRouter } from 'expo-router';  
import AsyncStorage from '@react-native-async-storage/async-storage';  

export default function HomeScreen() {
  const router = useRouter();  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataCollected, setDataCollected] = useState<any>(null);
  const [erro, setErro] = useState(false);  // Estado para controlar a exibição do erro
  const [campoVazio, setCampoVazio] = useState({ email: false, senha: false }); // Para verificar se os campos estão vazios

  const armazenarUsuario = async () => {
    console.log('Armazenando os dados coletados:', dataCollected);
    try {
      await AsyncStorage.setItem('dataCollected', JSON.stringify(dataCollected));
      router.push('/explore');
    } catch (error) {
      console.error('Erro ao armazenar no AsyncStorage:', error);
    }
  };

  useEffect(() => {
    if (dataCollected) {
      console.log('Dados coletados:', dataCollected);
      armazenarUsuario(); 
    }
  }, [dataCollected]);

  const logar = () => {
    // Verifica se os campos estão vazios e atualiza o estado de erro
    if (!email || !senha) {
      setCampoVazio({ email: !email, senha: !senha });  // Marca os campos como vazios
      setErro(false);  // Reseta o erro de login
      return;
    }

    // Resetando o erro sempre que o usuário tenta logar
    setErro(false);

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
          // Se os dados retornados forem nulos ou a resposta for 204, o login é inválido
          setErro(true);  // Exibe erro de login inválido
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        setErro(true);  // Exibe erro caso a requisição falhe
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bemVindo}>SISTEMA COD</Text>

      <Text>EMAIL</Text>
      <TextInput
        style={[styles.input, campoVazio.email && styles.inputErro]}  // Se o campo estiver vazio, aplica a borda vermelha
        onChangeText={setEmail}
        value={email}
        placeholder="Digite seu e-mail"
      />

      <Text>SENHA</Text>
      <TextInput
        style={[styles.input, campoVazio.senha && styles.inputErro]}  // Se o campo estiver vazio, aplica a borda vermelha
        onChangeText={setSenha}
        value={senha}
        secureTextEntry
        placeholder="Digite sua senha"
      />

      <TouchableOpacity onPress={logar}>
        <Text style={styles.botao}>LOGAR</Text>
      </TouchableOpacity>

      {/* Mensagem de erro */}
      {erro && (
        <Text style={styles.erroMensagem}>Email ou senha incorretos</Text>
      )}
    </View>
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
  inputErro: {
    borderColor: 'red',  // Adiciona a borda vermelha para campos com erro
  },
  erroMensagem: {
    color: 'red',
    marginTop: 10,
  },
});
