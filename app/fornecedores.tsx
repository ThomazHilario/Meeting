// React
import { useEffect, useState } from 'react'

// React native
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'

// Picker
import { Picker } from '@react-native-picker/picker'

// Firebase
import { db } from '@/services/firebase'
import { getDocs, query, collection } from 'firebase/firestore'

interface FornecedorProps{
    id:string,
    imagem:null | string,
    nome:string,
    endereco:string,
    contato:string,
    categoria:string
}

export default function Fornecedores(){

    useEffect(() => {
        async function getFonecedores(){
            try {
                // Buscando todas as coleções do banco de dados
                const q = query(collection(db, 'Fornecedores'))
                
                // Faer um requisição paara buscar os dados e armazenar na variável
                const snapshot = await getDocs(q)

                // Array que conterá todos os fornecedores
                const fornecedoresDatabase:FornecedorProps[] = []

                // Percorrendo array
                snapshot.forEach((fornecedor) => {
                    // Adicionar cada fornecedor ao array fornecedoresDatabase
                    fornecedoresDatabase.push(fornecedor.data() as FornecedorProps)
                })

                // Salvando na state de Fornecedores
                setFornecedores(fornecedoresDatabase)
            } catch (error) {
                console.log(error)
            }
        }

        // Executando a função
        getFonecedores()

    }, [])

    const [fornecedores, setFornecedores] = useState<FornecedorProps[]>()

    return(
        <View style={style.container}>
            <View style={style.seach}>
                <TextInput style={style.seachInput}/>

                <Picker style={style.seachPicker}>
                    <Picker.Item label='Monopolistas' value='monopolistas'/>
                    <Picker.Item label='Habituais' value='habituais'/>
                    <Picker.Item label='Especiais' value='especiais'/>
                </Picker>
            </View>

            <View style={style.listContainer}>
                <FlatList
                    data={fornecedores}
                    renderItem={(item) => (
                        <View style={style.fornecedorStyle}>
                            {item.item.nome}
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(36, 36, 36)'
    },

    seach:{
        flexDirection:'row',
        marginTop:20,
        padding:10,
        gap:2
    },

    seachInput:{
        padding:5,
        flexGrow:2,
        borderWidth:1,
        borderColor:'white',
        borderRadius:3,
        color:'white',
        
    },

    seachPicker:{
        borderRadius:3
    },

    text:{
        color:'rgb(255, 255, 255)'
    },

    listContainer:{
        marginTop:10,
        padding:7
    },

    fornecedorStyle:{
        backgroundColor:'rgb(242, 234, 234)',
        padding:10,
        borderRadius:5,
        margin:5
    }
})