import { dbConnect } from '@api/mongodb'
import products from '@api/product'

dbConnect()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req

    switch(method) {
        case 'GET':
            try {
                const productList = await products.find({})

                res.status(200).json( { success:true, data: productList } )
            } catch(err) {
                res.status(400).send('No data found for this request..')
            }
            break
        case 'POST':
            try {
                await products.create(req.body)

                res.status(200).send('Document sent to database')
            } catch(err) {
                res.status(400).send('Could not send data to database..')
            }
            break
        case 'PUT':
            try {
                const productos = await products.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if(!productos) {
                    return res.status(400).send('Could not update data on database..')
                }

                res.status(200).send('Document updated on database..')
            } catch(err) {
                res.status(400).send('Could not update data on database..')
            }
            break
        case 'DELETE':
            try {
                const deleted = await products.deleteOne({ _id: id })

                if(!deleted) {
                    return res.status(400).send('Could not delete data..')
                }
            } catch (err) {
                res.status(400).send('Could not delete data..')
            }
            break
        default:
            res.status(404).send('Not found..')
            break
    }
}
