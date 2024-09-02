import { StyleSheet, View, Text, Pressable, Image, Modal } from "react-native"

// vector-icons
import { Ionicons } from "@expo/vector-icons"

// import interface
import { FornecedorProps } from "@/app/fornecedores"

// Firebase
import { db } from "@/services/firebase"
import { deleteDoc, doc } from 'firebase/firestore'

// FonecedorModalProps
interface FornecedorModalProps{
    data:FornecedorProps,
    isVisible:boolean,
    setIsVisible:React.Dispatch<React.SetStateAction<boolean>>,
    deleteFornecedor: (id:string) => void
}


export const FornecedorModal = ({data, isVisible, setIsVisible, deleteFornecedor}:FornecedorModalProps) => {

    async function deleteFornecedorDataBase(){
        try {

            // Excluir fornecedor da state
            deleteFornecedor(data.id)

            // Referencia do banco de dados do firebase
            const docRef = doc(db,'Fornecedores',data.id)

            // Excluindo o fornecedor
            await deleteDoc(docRef)

            // Alterando visibilidade do modal
            setIsVisible(false)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Modal animationType='fade' transparent={true} visible={isVisible}>
            <View style={style.overlay}>
                <View style={style.modal}>
                    <Pressable style={{alignSelf:'flex-end'}} onPress={() => setIsVisible(false)}>
                        <Ionicons name='close' color='white' size={24}/>
                    </Pressable>

                    <Image style={style.imageModal} source={{uri:data.imagem as string}}/>

                    <Text style={style.text}>Nome: {data.nome}</Text>
                    <Text style={style.text}>Endereco: {data.endereco}</Text>
                    <Text style={style.text}>Contato: {data.contato}</Text>
                    <Text style={style.text}>Categoria: {data.categoria}</Text>

                    {/* Button excluir fornecedor */}
                    <Pressable style={style.buttonDelete} onPress={deleteFornecedorDataBase}>
                        <Text style={style.text}>Excluir fornecedor</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const style = StyleSheet.create({
    modal:{
        backgroundColor:'rgb(50, 50, 50)',
        height:'50%',
        width:'90%',
        top:'10%',
        left:'5%',
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

    text:{
        color:'rgb(255, 255, 255)',
        paddingLeft:10,
        fontSize:17
    },

    buttonDelete:{
        backgroundColor:'rgb(221, 81, 81)',
        padding:5,
    }
})