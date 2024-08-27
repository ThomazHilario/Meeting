import { useState } from 'react';

// import router
import { Link } from 'expo-router'

// import react native
import { View, Text, TextInput ,StyleSheet, Button, Image } from 'react-native'

// import expo document picker
import * as DocumentPicker from 'expo-document-picker';


export default function HomeScreen(){

    const [image, setImage] = useState<null | string>(null)

    async function handleImage(){
        try {
            const res = await DocumentPicker.getDocumentAsync()

            const files = res.assets as DocumentPicker.DocumentPickerAsset[]

            setImage(files[0].uri)
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
                    
                    <TextInput style={style.inputForm} placeholder='Nome do fornecedor'/>
                </View>

                <View style={style.label}>
                    <Text>Endereço:</Text>

                    <TextInput style={style.inputForm} placeholder='Endereco do fornecedor'/>
                </View>

                <View style={style.label}>
                    <Text>Contato:</Text>

                    <TextInput style={style.inputForm} placeholder='Ex:(ddd)98888-8888' />
                </View>
                
                <View style={style.label}>
                    <Text>Categorias de produtos:</Text>

                    <TextInput style={style.inputForm}/>
                </View>

                <Button title='Cadastrar fornecedor'/>
            </View>

            <Link href='/fornecedores'>Fornecedores</Link>
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
    }
})