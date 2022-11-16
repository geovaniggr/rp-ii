const { PrismaClient } = require('@prisma/client')
const { z } = require('zod')

const UserController = (fastify) => {

    const prisma = new PrismaClient({
        log: ['query']
    })

    return {
        handleGetProfile: async (request, response) => {
            const { id } = await request.jwtVerify()

            // {
            //     name: "José Alberto",
            //     profile_picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            //     email: "jose@email.com",
            //     country: "Brazil",
            //     city: "São Paulo",
            //     mini_bio: "Professor de Inglês com 10 anos de profissão", 
            //     biography: `
            //         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            //         has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley 
            //         of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
            //         but also the leap into electronic typesetting, remaining essentially unchanged. 
            //         It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
            //         and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            //     `,
            //     main_language: {
            //         value: "PORTUGUESE",
            //         label: "Português"
            //     },
            //     languages: [
            //         "Inglês",
            //         "Espanhol"
            //     ],
            //     abilities: [
            //         "Edição de Vídeo",
            //         "Ediçaõ de Imagens"
            //     ],
            //     projects: [
            //         { name: "Projeto 1", url: "" },
            //         { name: "Projeto 1", url: "" },
            //         { name: "Projeto 1", url: "" }
            //     ],
            //     raiting: {
            //         count: 50,
            //         stars: [
            //             { value: 5, count: 10 },
            //             { value: 4, count: 10 },
            //             { value: 3, count: 10 },
            //             { value: 2, count: 10 },
            //             { value: 1, count: 10 },
            //         ],
            //         testimonials: [{
            //             name: 'João Gomes',
            //             image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            //             description: 'muito rápida e tradução muito boa, me ajudou muito'
            //         },{
            //             name: 'João Gomes',
            //             image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            //             description: 'muito rápida e tradução muito boa, me ajudou muito'
            //         },{
            //             name: 'João Gomes',
            //             image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            //             description: 'muito rápida e tradução muito boa, me ajudou muito'
            //         }]
            //     }
            // }
        
            const user = await prisma.users.findFirst({
                where: { id },
                include: {
                    raitings: true,
                    portfolio: true
                }
            })

            const raiting = {
                count: user.raitings.length,
                stars: [

                ]
            }

            return user
        },

        handleFindUser: async (request, reply) => {
            const { id } = request.params

            const users = await prisma.users.findFirst({
                where: { id }
            });

            return users
        },

        handleCreate: async (request, reply) => {
            const createUserBody = z.object({
                name: z.string(),
                email: z.string().email(),
                password: z.string(),
                confirm_password: z.string()
            })
            .superRefine( ({ password, confirm_password}, ctx) => {
                if (confirm_password !== password){
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Password didn\'t matches'
                    })
                }
            })

            const {
                name,
                email
            } = createUserBody.parse(request.body)

            const created = await prisma.users.create({ data: {
                name,
                email
            } })

            return created
        },

        handleUpdate: async (request, reply) => {
            const { id } = await request.jwtVerify()

            const updateUserBody = z.object({
                name: z.string(),
                email: z.string().email(),
                country: z.string().nullish(),
                city: z.string().nullish(),
                bio: z.string().nullish(),
                main_language: z.string().nullish(),
                languages: z.array(z.string()).nullish(),
                abilities: z.array(z.string()).nullish(),
            })

            const user = updateUserBody.parse(request.body)

            const updated = await prisma.users.update({
                where: { id },
                data: {
                    ...user
                }
            })

            return updated

        },

        handleAddProject: async (request, reply) => {
            // const addProjectBody = z.object({
            //     name: z.string(),
            //     url: z.url(),
            //     description: z.string()
            // })
        },

        handleAddRating: async (request, reply) => {

        }
    }
}

module.exports = UserController