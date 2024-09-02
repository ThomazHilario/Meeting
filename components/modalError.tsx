// Modal
import { Modal, StyleSheet, Text, Pressable, View } from "react-native"

// interface
interface ModalErrorProps{
    isVisible:boolean,
    setIsVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalError = ({isVisible, setIsVisible}:ModalErrorProps) => {

    return(
        <Modal style={style.container} transparent visible={isVisible}>
            <View style={style.container}>
                <View style={style.content}>
                    <Text style={[style.text,{color:'red', fontSize:20}]}>
                        Error
                    </Text>

                    <Text style={style.text}>
                        É necessário adicionar uma imagem
                    </Text>

                    <Pressable style={style.button} onPress={() => setIsVisible(false)}>
                        <Text style={style.text}>OK</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}


const style = StyleSheet.create({

    container:{
        justifyContent:'center',
        alignItems:'center',
        top:'25%',
    },

    content:{
        justifyContent:'center',
        alignItems:'center',
        width:'90%',
        backgroundColor:'rgba(36, 36, 36, 0.831)',
        borderRadius:10,
        gap:20,
        padding:20
    },

    text:{
        color:'white'
    },

    button:{
        backgroundColor:'rgb(67, 98, 173)', 
        padding:10, 
        width:'80%', 
        borderRadius:10,
        alignItems:'center'
    }
})