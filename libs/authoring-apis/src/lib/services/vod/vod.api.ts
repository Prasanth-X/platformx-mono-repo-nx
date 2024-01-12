import { ApolloError } from '@apollo/client'
import graphqlInstance from '../../config/graphqlConfig'

import {
  CREATE_VOD,
  DELETE_VOD,
  PUBLISH_VOD,
  UNPUBLISH_VOD,
  UPDATE_VOD,
} from '../../graphQL/mutations/vodMutations'
import {
  FETCH_VOD_BY_ID,
  FETCH_VOD_LIST_ALL,
} from '../../graphQL/queries/vodQueries'
import { ApiResponse } from '../utils/common.types'

//FetchQueries
export const fetchVodById = FETCH_VOD_BY_ID
export const fetchVodByList = FETCH_VOD_LIST_ALL

//MutateQueries
export const create_vod = CREATE_VOD
export const update_vod = UPDATE_VOD
export const publish_vod = PUBLISH_VOD
export const delete_vod = DELETE_VOD
export const unpublish_vod = UNPUBLISH_VOD

const fetchVodByIdAPI = {
  fetchContent: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: FETCH_VOD_BY_ID,
        variables: input,
        fetchPolicy: 'no-cache',
      })
      return data
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors)
      throw err
    }
  },
}

export default fetchVodByIdAPI
