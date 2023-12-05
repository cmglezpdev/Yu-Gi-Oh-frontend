import { httpClient } from "./axios"

const GetMoreDecks = async(take: number) => {
    const response = await httpClient.get(`/Statistics/decks/${take}`)
    return response.data.result;
}

export async function moreDecks(take: number) {
    return new Promise((resolve) => {
      resolve(
        GetMoreDecks(take)
      )
    })
}

// const GetMorePupularArchetype = async(take: number) => {
//     const response = await httpClient.get(`/Statistics/archetype/popular/${take}`)
//     return response.data.result;
// }

// export async function morePopularArchetype(take: number) {
//     return new Promise((resolve) => {
//       resolve(
//         GetMorePupularArchetype(take)
//       )
//     })
// }

// const GetMorePupularArchetype = async(take: number) => {
//     const response = await httpClient.get(`/Statistics/archetype/popular/${take}`)
//     return response.data.result;
// }

// export async function morePopularArchetype(take: number) {
//     return new Promise((resolve) => {
//       resolve(
//         GetMorePupularArchetype(take)
//       )
//     })
// }