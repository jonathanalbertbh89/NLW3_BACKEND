import express from 'express';
import OrphanageController from '../controllers/orphanagesControllers/OrphanageController';
import {getRepository} from 'typeorm';
import Orphanages from '../models/OrphanageModels';

//import Orphanages from '../controllers/orphanagesControllers';

const routes = express();

routes.get('/teste', (request, response)=> {
    console.log('oi')
    return(
        response.status(200).json({
            message: 'teste'
        })
    )
})



routes.post('/createorphanage', async (request, response)=>{
    const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    } = request.body;

    const orphanagesRepository = getRepository(Orphanages);

    const result = orphanagesRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    });

    await orphanagesRepository.save(result);

    return(
        response.status(201).send({
            message: 'adicionado com sucesso'
        })
    )


});


export default routes