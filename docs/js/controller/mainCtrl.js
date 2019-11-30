const controller = {}

function transformDoc(firestoreDoc) {
    let data = firestoreDoc.data()
    data.id = firestoreDoc.id

    return data
}