import orphanagesModels from "../models/OrphanageModels"
import imagesView from "./imagesView"

export default{
    render(orphanage: orphanagesModels){
        return{
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imagesView.renderMany(orphanage.images)
        }
    },

    renderMany(orphanages: orphanagesModels[]){
        return(
            orphanages.map(orphanage => this.render(orphanage))
        )
    }
}