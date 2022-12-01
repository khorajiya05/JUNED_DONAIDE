export const isPermission = (permissionLists, permissionId) => {
    if (permissionLists?.length > 0) {
        const index = permissionLists?.indexOf((elem) => {
            console.log(elem?.permissionID);
            console.log(permissionId);
            return Number(elem?.permissionID) === Number(permissionId)
        })
        if (index > -1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}