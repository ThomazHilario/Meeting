// React
import { useEffect, useState } from 'react'

// React native
import { View, Text, StyleSheet, TextInput, Image, FlatList, Modal, Pressable } from 'react-native'

// Router
import { Link } from 'expo-router'

// Vector-icons
import { Ionicons } from '@expo/vector-icons'

// Components
import { FornecedorModal } from '@/components/modal'

// Picker
import { Picker } from '@react-native-picker/picker'

// Firebase
import { db } from '@/services/firebase'
import { getDocs, query, collection } from 'firebase/firestore'

export interface FornecedorProps{
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

    // state - seach
    const [seach, setSeach] = useState<string>('')

    // state - selectValue
    const [selectValue, setSelectValue] = useState<string>('default')

    // state - fornecedores
    const [fornecedores, setFornecedores] = useState<FornecedorProps[]>([])

    // state - fornecedorData
    const [fornecedorData, setFornecedorData] = useState<FornecedorProps>()

    // state - isVisible
    const [isVisible, setIsVisible] = useState<boolean>(false)

    // filterFornecedores
    const filterFornecedores = () => {
        if(seach !== '' && selectValue === 'default'){
            return fornecedores?.filter(fornecedor => (
                fornecedor.nome.toLowerCase().includes(seach.toLowerCase())
            ))
        } 

        if(seach === '' && selectValue !== 'default' || seach !== '' && selectValue !== 'default'){
            return fornecedores?.filter(fornecedor => (
                fornecedor.categoria.toLowerCase().includes(selectValue.toLowerCase())
            ))
        }
        return fornecedores
        
    }

    const showModalAndData = (fornecedor:FornecedorProps) => {
        setIsVisible(true)

        setFornecedorData(fornecedor)
    }

    // Exluir fornecedor
    const deleteFornecedor = (id:string) => {
        setFornecedores(fornecedores?.filter(fornecedor => fornecedor.id !== id))
    }

    return(
        <View style={style.container}>

            {/* Link para voltar a rota inicial */}
            <Link style={{alignSelf:'flex-start'}} href='/'>
                <Ionicons name='arrow-back' color='white' size={32}/>
            </Link>

            <View style={style.seach}>
                <TextInput style={style.seachInput} value={seach} onChangeText={(value) => setSeach(value)}/>

                <Picker style={style.seachPicker} onValueChange={(value:string) => setSelectValue(value)}>
                    <Picker.Item label='Monopolistas' value='Monopolista'/>
                    <Picker.Item label='Habituais' value='Habitual'/>
                    <Picker.Item label='Especiais' value='Especial'/>
                </Picker>
            </View>

            <View style={style.listContainer}>
                {isLoading ? (
                    <Text style={style.title}>Buscando Fornecedores...</Text>
                ):(
                    <>
                        {fornecedores?.length > 0 ? (
                            <>
                                <FlatList
                                data={filterFornecedores()}
                                renderItem={(item) => (
                                    <View style={style.fornecedorStyle}>

                                        {/* Content */}
                                        <View style={style.fornecedorContent}>
                                            <Image style={style.imagem} source={{uri:item.item.imagem as string}}/>
                                            <Text>{item.item.nome}</Text>
                                        </View>

                                        {/* Button open modal */}
                                        <Pressable onPress={() => showModalAndData(item.item)}>
                                            <Ionicons name='open' color='black' size={24}/>
                                        </Pressable>

                                    </View>
                                )}  
                                />
                            
                                {fornecedorData && (
                                    <FornecedorModal data={fornecedorData as FornecedorProps} isVisible={isVisible} setIsVisible={setIsVisible} deleteFornecedor={deleteFornecedor}/>
                                )}
                            </>
                        ) : <Text style={style.title}>Não há fornecedores</Text>}
                    </>    
                )}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(36, 36, 36)',
        padding:10
    },

    seach:{
        marginTop:5,
        flexDirection:'row',
        padding:6,
        gap:2,
    },

    seachInput:{
        padding:5,
        borderWidth:1,
        borderColor:'white',
        borderRadius:3,
        color:'white',
        flexGrow:2
    },

    seachPicker:{
        borderRadius:3,
        backgroundColor:'white',
        flexGrow:1
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

})