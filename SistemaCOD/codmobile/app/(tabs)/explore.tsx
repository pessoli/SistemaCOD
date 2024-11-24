import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, Modal, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';

interface TipoDespesaData {
    id: number;
    tipoDespesa: string;
    valorTotal: number;
    limite: number;
    idDespesa: number;
    valorLimite: number;
}

const screenWidth = Dimensions.get("window").width;

const Despesas = () => {
    const [dados, setDados] = useState<TipoDespesaData[]>([]);
    const [dataCollected, setDataCollected] = useState<any | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [despesaSelecionada, setDespesaSelecionada] = useState<TipoDespesaData | null>(null);
    const [valorPagamento, setValorPagamento] = useState('');
    const [idDespesaOk, setIdDespesaOk] = useState(0);
    const [tiposDespesa, setTiposDespesa] = useState<TipoDespesaData[]>([]);
    const [observacao, setObservacao] = useState('');
    const [valor, setValor] = useState('');
    const [observacaoValida, setObservacaoValida] = useState(true);  // Novo estado para controlar a validação da observação
    const [updated, setUpdated] = useState(0); // Estado para forçar a atualização


    useEffect(() => {
        const recuperarUsuario = async () => {
            const tempDataCollected = await AsyncStorage.getItem('dataCollected');
            if (tempDataCollected) {
                setDataCollected(JSON.parse(tempDataCollected));
                console.log("Retirando do cache: ", JSON.parse(tempDataCollected));
            }
        };
        recuperarUsuario();
    }, []);

    useEffect(() => {
        if (dataCollected) {
            buscarTiposDespesa();
        }
    }, [dataCollected]);

    const buscarTiposDespesa = async () => {
        if (!dataCollected) return;

        try {
            const response = await fetch(`http://localhost:8080/tipo_despesa/busca/${dataCollected.id}`);
            if (!response.ok) throw new Error('Erro ao buscar os tipos de despesa: ' + response.statusText);
            const data = await response.json();

            console.log("Tipos de Despesa recebidos da API:", data);
            if (Array.isArray(data)) {
                setTiposDespesa(data);
            } else {
                console.error("A resposta da API não é um array", data);
            }
        } catch (error) {
            console.error("Erro ao buscar os tipos de despesa:", error);
        }
    };

    useEffect(() => {
        if (tiposDespesa.length > 0) {
            buscarDespesas();
        }
    }, [tiposDespesa]);

    const buscarDespesas = async () => {
        if (!dataCollected || tiposDespesa.length === 0) return;
    
        try {
            const tiposComSoma = await Promise.all(tiposDespesa.map(async (tipo) => {
                const somaResponse = await fetch(`http://localhost:8080/despesas/soma/${tipo.id}`);
                if (!somaResponse.ok) throw new Error('Erro ao buscar soma das despesas');
                const soma = await somaResponse.json();
                return { ...tipo, valorTotal: soma || 0 };
            }));
    
            setDados(tiposComSoma);
            setUpdated(prev => prev + 1);  // Atualiza o contador para forçar re-renderização
        } catch (error) {
            console.error("Erro ao buscar as despesas:", error);
        }
    };
    

    const cadastrarDespesa = async () => {
        // Verificar se todos os campos foram preenchidos
        if (!despesaSelecionada || !valor || !observacao) {
            console.log("preencha todos os campos");
            if (!observacao) {
                setObservacaoValida(false); // Marca a observação como inválida se estiver vazia
            }
            return;
        }
    
        // Verificar se o valor é um número válido
        if (isNaN(Number(valor)) || valor.trim() === '') {
            console.log("preencha valor valido");
            return;
        }
    
        try {
            const dataAtual = new Date().toISOString();
    
            const response = await fetch('http://localhost:8080/despesas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idTipoDespesa: despesaSelecionada.id,
                    idUsuario: dataCollected.id,
                    valor: parseFloat(valor),
                    observacao: observacao,
                    data: dataAtual,
                }),
            });
    
            if (!response.ok) throw new Error('Erro ao cadastrar a despesa');
    
            console.log("cadastrado com sucesso");
    
            setModalVisible(false);
            setValor('');
            setObservacao('');
            setObservacaoValida(true); // Restaura a validação
    
            // Chama a função de busca para atualizar os dados após o cadastro
            buscarDespesas();
        } catch (error) {
            console.error('Erro ao cadastrar despesa:', error);
        }
    };
    

    const handleValorChange = (text: string) => {
        // Expressão regular para permitir apenas números e um ponto decimal
        const regex = /^[0-9]*\.?[0-9]*$/;
        if (regex.test(text)) {
            setValor(text);  // Atualiza o valor se for um número válido
        }
    };

    const Tabelas = dados.map((tipoDespesa, index) => {
        const valorRestante = tipoDespesa.limite - tipoDespesa.valorTotal;
        const corFundo = '#96b8ff';
        const corTexto = '#96b8ff';
        const statusTexto = valorRestante > 0 ? "Disponível" : "Falta";
        console.log("limite da despesa: " + tipoDespesa.limite);

        const data = {
            labels: ['Gasto', 'Limite'],
            datasets: [
                {
                    data: [tipoDespesa.valorTotal, tipoDespesa.valorLimite],
                    color: (opacity = 1) => `rgba(34, 202, 236, ${opacity})`,
                    strokeWidth: 5,
                },
            ],
        };

        return (
            <View key={index} style={styles.container}>
                <Text style={styles.despesaText}>{tipoDespesa.tipoDespesa}</Text>
                <Text style={styles.valorTotalText}>Total Gasto: R${tipoDespesa.valorTotal}/R${tipoDespesa.valorLimite}</Text>
                <Text style={styles.valorTotalText}>
                    {tipoDespesa.valorTotal > tipoDespesa.valorLimite
                        ? "Passou o limite"
                        : "Dentro do limite"
                    }
                </Text>

                <LineChart
                    data={data}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: corFundo,
                        backgroundGradientFrom: corFundo,
                        backgroundGradientTo: corFundo,
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: { borderRadius: 16 },
                        propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
                    }}
                    style={{ marginVertical: 8, borderRadius: 16 }}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setDespesaSelecionada(tipoDespesa);
                        setModalVisible(true);
                        setIdDespesaOk(tipoDespesa.idDespesa);
                    }}
                >
                    <Text style={styles.buttonText}>Cadastrar Despesa</Text>
                </TouchableOpacity>
            </View>
        );
    });

    return (
        <ScrollView style={styles.scrollView}>
            <View>{Tabelas}</View>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Cadastrar Despesa</Text>
                        {despesaSelecionada && (
                            <Text style={styles.modalSubtitle}>
                                Tipo de Despesa: {despesaSelecionada.tipoDespesa}
                            </Text>
                        )}
                        <TextInput
                            style={styles.input}
                            placeholder="Informe o valor da despesa"
                            keyboardType="numeric"
                            value={valor}
                            onChangeText={handleValorChange}  // Usando a função de validação
                        />
                        <TextInput
                            style={[styles.input, !observacaoValida && styles.inputErro]}  // Aplica o estilo de erro
                            placeholder="Observação"
                            value={observacao}
                            onChangeText={setObservacao}
                        />
                        <TouchableOpacity style={styles.button} onPress={cadastrarDespesa}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    despesaText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    valorTotalText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginBottom: 10,
    },
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    scrollView: {
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 8,
        marginTop: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: screenWidth - 40,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        marginBottom: 20,
    },
    inputErro: {
        borderColor: 'red', // Estilo para a borda vermelha
    },
    buttonCancel: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
});

export default Despesas;
