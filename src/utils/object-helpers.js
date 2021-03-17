export const updateObjectsInArray = (items, itemId, objectName, newObject) => {
    return items.map(user => {
        if(user[objectName] == itemId){
            return {...user, ...newObject}
        }

        return user;
    })
}