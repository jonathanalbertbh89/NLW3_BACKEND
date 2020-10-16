import express from 'express';


import Orphanages from '../controllers/orphanagesControllers/OrphanageController';

const routes = express();

routes.get('/teste', (request, response)=> {
    console.log('oi')
    return(
        response.status(200).json({
            message: 'teste'
        })
    )
})



routes.post('/createorphanage', Orphanages.createOphanages);
routes.get('/allorphanages', Orphanages.index);


export default routes;