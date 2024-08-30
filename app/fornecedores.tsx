// React
import { useEffect, useState } from 'react'

// React native
import { View, Text, StyleSheet, TextInput, Image, FlatList, Modal, Pressable } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

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

    // state - isLoading
    const [isLoading, setIsLoading] = useState<boolean>(true)

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

                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        // Executando a função
        getFonecedores()

    }, [])

    // state - fornecedores
    const [fornecedores, setFornecedores] = useState<FornecedorProps[]>()

    // state - isVisible
    const [isVisible, setIsVisible] = useState<boolean>(false)

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
                {isLoading ? (
                    <Text style={style.title}>Buscando Fornecedores...</Text>
                ):(
                    <FlatList
                        data={fornecedores}
                        renderItem={(item) => (
                            <View style={style.fornecedorStyle}>

                                {/* Content */}
                                <View style={style.fornecedorContent}>
                                    <Image style={style.imagem} source={{uri:item.item.imagem as string}}/>
                                    <Text>{item.item.nome}</Text>
                                </View>

                                {/* Button open modal */}
                                <Pressable onPress={() => setIsVisible(true)}>
                                    <Ionicons name='open' color='black' size={24}/>
                                </Pressable>

                                {/* Modal */}
                                <Modal animationType='fade' transparent={true} visible={isVisible}>
                                    <View style={style.overlay}>
                                        <View style={style.modal}>
                                            <Pressable style={{alignSelf:'flex-end'}} onPress={() => setIsVisible(false)}>
                                                <Ionicons name='close' color='white' size={24}/>
                                            </Pressable>

                                            <Image style={style.imageModal} source={{uri:item.item.imagem as string}}/>

                                            <Text style={style.text}>Nome: {item.item.nome}</Text>
                                            <Text style={style.text}>Endereco: {item.item.endereco}</Text>
                                            <Text style={style.text}>Contato: {item.item.contato}</Text>
                                            <Text style={style.text}>Categoria: {item.item.categoria}</Text>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        )}
                    />
                )}
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
        color:'rgb(255, 255, 255)',
        paddingLeft:10,
        fontSize:17
    },

    title:{
        textAlign:'center',
        color:'white',
        fontSize:20
    },

    listContainer:{
        marginTop:10,
        padding:7
    },

    fornecedorStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'rgb(242, 234, 234)',
        padding:10,
        borderRadius:5,
        margin:5
    },

    fornecedorContent:{
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    
    imagem:{
        height:40,
        width:40,
        borderRadius:100
    },

    modal:{
        backgroundColor:'rgb(50, 50, 50)',
        height:'50%',
        width:'90%',
        transform:'translate(-50%, 30%)',
        left:'50%',
        padding:20,
        borderRadius:10,
        gap:10
    },

    overlay:{
        backgroundColor:'rgba(36, 36, 36, 0.4)',
        height:'100%',
    },

    imageModal:{
        height:100,
        width:100,
        borderRadius:100,
        alignSelf:'center'
    },
})