import {createContext, useState, ReactNode} from 'react'
import { useRouter } from 'next/router'

interface EditModalContextData {
    isEditModalOpen: boolean;
    toggleEditModal: (product:any)=>void;
    updateProduct: (updatedProduct:any)=>void;
    toUpdate: any;
}

interface EditModalProps {
    children: ReactNode
}

export const EditModalContext = createContext({} as EditModalContextData)

export function EditModalProvider({children}: EditModalProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [toUpdate, setToUpdate] = useState(null)
    const router = useRouter()

    const toggleEditModal = (product:any) => {
        setIsEditModalOpen(!isEditModalOpen)
        setToUpdate(product)
    }

    const updateProduct = async (updatedProduct:any) => {
        const product = {
            name: updatedProduct?.name,
            quantity: updatedProduct?.quantity,
            category: updatedProduct?.category,
            expirateon: String(updatedProduct?.expiration)
        }

        try{
            const res = await fetch(`http://localhost:3000/api/products/${toUpdate.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(product)
            }) 
            router.push('/')
        } catch(err) {
            console.log(err)
        }

        toggleEditModal(null)
    }

    return (
        <EditModalContext.Provider value={{
            isEditModalOpen,
            toggleEditModal,
            updateProduct,
            toUpdate
        }}>
            {children}
        </EditModalContext.Provider>
    )
}