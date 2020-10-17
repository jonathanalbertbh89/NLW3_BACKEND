import { Request, Response } from 'express';
import {getRepository} from 'typeorm';
import * as Yup from 'yup';


import Orphanages from '../../models/OrphanageModels';
import orphanageView from  '../../view/orphanagesView';

export default{

    async index(request: Request, response: Response){

        const orphanagesRepository = getRepository(Orphanages);

        const result =  await orphanagesRepository.find({
            relations: ['images']
        });

        return(
            response.status(200).json(orphanageView.renderMany(result))
        )

    },

    async show(request: Request, response: Response){
        const {id} = request.params;

        const orphanagesRepository = getRepository(Orphanages);

        const result =  await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return(
            response.status(200).json(orphanageView.render(result))
        )
    },

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

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return(
                { path: image.filename}
            )
        })

        const orphanagesRepository = getRepository(Orphanages);

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        await schema.validate(data, {
            abortEarly: false
        })

        const result = orphanagesRepository.create(data);

        await orphanagesRepository.save(result);

        return(
            response.status(201).send({
                message: 'adicionado com sucesso'
            })
        )


    }
}