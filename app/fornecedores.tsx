// React
import { useEffect, useState } from 'react'

// React native
import { View, Text } from 'react-native'

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
        <View>
            <Text>Hello</Text>
        </View>
    )
}