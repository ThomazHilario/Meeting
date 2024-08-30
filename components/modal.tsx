import { StyleSheet, View, Text, Pressable, Image, Modal } from "react-native"

// vector-icons
import { Ionicons } from "@expo/vector-icons"

// import interface
import { FornecedorProps } from "@/app/fornecedores"

// FonecedorModalProps
interface FornecedorModalProps{
    data:FornecedorProps,
    isVisible:boolean,
    setIsVisible:React.Dispatch<React.SetStateAction<boolean>>
}


export const FornecedorModal = ({data, isVisible, setIsVisible}:FornecedorModalProps) => {
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

    text:{
        color:'rgb(255, 255, 255)',
        paddingLeft:10,
        fontSize:17
    }
})