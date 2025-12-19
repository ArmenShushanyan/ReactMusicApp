import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const spotifyCoreApi = createApi({
    reducerPath: 'spotifyCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spotify.com/v1/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken
            
            if(token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    endpoints: (builder) => ({
        getTopTracks: builder.query({
            query: (id) => {
                return {
                    url: `playlists/${id}/tracks`,
                    params: {
                        limit: 48
                    }
                }
            },
            transformResponse: (response) => {
                return {
                    tracks: response.items.map(item => ({
                        id: item.track.id,
                        name: item.track.name,
                        artist: {
                            name: item.track.artists[0].name,
                            id: item.track.artists[0].id
                        },
                        album: {
                            image: item.track.album.images,
                            name: item.track.album.name,
                            album: item.track.album.id
                        },
                        duration: item.track.duration_ms,
                        preview_url: item.track.preview_url,
                        external_urls: item.track.external_urls,
                        uri: item.track.uri,
                    }))
                }
            }
        }),
        getArtist: builder.query({
            query: (artistsId) => `artists/${artistsId}`,
            transformResponse: (artist) => ({
                id: artist.id,
                name: artist.name,
                images: artist.images[0].url,
                genres: artist.genres
            })
        }),
        getSearchResults: builder.query({
            query: (searchTerm) => ({
                url: 'search',
                params: {
                    q: searchTerm,
                    type: 'track,album,artist',
                    limit: 20
                }
            })
        })
    })
})

export const { useGetTopTracksQuery, useGetArtistQuery, useGetSearchResultsQuery } = spotifyCoreApi