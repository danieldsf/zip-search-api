import { Router } from 'express';

const router = Router()

router.post('/post', (request, response) => {
    return response.status(201).send()
})

router.get('/', (request, response) => {
    return response.status(201).send({status: 'OK'})
})

export { router }