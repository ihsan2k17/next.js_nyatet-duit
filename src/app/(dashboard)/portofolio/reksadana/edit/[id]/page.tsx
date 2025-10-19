import React from 'react'
interface editprops {
    params:{
        id: number
    }
}

const EditReksadana = ({params}: editprops) => {
    const {id} = params
    return (
        <div className={`flex p-2`}>
            halaman edit di id{id}
        </div>
    )
}

export default EditReksadana
