import { ActivityIndicator, StyleSheet, View } from 'react-native'

const Loader = () => {
  return (
    <View style={styles.container}>
        <ActivityIndicator
            size="large"
            color="black"
        />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})