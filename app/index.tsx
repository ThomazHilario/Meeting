// React
import { useState } from 'react';

// Router
import { Link } from 'expo-router'

// React native
import { View, Text, TextInput ,StyleSheet, Button, Image } from 'react-native'

// import expo document picker
import * as DocumentPicker from 'expo-document-picker';

// Picker
import { Picker } from '@react-native-picker/picker'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// firebase
import { db, storage } from '../services/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc, updateDoc } from 'firebase/firestore';


// messageError
const messageError = 'Preencha este campo!'

// interfaceSchemaProps
interface SchemaProps{
    nome:string,
    endereco:string,
    contato:string,
    categoria:string
}

// schema
const schema = z.object({
    nome:z.string().min(1, messageError),
    endereco:z.string().min(1, messageError),
    contato:z.string().min(1, messageError),
    categoria:z.string()
}).required({
    nome:true,
    endereco:true,
    contato:true,
    categoria:true,
})

export default function HomeScreen(){

    // Desestruturando useForm
    const { handleSubmit, control, formState:{errors} } = useForm<SchemaProps>({resolver:zodResolver(schema), defaultValues:{
        nome:'',
        endereco:'',
        contato:'',
        categoria:'Monopolista'
    }})

    // state image
    const [files, setFiles] = useState<unknown | null>(null)

    // image 
    const [image, setImage] = useState<string | null>(null)

    // HandleImage
    async function handleImage(){
        try {
            // Buscando documento
            const res = await DocumentPicker.getDocumentAsync()

            if(res){
                // Variavel que armazena a parte de files
                const files = res.assets as DocumentPicker.DocumentPickerAsset[]

                // Salvando a url na state de url
                setImage(files[0].uri)

                // Salvando Blob do files na state files
                const response = await fetch(files[0].uri)
                const blob = await response.blob()
                setFiles(blob)
            }

        } catch (error) {
            console.log(error)          
        }
    }

    // uload image in storage
    const uploadImageInStorage = async (id:string, file:Blob) => {
        try {
            const storageRef = ref(storage, `imagens/${id}`)

            await uploadBytes(storageRef, file)

            const url = await getDownloadURL(storageRef)
            
            setFiles(url)
        } catch (error) {
            console.log(error)
        }
    }

    async function registrarNoFirebase(id:string, novofornecedor:unknown){
        try {
            // docRef
            const docRef = doc(db, 'Fornecedores', id)

            // Adicionar ao banco de dados o novo fornecedor
            await setDoc(docRef, novofornecedor)
        } catch (error) {
            console.log(error)
        }
    }

    // registrarFornecedor
    async function registrarFornecedor(data:SchemaProps){
        try {
            const novofornecedor = {
                id:crypto.randomUUID(),
                imagem:image,
                nome:data.nome,
                endereco:data.endereco,
                contato:data.contato,
                categoria:data.categoria
            }

            // Caso files tenhaa um Blob
            if(files){
                // Criar aa imaagem no firebase
                uploadImageInStorage(novofornecedor.id, files as Blob)

                // Registrara dados no firebase
                registrarNoFirebase(novofornecedor.id, novofornecedor)            
                
            }
            
            
            if(typeof files === 'string'){   
                const docRef = doc(db, 'Fornecedores', novofornecedor.id)
    
                await updateDoc(docRef, {
                    "imagem":files as string
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={style.homePageContainer}>
            <Text style={style.title}>Cadastro de fornecedores</Text>

            <View style={style.form}>
                <View style={style.labelmage}>
                    <Text style={{alignSelf:'flex-start'}}>Foto de perfil:</Text>
    
                    {image !== null ? (
                        <Image source={{uri:image}} style={style.image}/>
                    ) : (
                        <Button title='Upload image' onPress={handleImage}/>
                    )}                
                </View>

                <View style={style.label}>
                    <Text>Nome:</Text>
                    
                    <Controller
                        name='nome'
                        control={control}
                        render={({field:{value, onChange}}) => (
                            <TextInput 
                                style={[style.inputForm, {borderColor: errors.nome && 'red'}]} 
                                placeholder='Nome do fornecedor'
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                </View>

                <View style={style.label}>
                    <Text>Endereço:</Text>

                    <Controller
                        name='endereco'
                        control={control}
                        render={({field:{value, onChange}}) => (
                            <TextInput 
                                style={[style.inputForm,{borderColor: errors.endereco && 'red'}]} 
                                placeholder='Endereco do fornecedor'
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                </View>

                <View style={style.label}>
                    <Text>Contato:</Text>

                    <Controller
                        name='contato'
                        control={control}
                        render={({field:{value, onChange}}) => (
                            <TextInput 
                                style={[style.inputForm, {borderColor: errors.contato && 'red'}]} 
                                placeholder='Ex:(ddd)98888-8888'
                                onChangeText={onChange}
                                value={value} 
                            />
                        )}
                    />
                </View>
                
                <View style={style.label}>
                    <Text>Categorias de produtos:</Text>

                    <Controller
                        name='categoria'
                        control={control}
                        render={({field:{value, onChange}}) => (
                            <Picker selectedValue={value} 
                                style={{padding:10, borderRadius:3}}
                                onValueChange={onChange}
                            >
                                <Picker.Item label='Monopolista' value='Monopolista'/>
                                <Picker.Item label='Habitual' value='Habitual'/>
                                <Picker.Item label='Especial' value='Especial'/>
                            </Picker>
                        )}
                    />
                </View>

                <Button 
                    title='Cadastrar fornecedor'
                    onPress={handleSubmit(registrarFornecedor)}
                />
            </View>

            <Link href='/fornecedores' style={style.link}>Lista de Fornecedores</Link>
        </View>
    )
}

const style = StyleSheet.create({
    homePageContainer:{
        flex:1,
        alignItems:'center',
        gap:30
    },

    title:{
        marginTop:30,
        fontSize:25
    },

    form:{
        width:'85%',
        gap:10
    },

    label:{
        gap:4
    },

    labelmage:{
        alignItems:'center'
    },

    image:{marginTop:10,
        borderRadius:100, 
        height:150, 
        width:150, 
        objectFit:'cover'
    },

    inputForm:{
        padding:8,
        borderColor:'rgb(36,36,36)',
        borderStyle:'solid',
        borderWidth:1,
        borderRadius:3
    },

    link:{
        backgroundColor:'rgb(36, 36, 36)',
        color:'white',
        width:'85%',
        padding:10,
        borderRadius:3,
        textAlign:'center',
        fontWeight:'bold'
    }
})