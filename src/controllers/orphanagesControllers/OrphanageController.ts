import { Request, Response } from 'express';
import {getRepository} from 'typeorm';

import Orphanages from '../../models/OrphanageModels';

export default{
    async createOphanages(request: Request, response: Response){
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


    }
}