import express from 'express';
import multer from 'multer'


import Orphanages from '../controllers/orphanagesControllers/OrphanageController';
import uploadConfig from '../config/upload'
 
const upload = multer(uploadConfig);
const routes = express();

routes.get('/teste', (request, response)=> {
    console.log('oi')
    return(
        response.status(200).json({
            message: 'teste'
        })
    )
})



routes.post('/createorphanage', upload.array('images') ,Orphanages.createOphanages);
routes.get('/allorphanages', Orphanages.index);
routes.get('/orphanage/:id', Orphanages.show);


export default routes;