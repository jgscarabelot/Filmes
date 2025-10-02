import { useEffect, useState } from 'react'
import { ScrollView, Text, Image, View, StyleSheet } from 'react-native'

export default function SplashScreen() {
    const apiLink = "https://www.fabiooliveira.cloud/api_aula/filmes/"
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        fetch(apiLink, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'a8ea3f9c1e47b2d89f0d41b7f3c2d0c6'
            },
        })
            .then((res) => res.json())
            .then((data) => setFilmes(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <View style={Styles.BodyView}>
            <Text style={Styles.TextTitulo}>
                Filmes da Marvel
            </Text>

            <ScrollView contentContainerStyle={Styles.ScrollViewContent}>
                {filmes.map((filme) => {
                    return (
                        <View key={filme.codFilme} style={Styles.ViewCard}>
                            <Image
                                source={{ uri: filme.linkPoster }}
                                style={Styles.CardImage}
                            />
                            <Text style={Styles.CardText}>
                                {filme.titulo}
                            </Text>
                            <Text style={Styles.CardText2}>
                                Franquia: {filme.franquia}{"\n"}
                                Ano: {filme.anoLancamento}{"\n"}
                                Orçamento: R$ {filme.orcamento.toLocaleString()}
                            </Text>
                            <Text style={Styles.CardTextBilheteria}>
                                Bilheteria: R$ {filme.valorArrecadacao.toLocaleString()}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    )
}

const Styles = StyleSheet.create({
    BodyView: {
        flex: 1,
        backgroundColor: '#8B0000', 
        alignItems: 'center',
        paddingTop: 30,
    },
    TextTitulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'darkred',
        width: '90%',
        textAlign: 'center',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    ScrollViewContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingBottom: 50,
        width: '100%',
    },
    ViewCard: {
        width: '40%',
        minHeight: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        alignItems: 'flex-start',

        elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    CardImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 5,
    },
    CardText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'left',
        marginTop: 5,
    },
    CardText2: {
        fontSize: 13,
        textAlign: 'left',
        color: "gray",
        marginTop: 5
    },
    CardTextBilheteria: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
        marginTop: 5,
    },
})
